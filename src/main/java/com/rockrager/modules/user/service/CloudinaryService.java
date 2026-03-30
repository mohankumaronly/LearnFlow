package com.rockrager.modules.user.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "folder", "profile_images"
                    )
            );

            String imageUrl = uploadResult.get("secure_url").toString();
            log.info("Image uploaded successfully: {}", imageUrl);

            return imageUrl;

        } catch (IOException e) {
            log.error("Image upload failed: {}", e.getMessage());
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    public Map uploadImageWithPublicId(MultipartFile file, String publicId) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "public_id", publicId,
                            "folder", "profile_images"
                    )
            );

            log.info("Image uploaded successfully with public ID: {}", publicId);
            return uploadResult;

        } catch (IOException e) {
            log.error("Image upload failed: {}", e.getMessage());
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    public boolean deleteImage(String publicId) {
        try {
            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            boolean deleted = "ok".equals(result.get("result"));

            if (deleted) {
                log.info("Image deleted successfully: {}", publicId);
            } else {
                log.warn("Image deletion failed: {}", publicId);
            }

            return deleted;

        } catch (Exception e) {
            log.error("Image deletion failed: {}", e.getMessage());
            return false;
        }
    }

    public String extractPublicIdFromUrl(String imageUrl) {
        // Example URL: https://res.cloudinary.com/cloudname/image/upload/v1234567/profile_images/filename.jpg
        try {
            String[] parts = imageUrl.split("/");
            String filename = parts[parts.length - 1];
            return "profile_images/" + filename.substring(0, filename.lastIndexOf('.'));
        } catch (Exception e) {
            log.error("Failed to extract public ID from URL: {}", e.getMessage());
            return null;
        }
    }
}