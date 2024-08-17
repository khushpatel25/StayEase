// @author Tanuj Doshi, Ayushi Malhotra

package com.example.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import com.example.server.dto.request.PropertyAddRequest;
import com.example.server.dto.response.AddPropertyResponse;
import com.example.server.dto.response.BookingHistory;
import com.example.server.dto.response.GetPropertyResponse;
import com.example.server.dto.response.MessageResponse;
import com.example.server.services.JwtService;
import com.example.server.services.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/property")
@RequiredArgsConstructor
public class PropertyController {
    private final PropertyService propertyService;
    private final JwtService jwtService;

    // @author Tanuj Doshi
    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AddPropertyResponse> addProperty(
            @RequestHeader("Authorization") String jwtToken,
            @RequestBody PropertyAddRequest request) {
        Integer userId = jwtService.extractUserId(jwtToken.substring(7));
        AddPropertyResponse response = propertyService.addProperty(userId, request);
        return ResponseEntity.ok(response);
    }

    // @author Tanuj Doshi
    @DeleteMapping("/delete/{propertyId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<MessageResponse> deleteProperty(@PathVariable Integer propertyId,
            @RequestHeader("Authorization") String jwtToken) {
        Integer userId = jwtService.extractUserId(jwtToken.substring(7));
        MessageResponse response = propertyService.deleteProperty(userId, propertyId);
        return ResponseEntity.ok(response);
    }

    // @author Tanuj Doshi
    @GetMapping("/my-properties")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<GetPropertyResponse>> getOwnerProperties(
            @RequestHeader("Authorization") String jwtToken) {
        Integer userId = jwtService.extractUserId(jwtToken.substring(7));
        List<GetPropertyResponse> response = propertyService.getOwnerProperties(userId);
        return ResponseEntity.ok(response);
    }

    // @author Tanuj Doshi
    @PutMapping("/add-images/{propertyId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<MessageResponse> addImages(
            @RequestPart(value = "files") MultipartFile[] files,
            @RequestHeader("Authorization") String jwtToken, @PathVariable Integer propertyId) {
        Integer userId = jwtService.extractUserId(jwtToken.substring(7));
        MessageResponse response = propertyService.addImages(userId, files, propertyId);
        return ResponseEntity.ok(response);
    }

    // @author Mayursinh Sarvaiya
    @GetMapping("/{propertyId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<GetPropertyResponse> getProperty(@PathVariable Integer propertyId) {
        GetPropertyResponse response = propertyService.getproperty(propertyId);
        return ResponseEntity.ok(response);
    }

    // @author Mayursinh Sarvaiya
    @GetMapping("/all-properties")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<GetPropertyResponse>> getAllProperties(
            @RequestHeader(value = "Authorization", required = false) String jwtToken) {
        Integer userId = null;
        if (jwtToken != null && jwtToken.startsWith("Bearer ")) {
            userId = jwtService.extractUserId(jwtToken.substring(7));
        }

        List<GetPropertyResponse> response = propertyService.getAllproperties(userId);
        return ResponseEntity.ok(response);
    }

    // @author Ayushi Malhotra
    @GetMapping("/all-reserved-properties")
    public ResponseEntity<List<BookingHistory>> getReserveProperties(
            @RequestHeader(value = "Authorization", required = false) String jwtToken) {
        Integer userId = null;
        if (jwtToken != null && jwtToken.startsWith("Bearer ")) {
            userId = jwtService.extractUserId(jwtToken.substring(7));
        }

        List<BookingHistory> properties = propertyService.getOwnerReservation(userId);
        return ResponseEntity.ok(properties);
    }
}
