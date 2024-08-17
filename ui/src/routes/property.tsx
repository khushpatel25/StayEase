// @author Mayursinh Sarvaiya
// @author Drashti Patel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {FaDollarSign} from 'react-icons/fa';
import {IoClose} from 'react-icons/io5';
import {MdFamilyRestroom} from 'react-icons/md';

import {IoHome} from 'react-icons/io5';

import {DatePickerWithRange} from '@/components/date-range-picker';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import {Separator} from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Slider} from '@/components/ui/slider';
import {amenities} from '@src/lib/data';
import {queryKeys} from '@src/lib/queries';
import {Loading} from '@src/src/components/loading';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@src/src/components/ui/avatar';
import {useUserStore} from '@src/store/user';
import {useQuery} from '@tanstack/react-query';
import {addDays, intervalToDuration} from 'date-fns';
import {useState} from 'react';
import {FaExternalLinkAlt} from 'react-icons/fa';
import {IconType} from 'react-icons/lib';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import FeedbackCard from '@src/src/components/FeedbackCard';

export const Property = () => {
  const isLoggedIn = useUserStore((store) => store.isLoggedIn);
  const {propertyId} = useParams();
  const navigate = useNavigate();

  const getPropertyQuery = useQuery({
    ...queryKeys.property.get(propertyId),
    enabled: !!propertyId,
  });

  const getFeedbackQuery = useQuery({
    ...queryKeys.feedback.get(propertyId),
    enabled: !!propertyId,
  });

  console.log({getFeedbackQuery});

  const [date, setDate] = useState<[Date?, Date?]>([
    new Date(),
    addDays(new Date(), 7),
  ]);

  const intervalDuration =
    date[0] &&
    date[1] &&
    intervalToDuration({
      start: date[0],
      end: date[1],
    });

  const [guests, setGuests] = useState(2);

  if (!propertyId) {
    throw new Error('Invalid Property');
  }

  if (getPropertyQuery.isFetching) {
    return <Loading />;
  }

  const property = getPropertyQuery.data;
  const feedbacks = getFeedbackQuery.data;
  console.log({feedbacks});
  const isFeedbackFetching = getFeedbackQuery.isFetching;
  console.log({isFeedbackFetching});

  if (!property) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-4xl font-semibold">❌ Property Not Found.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="container lg:w-8/12 mt-5">
        <Carousel>
          <CarouselContent>
            {property.images.map((image) => (
              <CarouselItem key={image.img_url}>
                <div className="flex justify-center h-96 w-full mx-auto">
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
          <div className="w-full lg:w-6/12">
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
            <p className="text-zinc-500">{property.description}</p>
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
              <span className="text-sm">Host: </span>
              <div className="flex items-center gap-5 ">
                <Avatar>
                  <AvatarImage src={property.createdUserAvatar} />
                  <AvatarFallback>{property.createdBy[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">
                  {property.createdBy}
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-6/12 md:ml-auto mt-5 md:mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  $ {property.price} / Night
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Sheet>
                  <SheetTrigger className="w-full">
                    <Button className="w-full">
                      <IoHome className="mr-2" />
                      Reserve
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="xl:w-[500px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
                    <SheetHeader>
                      <SheetTitle>Make Reservation</SheetTitle>
                      <SheetDescription>
                        <div className="flex gap-2 mt-5 flex-col">
                          <label>Check In - Check Out</label>
                          <DatePickerWithRange
                            dateRange={date}
                            setDateRange={(range) =>
                              setDate([range?.from, range?.to])
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-3 mt-8">
                          <label className="flex gap-2 items-center">
                            <MdFamilyRestroom className="text-xl" /> Guests -{' '}
                            {guests}
                          </label>
                          <Slider
                            value={[guests]}
                            onValueChange={(value) => setGuests(value[0])}
                            min={1}
                            max={10}
                            step={1}
                          />
                        </div>

                        {(property?.amenities?.length || 0) > 0 && (
                          <div className="flex flex-col gap-3 mt-8">
                            <label>Amenities Exclusion</label>
                            <div className="flex gap-5">
                              {property.amenities?.map((exclusion) => (
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    key={exclusion}
                                    icon={<IoClose />}
                                  />
                                  <span className="text-sm">{exclusion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Card className="mt-8">
                          <CardHeader>
                            <CardTitle className="text-2xl">Total</CardTitle>
                            <Separator />
                          </CardHeader>
                          <CardContent>
                            <span>
                              $ {property.price} / Night *{' '}
                              {intervalDuration?.days || 0} Nights
                            </span>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full"
                              onClick={() => {
                                if (!isLoggedIn) {
                                  toast.error('You have to login first', {
                                    position: 'bottom-right',
                                  });
                                  return;
                                }
                                navigate(
                                  `/checkout?checkIn=${date[0]?.toISOString()}&checkOut=${date[1]?.toISOString()}&guests=${guests}&price=${property.price}&total=${property.price * (intervalDuration?.days || 0)}&type=${property.propertyType}&id=${property.id}`,
                                );
                              }}
                            >
                              <FaDollarSign />
                              {property.price * (intervalDuration?.days || 0)}
                              <span className="ml-3">Pay Now</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          </div>
        </div>
        {/* //@author Khush Patel */}
        <div className="mt-4container lg:w-8/12 my-8">
          <h2 className="text-2xl font-bold mb-5">Feedback</h2>
          {feedbacks?.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            <div className="space-y-4">
              {feedbacks?.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
