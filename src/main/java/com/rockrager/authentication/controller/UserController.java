package com.rockrager.authentication.controller;

import com.rockrager.authentication.dto.response.UserDTO;
import com.rockrager.authentication.entity.User;
import com.rockrager.authentication.security.user.CustomUserDetails;
import com.rockrager.authentication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * POST /api/users/avatar - Upload avatar (Any authenticated user)
     */
    @PostMapping("/avatar")
    public ResponseEntity<Map<String, String>> uploadAvatar(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        try {
            String imageUrl = userService.uploadAvatar(file, userDetails.getUser());

            Map<String, String> response = new HashMap<>();
            response.put("profileImage", imageUrl);
            response.put("message", "Profile image updated successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to upload image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * DELETE /api/users/avatar - Delete avatar (Any authenticated user)
     */
    @DeleteMapping("/avatar")
    public ResponseEntity<Map<String, String>> deleteAvatar(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        try {
            userService.deleteAvatar(userDetails.getUser());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile image deleted successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to delete image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * GET /api/users/profile - Get own profile (Any authenticated user)
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        User user = userDetails.getUser();

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("fullName", user.getFullName());
        profile.put("profileImage", user.getProfileImage());
        profile.put("role", user.getRole().name());
        profile.put("instituteName", user.getInstituteName());
        profile.put("areaOfExpertise", user.getAreaOfExpertise());
        profile.put("emailVerified", user.isEmailVerified());

        return ResponseEntity.ok(profile);
    }

    /**
     * GET /api/users/admin/users - Get all users (ADMIN only)
     */
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * GET /api/users/admin/users/{id} - Get user by ID (ADMIN only)
     */
    @GetMapping("/admin/users/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        UserDTO user = userService.getUserDTOById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Helper method to convert User to Map (for profile response)
     */
    private Map<String, Object> convertUserToMap(User user) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("email", user.getEmail());
        userMap.put("fullName", user.getFullName());
        userMap.put("profileImage", user.getProfileImage());
        userMap.put("role", user.getRole().name());
        userMap.put("instituteName", user.getInstituteName());
        userMap.put("areaOfExpertise", user.getAreaOfExpertise());
        userMap.put("emailVerified", user.isEmailVerified());
        return userMap;
    }
}