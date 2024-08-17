//@author Khush Patel

package com.example.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RegisterRequest{
    @NotBlank(message = "Name is required")
    private String fullName;
    private String email;
    private String address;
    private Date dateOfBirth;
    private String password;
    private String phoneNumber;
}
