// @author Tanuj Doshi, Ayushi Malhotra

package com.example.server.services.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import com.example.server.exception.ApiRequestException;
import java.util.stream.Collectors;
import java.util.Set;
import com.example.server.dto.request.PropertyAddRequest;
import com.example.server.dto.response.AddPropertyResponse;
import com.example.server.dto.response.BookingHistory;
import com.example.server.dto.response.GetPropertyResponse;
import com.example.server.dto.response.MessageResponse;
import com.example.server.entities.Booking;
import com.example.server.entities.Images;
import com.example.server.entities.Property;
import com.example.server.entities.User;
import com.example.server.utils.Awsutils;
import com.example.server.utils.ResponseUtils;

import lombok.RequiredArgsConstructor;

import com.example.server.repositories.BookingRepository;
import com.example.server.repositories.ImagesRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.repositories.propertyRepository;
import com.example.server.services.PropertyService;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    @Autowired
    private propertyRepository propertyRepository;
    @Autowired
    private ImagesRepository imagesRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Awsutils awsutils;
    @Autowired
    private BookingRepository bookingRepository;

    // @author Tanuj Doshi
    public AddPropertyResponse addProperty(Integer userId, PropertyAddRequest request) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            return AddPropertyResponse.builder()
                    .message("You are not allowed to perform this action.").success(false)
                    .build();
        }
        // User user = optionalUser.get();
        Property property = Property.builder().createdBy(user).name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .amenities(request.getAmenities()).propertyType(request.getPropertyType())
                .guestAllowed(request.getGuestAllowed())
                .price(request.getPrice()).noOfBaths(request.getNoOfBaths())
                .noOfBeds(request.getNoOfBeds()).area(request.getArea())
                .parking(request.getParking())
                .address(request.getAddress()).lat(request.getLat()).lng(request.getLng())
                .registrationTime(LocalDateTime.now()).build();
        propertyRepository.save(property);
        return AddPropertyResponse.builder().message("Property added successfully").success(true)
                .property_id(property.getPropertyId()).build();
    }

    // @author Tanuj Doshi
    public MessageResponse addImages(Integer userId, MultipartFile[] files, Integer propertyId) {

        Property property = propertyRepository.findByPropertyId(propertyId);
        String path = "property/" + propertyId;
        List<Images> propertyImages = new ArrayList<>();
        for (MultipartFile file : files) {
            String url = awsutils.uploadFileToS3(file, propertyId, path);
            Images image = new Images();
            image.setProperty(property);
            image.setImg_url(url);
            imagesRepository.save(image);
            System.out.println("-=-=-=-=- " + url);
            propertyImages.add(image);
        }
        property.setImages(propertyImages);

        return MessageResponse.builder().message("Images added succesfully.").success(true).build();
    }

    // @author Tanuj Doshi
    public MessageResponse deleteProperty(Integer userId, Integer propertyId) {
        if (userRepository.findById(userId) == null) {
            return MessageResponse.builder().message("You are not allowed to perform this action.")
                    .success(false)
                    .build();
        }
        Property property = propertyRepository.findByPropertyId(propertyId);
        if (property == null) {
            return MessageResponse.builder().message("Property not found.").success(false).build();
        }

        User createdBy = property.getCreatedBy();
        System.out.println("createdBy" + createdBy.getUserId());
        System.out.println("userId" + userId);
        System.out.println("Condition" + createdBy.getUserId().equals(userId));
        if (!createdBy.getUserId().equals(userId)) {
            return MessageResponse.builder().message("Only owners can delete a property.")
                    .success(false).build();
        }

        if (!property.getBookings().isEmpty()) {
            throw new ApiRequestException("Cannot delete property, as booking is associated with them");
        }

        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.getWishListedProperties().remove(property);
        }
        userRepository.saveAll(users);

        propertyRepository.delete(property);
        return MessageResponse.builder().message("Property deleted successfully.").success(true)
                .build();
    }

    public List<GetPropertyResponse> getOwnerProperties(Integer userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new ApiRequestException("User not found");
        }
        List<Property> userproperties = propertyRepository.findByCreatedBy(user);
        return userproperties.stream().map(ResponseUtils::convertPropertyResponse)
                .collect(Collectors.toList());
    }

    public GetPropertyResponse getproperty(Integer propertyId) {
        Property property = propertyRepository.findByPropertyId(propertyId);
        if (property == null)
            throw new ApiRequestException("Property with specified ID not available");
        return ResponseUtils.convertPropertyResponse(property);
    }

    public List<GetPropertyResponse> getAllproperties(Integer userId) {
        System.out.println("Property IDD" + userId);
        User user = userRepository.findByUserId(userId);

        if (user == null) {
            List<Property> allProperties = propertyRepository.findAll();

            return allProperties.stream()
                    .map(property -> ResponseUtils.convertAllPropertyResponse(property, null))
                    .collect(Collectors.toList());
        }

        Set<Property> wishlistedProperties = user.getWishListedProperties();
        Set<Integer> wishlistedPropertyIds = wishlistedProperties.stream().map(Property::getPropertyId)
                .collect(Collectors.toSet());

        List<Property> allProperties = propertyRepository.findAll();
        return allProperties.stream()
                .map(property -> ResponseUtils.convertAllPropertyResponse(property,
                        wishlistedPropertyIds))
                .collect(Collectors.toList());
    }

    // @author Ayushi Malhotra
    public List<BookingHistory> getOwnerReservation(Integer userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new ApiRequestException("User not found");
        }

        List<Property> ownerProperties = propertyRepository.findByCreatedBy(user);

        List<Booking> bookings = bookingRepository.findByPropertyIn(ownerProperties);

        List<BookingHistory> response = new ArrayList<>();
        for (Booking booking : bookings) {
            BookingHistory currentHistory = ResponseUtils.convertBookingHistory(booking, "Upcoming");
            response.add(currentHistory);
        }
        return response;
    }
}
