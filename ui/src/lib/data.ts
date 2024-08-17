import {FaSwimmingPool, FaTv, FaUtensilSpoon, FaWifi} from 'react-icons/fa';
import {IoFastFood} from 'react-icons/io5';

export const amenities = [
  {
    label: 'TV',
    icon: FaTv,
    key: 'tv',
  },
  {
    label: 'Wifi',
    icon: FaWifi,
    key: 'wifi',
  },
  {
    label: 'Breakfast',
    icon: IoFastFood,
    key: 'breakfast',
  },
  {
    label: 'Kitchen Utilities',
    icon: FaUtensilSpoon,
    key: 'kitchen-utilities',
  },
  {
    label: 'Pool',
    icon: FaSwimmingPool,
    key: 'pool',
  },
];

export enum RoomType {
  VILLA = 'VILLA',
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
}
