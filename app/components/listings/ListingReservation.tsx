'use client';

import { Range } from 'react-date-range';

import Button from '../shared/Button';
import Calendar from '../inputs/Calendar';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
	dateRange,
	disabledDates,
	onChangeDate,
	onSubmit,
	price,
	totalPrice,
	disabled,
}: ListingReservationProps) => {
	return (
		<section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
			<div className='flex flex-row items-center gap-1 p-4'>
				<p className='text-2xl font-semibold'>
          $ {price}
				</p>
				<p className='font-light text-neutral-600'>
          night
				</p>
			</div>
			<hr />
			<Calendar value={dateRange} disabledDates={disabledDates} onChange={(value: any) => onChangeDate(value.selection)}/>
			<hr />
			<div className='p-4'>
				<Button disabled={disabled} label="Reserve" onClick={onSubmit}/>
			</div>
			<div className='p-4 flex items-center justify-between font-semibold text-lg'>
				<p>
          Total
				</p>
				<p>
          $ {totalPrice}
				</p>
			</div>
		</section>
	);
};

export default ListingReservation;
