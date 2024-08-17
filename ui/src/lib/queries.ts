//@author Mayursinh Sarvaiya, Khush Patel, Ayushi Malhotra, Shivang Patel

import {createQueryKeyStore} from '@lukemorales/query-key-factory';
import {stayeaseAxios} from './client';
import {
  GetUserByTokenResponse,
  GetPropertyResponse,
  GetReservationResponse,
  GetFeedbacksResponse,
} from './dto';

export const queryKeys = createQueryKeyStore({
  user: {
    get: (token?: string) => ({
      queryKey: [token],
      queryFn: () =>
        stayeaseAxios
          .get(`auth/me`)
          .then((res) => new GetUserByTokenResponse(res.data).payload),
    }),
  },
  // @author Mayursinh Sarvaiya
  property: {
    get: (propertyId?: string) => ({
      queryKey: [propertyId],
      queryFn: () =>
        stayeaseAxios
          .get(`property/${propertyId}`)
          .then((res) => new GetPropertyResponse(res.data).payload),
    }),
    list: () => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios
          .get(`property/all-properties`)
          .then((res) => res.data as GetPropertyResponse['payload'][]),
    }),
    // @author Ayushi Malhotra
    my: () => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios
          .get(`property/my-properties`)
          .then((res) => res.data as GetPropertyResponse['payload'][]),
    }),
  },
  reservations: {
    get: () => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios
          .get('property/all-reserved-properties')
          .then((res) => res.data as GetReservationResponse['payload'][]),
    }),
  },
  // @Author Shivang Patel
  wishlist: {
    list: () => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios
          .get(`wishlist/my-properties`)
          .then((res) => res.data as GetPropertyResponse['payload'][]),
    }),
  },
  // @Author Drashti Patel
  history: {
    upcomming: () => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios.get(`booking/upcoming`).then((res) => res.data),
    }),
  },
  // @Author Khush Patel
  feedback: {
    get: (propertyId?: string) => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios
          .get(`review/get/${propertyId}`)
          .then((res) => res.data as GetFeedbacksResponse['payload'][]),
    }),
  },
});
