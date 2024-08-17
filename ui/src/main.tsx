import {HomePage} from '@src/routes';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import './index.css';
import {AuthLayout} from './layout/auth';
import {LandingLayout} from './layout/landings';
import {queryClient} from './lib/client';
import {AddProperty} from './routes/add-property';
import {AdminPage} from './routes/admin-page';
import confirmPassword from './routes/confirm-password';
import confirmRegistration from './routes/confirm-registration';
import {ContactPage} from './routes/contact';
import {FAQPage} from './routes/faq';
import forgotPassword from './routes/forgot-password';
import {ManagePropertyPage} from './routes/manage-property';
import {ManageReservationPage} from './routes/manage-reservation-page';
import {ManageTripsPage} from './routes/manage-trips';
import {PaymentPage} from './routes/payment';
import {ProfilePage} from './routes/profile';
import {StayPlacesProperties} from './routes/properties/properties-page';
import {Property} from './routes/property';
import {ReservationDetails} from './routes/reservation-details';
import SignInPage from './routes/signin';
import SignUpPage from './routes/signup';
import {TripHistoryPage} from './routes/trip-history';
import {Wishlist} from './routes/wishlist';
import {PropertiesByLocation} from './routes/properties/properties-by-location';
import {APIProvider} from '@vis.gl/react-google-maps';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthLayout>
        <LandingLayout />
      </AuthLayout>
    ),
    children: [
      {
        path: '/',
        Component: HomePage,
      },
      {
        path: '/faq',
        Component: FAQPage,
      },
      {
        path: '/contact',
        Component: ContactPage,
      },
      {
        path: '/wishlist',
        Component: Wishlist,
      },
      {
        path: '/signin',
        Component: SignInPage,
      },
      {
        path: '/signup',
        Component: SignUpPage,
      },
      {
        path: '/confirm_registration',
        Component: confirmRegistration,
      },
      {
        path: '/forgot-password',
        Component: forgotPassword,
      },
      {
        path: '/confirm_password',
        Component: confirmPassword,
      },
      {
        path: '/properties',
        Component: StayPlacesProperties,
      },
      {
        path: '/property/:propertyId',
        Component: Property,
      },
      {
        path: '/manage-trips',
        Component: ManageTripsPage,
      },
      {
        path: '/checkout',
        Component: PaymentPage,
      },
      {
        path: '/reservations',
        Component: ManageReservationPage,
      },
      {
        path: '/trips',
        Component: TripHistoryPage,
      },
      {
        path: '/manage',
        Component: ManagePropertyPage,
      },
      {
        path: '/add-property',
        Component: AddProperty,
      },
      {
        path: '/reservation-details',
        Component: ReservationDetails,
      },
      {
        path: '/admin',
        Component: AdminPage,
      },
      {
        path: '/profile',
        Component: ProfilePage,
      },
      {
        path: '/properties-by-location',
        element: (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <PropertiesByLocation />
          </APIProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ToastContainer />
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>,
);
