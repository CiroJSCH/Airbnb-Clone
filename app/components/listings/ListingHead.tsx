import React from 'react';

import Image from 'next/image';

import { SafeUser } from '@/types';
import useCountries from '@/hooks/useCountries';

import HeartButton from '../shared/HeartButton';
import Heading from '../shared/Heading';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
	id,
	imageSrc,
	locationValue,
	title,
	currentUser,
}: ListingHeadProps) => {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
				<Image
					alt="listing image"
					src={imageSrc}
					fill
					className="w-full object-cover"
				/>
				<div className="absolute right-5 top-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;
