/* eslint-disable @typescript-eslint/no-explicit-any */
// @author Tanuj Doshi
import {Loading} from '@src/src/components/loading';
import {Button} from '@src/src/components/ui/button';
import {toast} from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@src/src/components/ui/card';
import {stayeaseAxios} from '@src/lib/client';
import {queryKeys} from '@src/lib/queries';
import {useMutation, useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {FaEye, FaTrash} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useState} from 'react';

dayjs.extend(relativeTime);

export const ManagePropertyPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const myPropertiesQuery = useQuery(queryKeys.property.my());

  const deletePropertyMutation = useMutation({
    mutationFn: (id: string) => stayeaseAxios.delete(`property/delete/${id}`),
    onSuccess: () => myPropertiesQuery.refetch(),
    onError: (res: any) => {
      toast.error(res.response.data.message);
    },
  });

  // const handleDelete = (id: string) => {
  //   deletePropertyMutation.mutate(id);
  // };

  console.log('myPropertiesQuery.data', myPropertiesQuery.data);
  return (
    <>
      <h1 className="text-primary text-center">Manage Properties</h1>
      {myPropertiesQuery.isFetching && <Loading />}
      <div className="w-full mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!myPropertiesQuery.isFetching &&
            myPropertiesQuery.data?.map((home) => {
              const duration = dayjs(
                home.registrationTime as unknown as string,
              ).fromNow();

              return (
                <Card key={home.name}>
                  <img
                    className="h-48 w-full object-cover rounded-t-md"
                    src={home.images?.[0]?.img_url}
                  />

                  <CardHeader>
                    <CardTitle className="text-lg">{home.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {home.description?.slice(0, 100)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-xs">
                      <span className="font-semibold">${home.price}/Night</span>
                      <span className="flex gap-2 ml-auto">
                        <span>📍</span> {home.location}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-light text-xs">
                        Posted {duration}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-1/2 m-1"
                      onClick={() => navigate(`/property/${home.id}`)}
                    >
                      <FaEye className="mr-4" />
                      View
                    </Button>

                    <Button
                      className="ml-auto"
                      variant="outline"
                      onClick={() => {
                        setPropertyId(home.id);
                        setIsOpen(true);
                      }}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[340px] md:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
            </DialogHeader>
            <div className="py-4">Are you sure you want to delete?</div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                No
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (propertyId) {
                    deletePropertyMutation.mutate(propertyId);
                    setIsOpen(false);
                  }
                }}
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
