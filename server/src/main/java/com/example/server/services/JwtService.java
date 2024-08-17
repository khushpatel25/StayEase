//@author Khush Patel

package com.example.server.services;

import com.example.server.entities.User;

import java.util.Map;

public interface JwtService{
    Integer extractUserId(String token);

    String generateToken(User user);

    String generateToken(Map<String, Object> extraClaims, User user);

    boolean isTokenValid(String token, User user);

}
