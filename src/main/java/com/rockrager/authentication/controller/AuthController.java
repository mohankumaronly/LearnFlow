package com.rockrager.authentication.controller;

import com.rockrager.authentication.dto.request.*;
import com.rockrager.authentication.dto.response.AuthResponse;
import com.rockrager.authentication.service.AuthService;
import com.rockrager.authentication.util.CookieUtil;  // ← ADD THIS IMPORT

import jakarta.servlet.http.HttpServletResponse;  // ← ADD THIS IMPORT
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;  // ← ADD THIS

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response  // ← ADD THIS
    ) {
        AuthResponse authResponse = authService.register(request);

        // Set cookies if tokens are present (auto-login after registration)
        if (authResponse.getAccessToken() != null) {
            cookieUtil.createAccessTokenCookie(response, authResponse.getAccessToken());
            cookieUtil.createRefreshTokenCookie(response, authResponse.getRefreshToken());

            // Remove access token from response body (keep refresh token for localStorage)
            authResponse.setAccessToken(null);
        }

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response  // ← ADD THIS
    ) {
        AuthResponse authResponse = authService.login(request);

        // Create HTTP-only cookies with the tokens
        cookieUtil.createAccessTokenCookie(response, authResponse.getAccessToken());
        cookieUtil.createRefreshTokenCookie(response, authResponse.getRefreshToken());

        // Remove access token from response body (keep refresh token for localStorage)
        authResponse.setAccessToken(null);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(
            @RequestBody RefreshTokenRequest request,
            HttpServletResponse response  // ← ADD THIS
    ) {
        AuthResponse authResponse = authService.refreshToken(request.getRefreshToken());

        // Update access token cookie
        if (authResponse.getAccessToken() != null) {
            cookieUtil.createAccessTokenCookie(response, authResponse.getAccessToken());

            // Update refresh token cookie if new one is provided
            if (authResponse.getRefreshToken() != null) {
                cookieUtil.createRefreshTokenCookie(response, authResponse.getRefreshToken());
            }

            // Remove access token from response body
            authResponse.setAccessToken(null);
        }

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            @RequestBody LogoutRequest request,
            HttpServletResponse response  // ← ADD THIS
    ) {
        // Clear cookies
        cookieUtil.clearAccessTokenCookie(response);
        cookieUtil.clearRefreshTokenCookie(response);

        return ResponseEntity.ok(authService.logout(request.getRefreshToken()));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request
    ) {
        return ResponseEntity.ok(authService.verifyEmail(request.getToken()));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmailWithParam(
            @RequestParam String token
    ) {
        return ResponseEntity.ok(authService.verifyEmail(token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request
    ) {
        return ResponseEntity.ok(authService.forgotPassword(request.getEmail()));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request
    ) {
        return ResponseEntity.ok(authService.resetPassword(
                request.getToken(),
                request.getNewPassword()
        ));
    }

    @GetMapping("/reset-password")
    public ResponseEntity<String> resetPasswordWithParam(
            @RequestParam String token,
            @RequestParam String newPassword
    ) {
        return ResponseEntity.ok(authService.resetPassword(token, newPassword));
    }
}