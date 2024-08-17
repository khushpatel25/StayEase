// @author Ayushi Malhotra
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {amenities} from '@src/lib/data';
import {queryKeys} from '@src/lib/queries';
import {Loading} from '@src/src/components/loading';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@src/src/components/ui/avatar';
import {Button} from '@src/src/components/ui/button';
import {useQuery} from '@tanstack/react-query';
import {FaExternalLinkAlt} from 'react-icons/fa';
import {IconType} from 'react-icons/lib';
import {useSearchParams} from 'react-router-dom';

export const ReservationDetails = () => {
  const [search] = useSearchParams();
  const propertyId = search.get('propertyId') || undefined;
  const fullName = search.get('fullName') || 'U';
  const userAvatar = search.get('userAvatar') || undefined;
  const checkInDate = search.get('checkIn') || undefined;
  const checkOutDate = search.get('checkOut') || undefined;
  const amount = search.get('amount') || 0;
  const guests = search.get('guests') || 0;
  const child = search.get('child') || 0;

  const getPropertyQuery = useQuery({
    ...queryKeys.property.get(propertyId),
    enabled: !!propertyId,
  });

  if (!propertyId) {
    throw new Error('Invalid Property');
  }

  if (getPropertyQuery.isFetching) {
    return <Loading />;
  }

  const property = getPropertyQuery.data;

  if (!property) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-4xl font-semibold">❌ Property Not Found.</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-primary text-center font-bold">
        Reservation Details
      </h1>
      <div className="container lg:w-8/12 mt-5">
        <Carousel>
          <CarouselContent>
            {property.images.map((image) => (
              <CarouselItem key={image.img_url}>
                <div className="flex justify-center h-full w-96 mx-auto">
                  <img src={image?.img_url} className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="container lg:w-8/12 my-10">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-6/12">
            <span className="text-xs flex items-center gap-2 mb-2">
              📍 {property.location}, {property.area}{' '}
              <a
                href={`http://maps.google.com/?q=${property.location}`}
                target="_blank"
              >
                <FaExternalLinkAlt />
              </a>
            </span>
            <h1 className="text-2xl font-bold">{property.name}</h1>
            <p className="text-zinc-500">{property.address}</p>
            <div className="flex gap-5 mt-5 flex-wrap">
              {property.amenities?.map((amenity) => {
                const Icon = (amenities.find((a) => a.key === amenity)
                  ?.icon || <></>) as IconType;
                return (
                  <div
                    className="flex gap-2 text-sm font-light items-center"
                    key={amenity}
                  >
                    <Icon />
                    {amenity}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 space-y-2">
              <span className="text-md font-semibold">Guest: </span>
              <div className="flex items-center gap-5 ">
                <Avatar>
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{fullName[0]}</AvatarFallback>
                </Avatar>
                <span className="text-md">{fullName}</span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <span className="text-md font-semibold">Check-in Date: </span>
              <span className="text-md">{checkInDate}</span>
            </div>

            <div className="mt-5 space-y-2">
              <span className="text-md font-semibold">Check-out Date: </span>
              <span className="text-md">{checkOutDate}</span>
            </div>
          </div>
          <div className="md:w-6/12 md:ml-auto mt-5 md:mt-0">
            <div className="mt-5 space-y-2">
              <span className="text-md font-semibold">Booking Amount: </span>
              <span className="text-md">{amount} CAD</span>
            </div>
            <div className="mt-5 space-y-2">
              <span className="text-md font-semibold">Number of Guests: </span>
              <span className="text-md">{guests}</span>
            </div>
            <div className="mt-5 space-y-2">
              <span className="text-md font-semibold">
                Number of children:{' '}
              </span>
              <span className="text-md">{child}</span>
            </div>
            <Button className="w-half mt-6">Send a Message</Button>
          </div>
        </div>
      </div>
    </>
  );
};
