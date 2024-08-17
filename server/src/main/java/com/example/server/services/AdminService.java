//@author Tanuj Doshi
package com.example.server.services;

import com.example.server.dto.response.AdminResponse;

public interface AdminService {
    AdminResponse getAdminData(Integer userId);
}
