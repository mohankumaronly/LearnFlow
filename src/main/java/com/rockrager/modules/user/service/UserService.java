package com.rockrager.modules.user.service;

import com.rockrager.modules.user.dto.UserDTO;
import com.rockrager.modules.user.entity.User;
import com.rockrager.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    @Transactional
    public String uploadAvatar(MultipartFile file, User user) {
        // Delete old avatar from Cloudinary if exists
        if (user.getProfileImage() != null) {
            String oldPublicId = cloudinaryService.extractPublicIdFromUrl(user.getProfileImage());
            if (oldPublicId != null) {
                cloudinaryService.deleteImage(oldPublicId);
            }
        }

        // Upload new avatar
        String imageUrl = cloudinaryService.uploadImage(file);

        // Update user
        user.setProfileImage(imageUrl);
        userRepository.save(user);

        log.info("Avatar uploaded successfully for user: {}", user.getEmail());
        return imageUrl;
    }

    @Transactional
    public void deleteAvatar(User user) {
        if (user.getProfileImage() != null) {
            // Delete from Cloudinary
            String publicId = cloudinaryService.extractPublicIdFromUrl(user.getProfileImage());
            if (publicId != null) {
                cloudinaryService.deleteImage(publicId);
            }

            // Remove from user
            user.setProfileImage(null);
            userRepository.save(user);

            log.info("Avatar deleted successfully for user: {}", user.getEmail());
        }
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    /**
     * NEW METHOD: Get all users (for admin)
     */
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * NEW METHOD: Get UserDTO by ID (for admin)
     */
    public UserDTO getUserDTOById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToDTO(user);
    }

    /**
     * NEW HELPER METHOD: Convert User entity to UserDTO
     */
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .instituteName(user.getInstituteName())
                .areaOfExpertise(user.getAreaOfExpertise())
                .emailVerified(user.isEmailVerified())
                .profileImage(user.getProfileImage())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .updatedAt(user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null)
                .build();
    }
}