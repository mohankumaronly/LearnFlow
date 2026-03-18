package com.rockrager.authentication.controller;

import com.rockrager.authentication.security.user.CustomUserDetails;
import com.rockrager.authentication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController  // MUST HAVE THIS
@RequestMapping("/api/users")  // MUST HAVE THIS
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/avatar")  // THIS MAKES THE FULL PATH: /api/users/avatar
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
}