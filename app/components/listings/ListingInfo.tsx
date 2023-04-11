'use client';

import { IconType } from 'react-icons';
import dynamic from 'next/dynamic';

import { SafeUser } from '@/types';
import useCountries from '@/hooks/useCountries';

import Avatar from '../shared/Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import ('../shared/Map'), {
	ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo = ({
	bathroomCount,
	category,
	description,
	guestCount,
	locationValue,
	roomCount,
	user,
}: ListingInfoProps) => {
	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue)?.latlng;

	return (
		<section className="flex flex-col col-span-4 gap-8">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-xl font-semibold">
					<p>Hosted by {user.name}</p>
					<Avatar src={user.image} />
				</div>
				<div className="flex items-center gap-4 font-light text-neutral-500">
					<p>{guestCount} guests</p>
					<p>{roomCount} rooms</p>
					<p>{bathroomCount} bathrooms</p>
				</div>
			</div>
			<hr />
			{category && <ListingCategory category={category} />}
			<hr />
			<p className='text-lg font-light text-neutral-500'>
				{description}
			</p>
			<hr />
			<Map center={coordinates}/>
		</section>
	);
};

export default ListingInfo;
