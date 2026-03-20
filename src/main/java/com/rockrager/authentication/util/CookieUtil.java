package com.rockrager.authentication.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpirationMs;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpirationMs;

    // Set to false for local development (HTTP), true for production with HTTPS
    private static final boolean SECURE_COOKIE = false;

    private static final String SAME_SITE = "Lax";
    private static final String COOKIE_PATH = "/";
    private static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    /**
     * Create HTTP-only cookie for access token
     */
    public void createAccessTokenCookie(HttpServletResponse response, String token) {
        int maxAge = (int) (accessTokenExpirationMs / 1000); // Convert milliseconds to seconds

        Cookie cookie = new Cookie(ACCESS_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);      // 🔒 Can't be accessed by JavaScript
        cookie.setSecure(SECURE_COOKIE); // 🔒 HTTPS only (false for local dev)
        cookie.setPath(COOKIE_PATH);    // Available for all paths
        cookie.setMaxAge(maxAge);       // Match token expiry
        cookie.setAttribute("SameSite", SAME_SITE); // CSRF protection

        response.addCookie(cookie);
        System.out.println("✅ Access token cookie set, maxAge: " + maxAge + " seconds");
    }

    /**
     * Create HTTP-only cookie for refresh token
     */
    public void createRefreshTokenCookie(HttpServletResponse response, String token) {
        int maxAge = (int) (refreshTokenExpirationMs / 1000); // Convert to seconds

        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(SECURE_COOKIE);
        cookie.setPath(COOKIE_PATH);
        cookie.setMaxAge(maxAge);
        cookie.setAttribute("SameSite", SAME_SITE);

        response.addCookie(cookie);
        System.out.println("✅ Refresh token cookie set, maxAge: " + maxAge + " seconds");
    }

    /**
     * Clear access token cookie
     */
    public void clearAccessTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(ACCESS_TOKEN_COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(SECURE_COOKIE);
        cookie.setPath(COOKIE_PATH);
        cookie.setMaxAge(0); // Delete immediately

        response.addCookie(cookie);
        System.out.println("✅ Access token cookie cleared");
    }

    /**
     * Clear refresh token cookie
     */
    public void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(SECURE_COOKIE);
        cookie.setPath(COOKIE_PATH);
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        System.out.println("✅ Refresh token cookie cleared");
    }

    /**
     * Get token value from cookies
     */
    public String getTokenFromCookie(jakarta.servlet.http.Cookie[] cookies, String cookieName) {
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * Get access token from cookies
     */
    public String getAccessTokenFromCookies(jakarta.servlet.http.Cookie[] cookies) {
        return getTokenFromCookie(cookies, ACCESS_TOKEN_COOKIE_NAME);
    }

    /**
     * Get refresh token from cookies
     */
    public String getRefreshTokenFromCookies(jakarta.servlet.http.Cookie[] cookies) {
        return getTokenFromCookie(cookies, REFRESH_TOKEN_COOKIE_NAME);
    }
}