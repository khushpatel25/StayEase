// @author Tanuj Doshi
package com.example.server.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.server.converter.StringListConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stripe.model.Review;
import java.util.List;
import org.hibernate.annotations.DynamicUpdate;
import jakarta.persistence.CascadeType;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Set;

@Data
@Builder
@Entity
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer propertyId;
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "createdBy")
    @ToString.Exclude
    @JsonBackReference
    private User createdBy;

    private String location;
    private String address;
    @Column(columnDefinition = "JSON")
    @Convert(converter = StringListConverter.class)
    private List<String> amenities;
    @Enumerated(EnumType.STRING)
    private Propertytype propertyType;
    private BigDecimal price;
    private Integer noOfBeds;
    private Integer noOfBaths;
    private Integer guestAllowed;
    private BigDecimal area;
    private Boolean parking;
    private Double lat;
    private Double lng;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime registrationTime;

    @OneToMany(mappedBy = "property")
    @JsonManagedReference
    private List<Booking> bookings;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JsonManagedReference
    private List<Images> images;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Property property = (Property) o;
        return Objects.equals(propertyId, property.propertyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(propertyId);
    }
}
