package com.rockrager.authentication.service;

import com.rockrager.authentication.entity.User;
import com.rockrager.authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

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
}