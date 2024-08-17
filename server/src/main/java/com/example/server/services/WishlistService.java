//@Author Shivang Patel
package com.example.server.services;

import com.example.server.dto.response.GetPropertyResponse;
import com.example.server.dto.response.MessageResponse;

import java.util.List;

public interface WishlistService {
    MessageResponse addToWishlist(Integer userId, Integer propertyId);

    MessageResponse removeFromWishlist(Integer userId, Integer propertyId);

    List<GetPropertyResponse> getWishlistedProperties(Integer userId);

}
