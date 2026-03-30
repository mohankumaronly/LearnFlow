package com.rockrager.modules.user.dto;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private UUID id;
    private String fullName;
    private String email;
    private String role;
    private String instituteName;
    private String areaOfExpertise;
    private boolean emailVerified;
    private String profileImage;
    private String createdAt;
    private String updatedAt;
}