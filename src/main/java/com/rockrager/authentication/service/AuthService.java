package com.rockrager.authentication.service;

import com.rockrager.authentication.dto.request.LoginRequest;
import com.rockrager.authentication.dto.request.RegisterRequest;
import com.rockrager.authentication.dto.response.AuthResponse;
import com.rockrager.authentication.entity.EmailVerificationToken;
import com.rockrager.authentication.entity.PasswordResetToken;
import com.rockrager.authentication.entity.RefreshToken;
import com.rockrager.authentication.entity.User;
import com.rockrager.authentication.entity.Role;
import com.rockrager.authentication.repository.EmailVerificationTokenRepository;
import com.rockrager.authentication.repository.PasswordResetTokenRepository;
import com.rockrager.authentication.repository.RefreshTokenRepository;
import com.rockrager.authentication.repository.UserRepository;
import com.rockrager.authentication.security.jwt.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Validate role
        Role role;
        try {
            role = Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role. Must be either STUDENT or PROFESSOR");
        }

        // Validate professor fields
        if (role == Role.PROFESSOR) {
            if (request.getInstituteName() == null || request.getInstituteName().trim().isEmpty()) {
                throw new RuntimeException("Institute name is required for professors");
            }
            if (request.getAreaOfExpertise() == null || request.getAreaOfExpertise().trim().isEmpty()) {
                throw new RuntimeException("Area of expertise is required for professors");
            }
        }

        // Build user object
        User.UserBuilder userBuilder = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .emailVerified(false);

        // Add professor fields if role is PROFESSOR
        if (role == Role.PROFESSOR) {
            userBuilder.instituteName(request.getInstituteName())
                    .areaOfExpertise(request.getAreaOfExpertise());
        }

        User user = userBuilder.build();
        User savedUser = userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(savedUser.getEmail());
        String refreshToken = jwtService.generateRefreshToken(savedUser.getEmail());

        refreshTokenRepository.deleteByUser(savedUser);

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .user(savedUser)
                .token(refreshToken)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .revoked(false)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        String verificationToken = UUID.randomUUID().toString();

        EmailVerificationToken emailVerificationTokenEntity = EmailVerificationToken.builder()
                .token(verificationToken)
                .user(savedUser)
                .expiresAt(LocalDateTime.now().plusHours(24))
                .build();

        emailVerificationTokenRepository.save(emailVerificationTokenEntity);

        // Send verification email
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), verificationToken);
            log.info("Verification email sent to: {}", savedUser.getEmail());
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", savedUser.getEmail(), e);
            // Don't throw exception - registration still successful, just email failed
        }

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .profileImage(savedUser.getProfileImage())  // ADDED: profile image
                .message("User registered successfully. Please check your email for verification link.")
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Please verify your email first. Check your inbox for verification link.");
        }

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .user(user)
                .token(refreshToken)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .revoked(false)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .profileImage(user.getProfileImage())  // ADDED: profile image
                .message("Login successful")
                .build();
    }

    @Transactional
    public AuthResponse refreshToken(String refreshToken) {

        RefreshToken storedToken = refreshTokenRepository
                .findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (storedToken.isRevoked()) {
            throw new RuntimeException("Refresh token revoked");
        }

        if (storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(storedToken);
            throw new RuntimeException("Refresh token expired");
        }

        User user = storedToken.getUser();

        String newAccessToken = jwtService.generateAccessToken(user.getEmail());

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .profileImage(user.getProfileImage())  // ADDED: profile image
                .message("Access token refreshed")
                .build();
    }

    @Transactional
    public String logout(String refreshToken) {

        RefreshToken token = refreshTokenRepository
                .findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        token.setRevoked(true);
        refreshTokenRepository.save(token);

        return "Logout successful";
    }

    @Transactional
    public String verifyEmail(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));

        if (verificationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            emailVerificationTokenRepository.delete(verificationToken);
            throw new RuntimeException("Verification token expired. Please register again.");
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        emailVerificationTokenRepository.delete(verificationToken);

        log.info("Email verified successfully for user: {}", user.getEmail());

        return "Email verified successfully. You can now login.";
    }

    @Transactional
    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Delete any existing reset tokens for this user
        passwordResetTokenRepository.findByToken(email).ifPresent(existingToken ->
                passwordResetTokenRepository.delete(existingToken)
        );

        // Generate reset token
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiresAt(LocalDateTime.now().plusHours(1))
                .build();

        passwordResetTokenRepository.save(resetToken);

        // Send password reset email
        try {
            emailService.sendPasswordResetEmail(user.getEmail(), token);
            log.info("Password reset email sent to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", user.getEmail(), e);
            throw new RuntimeException("Failed to send password reset email. Please try again.");
        }

        return "Password reset instructions sent to your email. Please check your inbox.";
    }

    @Transactional
    public String resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Reset token has expired. Please request a new one.");
        }

        User user = resetToken.getUser();

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);

        // Revoke all refresh tokens for security
        refreshTokenRepository.deleteByUser(user);

        log.info("Password reset successful for user: {}", user.getEmail());

        return "Password reset successful. Please login with your new password.";
    }
}