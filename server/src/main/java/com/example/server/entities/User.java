// @author Shivang Patel & Khush Patel

package com.example.server.entities;

import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicUpdate;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@Entity
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    private String fullName;
    @Column(unique = true, nullable = false)
    private String email;
    private String address;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private String password;
    private String phoneNumber;
    private boolean isVerified;
    private LocalDateTime registrationTime;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "property_wishlist", joinColumns = {
            @JoinColumn(name = "userId", referencedColumnName = "userId")},
            inverseJoinColumns = {
                    @JoinColumn(name = "propertyId", referencedColumnName = "propertyId")})
    @JsonIgnore
    private Set<Property> wishListedProperties;


    @Column(columnDefinition = "varchar(255) default 'CUSTOMER'")
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private String userAvatar;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }
    // public void addWishList(Property property) {
    // wishListedProperties.add(property);
    // }

}
