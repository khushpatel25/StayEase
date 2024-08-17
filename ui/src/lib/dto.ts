//@author Khush Patel, Ayushi Malhotra
import {imageType} from './types';

export class SigninRequest {
  constructor(
    public payload: {
      email: string;
      password: string;
    },
  ) {}
}

export class SignupRequest {
  constructor(
    public payload: {
      fullName: string;
      email: string;
      address: string;
      dateOfBirth: Date;
      password: string;
      phoneNumber: string;
    },
  ) {}
}

export class SigninResponse {
  constructor(
    public payload: {
      token?: string;
      user?: User['payload'];
      message?: string;
      success?: boolean;
    },
  ) {}
}

export class User {
  constructor(
    public payload: {
      userId: number;
      fullName: string;
      email: string;
      address: string;
      dateOfBirth: Date;
      password: string;
      phoneNumber: string;
      isVerified: boolean;
      userAvatar?: string;
      registrationTime: number[];
      userType: 'CUSTOMER' | 'ADMIN';
    },
  ) {}
}

export class GetUserByTokenResponse {
  constructor(
    public payload: {
      user?: User['payload'];
      message?: string;
      success?: boolean;
    },
  ) {}
}

export enum Propertytype {
  VILLA = 'VILLA',
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  CONDO = 'CONDO',
  TENT = 'TENT',
  TREEHOUSE = 'TREEHOUSE',
  ROOM = 'ROOM',
}

export class GetPropertyResponse {
  constructor(
    public payload: {
      createdBy: string;
      createdUserAvatar: string;
      bookingsUntilNow: number;
      id: string;
      name: string;
      description: string;
      location: string;
      address: string;
      amenities: string[];
      propertyType: Propertytype;
      price: number;
      noOfBeds: number;
      noOfBaths: number;
      guestAllowed: number;
      area: number;
      parking: boolean;
      lat: number;
      lng: number;
      wishList: boolean;
      images: Array<{id: number; img_url: string}>;
      registrationTime: number[];
    },
  ) {}
}

// @author Ayushi Malhotra
export class GetReservationResponse {
  constructor(
    public payload: {
      property: Property['payload'];
      user: User['payload'];
      bookingId: number;
      propertyName: string;
      amount: number;
      tax: number;
      totalAmount: number;
      noOfGuests: number;
      noOfChildren: number;
      bookingType: string;
      checkInDate: string;
      checkOutDate: string;
      images: imageType[];
      declineReason: null | string;
    },
  ) {}
}

// @author Ayushi Malhotra
export class Property {
  constructor(
    public payload: {
      propertyId: string;
      name: string;
      description: string;
      location: string;
      address: string;
      amenities: string[];
      propertyType: Propertytype;
      price: number;
      noOfBeds: number;
      noOfBaths: number;
      guestAllowed: number;
      area: number;
      parking: boolean;
      lat: number;
      lng: number;
      wishList: boolean;
      images: Array<{id: number; img_url: string}>;
      registrationTime: string;
    },
  ) {}
}

export class PropertyBookRequest {
  constructor(
    public payload: {
      checkInDate: string;
      checkOutDate: string;
      noOfChildren: number;
      noOfGuests: number;
      tax: number;
      totalAmount: number;
      amount: number;
      property_id: number;
    },
  ) {}
}

export class PropertyAddRequest {
  constructor(
    public payload: {
      name: string;
      description: string;
      location: string;
      address: string;
      amenities: string[];
      propertyType: Propertytype;
      price: number;
      noOfBeds: number;
      noOfBaths: number;
      guestAllowed: number;
      area: number;
      parking: boolean;
      lat: number;
      lng: number;
    },
  ) {}
}

export class AddPropertyResponse {
  constructor(public payload: {property_id: string}) {}
}

export class GetAdminDataResponse {
  constructor(
    public payload: {
      userCount: number;
      propertyCount: number;
      success: boolean;
      message: string | null;
      users: User['payload'][] | [];
      bookings: Bookings['payload'][] | [];
      properties: GetPropertyResponse['payload'][] | [];
    },
  ) {}
}

export class Bookings {
  constructor(
    public payload: {
      id: number;
      property: GetPropertyResponse['payload'];
      user: User['payload'];
      checkOutDate: number[];
      checkInDate: number[];
      amount: number;
      totalAmount: number;
      noOfChildren: number;
      noOfGuests: number;
      tax: number;
      status: null;
      declineReason: null;
    },
  ) {}
}

export class UpdateUserRequest {
  constructor(
    public payload: {
      fullName: string;
      address: string;
      dateOfBirth: Date;
      phoneNumber: string;
    },
  ) {}
}

//@author Khush Patel
export class GetFeedbacksResponse {
  constructor(
    public payload: {
      user: User['payload'];
      id: number;
      rating: string;
      content: string;
      createdAt: number[];
    },
  ) {}
}
export class BookingHistoryResponse {
  constructor(
    public payload: {
      amount: number;
      bookingType: string;
      checkInDate: string;
      checkOutDate: string;
      noOfChildren: number;
      noOfGuests: number;
      property: any;
      propertyName: string;
      tax: number;
      totalAmount: number;
      images: imageType[];
    },
  ) {}
}
