'use client';

import { IconType } from 'react-icons';

interface ICategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = ({
	icon: Icon,
	label,
	onClick,
	selected,
}: ICategoryInputProps) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black ${
				selected ? 'border-black' : 'border-neutral-200'
			}`}
		>
			<Icon size="30"/>
			<span className='font-semibold'>{label}</span>
		</div>
	);
};

export default CategoryInput;
