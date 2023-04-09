'use client';

import { useCallback } from 'react';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface ICounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ onChange, subtitle, title, value }: ICounterProps) => {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [onChange, value]);

	const onReduce = useCallback(() => {
		if (value === 1) return;
		onChange(value - 1);
	}, [onChange, value]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col">
				<p className="font-medium">{title}</p>
				<p className="font-light text-gray-600">{subtitle}</p>
			</div>
			<div className="flex items-center gap-4">
				<button
					onClick={onReduce}
					className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80"
				>
					<AiOutlineMinus />
				</button>
				<span className='font-light text-xl text-neutral-600'>
					{value}
				</span>
				<button
					onClick={onAdd}
					className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80"
				>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	);
};

export default Counter;
