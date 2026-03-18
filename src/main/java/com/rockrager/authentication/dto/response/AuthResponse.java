package com.rockrager.authentication.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String email;
    private String fullName;
    private String role;
    private String message;

    // NEW FIELD: Profile image URL
    private String profileImage;
}