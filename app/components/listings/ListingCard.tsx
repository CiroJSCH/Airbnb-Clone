'use client';

import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Reservation } from '@prisma/client';

import { SafeListing, SafeUser } from '@/types';
import useCountries from '@/hooks/useCountries';

import HeartButton from '../shared/HeartButton';
import Button from '../shared/Button';

interface IListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = '',
	currentUser,
}: IListingCardProps) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) return;

			onAction?.(actionId);
		},
		[onAction, actionId, disabled],
	);

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice;

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) return null;

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')} - ${format(end, 'PP')}`;
	}, [reservation]);

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="group col-span-1 cursor-pointer"
		>
			<div className="flex w-full flex-col gap-2">
				<div className="relative aspect-square w-full overflow-hidden rounded-xl">
					<Image
						alt="Listing"
						src={data.imageSrc}
						className="h-full w-full object-cover transition group-hover:scale-110"
						fill
					/>
					<div className="absolute right-3 top-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<p className="text-lg font-semibold">
					{location?.region}, {location?.label}
				</p>
				<p className="font-light text-neutral-500">
					{reservationDate || data.category}
				</p>
				<div className="flex items-center gap-1">
					<p className="font-semibold text-emerald-600">$ {price}</p>
					{!reservation && <span className="font-light">night</span>}
				</div>
				{onAction && actionLabel && (
					<Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;
