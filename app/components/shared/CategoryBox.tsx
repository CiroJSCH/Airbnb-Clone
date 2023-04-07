'use client';

import { useCallback } from 'react';

import { IconType } from 'react-icons';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

interface ICategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({icon: Icon, label, selected}: ICategoryBoxProps) => {

	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(
		() => {
			let currentQuery = {};

			if (params) {
				currentQuery = qs.parse(params.toString());
			}

			const updatedQuery: any = {
				...currentQuery,
				category: label,
			};

			if (params?.get('category') === label) {
				delete updatedQuery.category;
			}
			const url = qs.stringifyUrl({
				url: '/',
				query: updatedQuery,
			}, {skipNull: true});

			router.push(url);
		},
		[label, params, router],
	);
  

	return (
		<div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}`} onClick={handleClick}>
			<Icon size={26}/>
			<p className='font-medium text-sm'>
				{label}
			</p>
		</div>
	);
};

export default CategoryBox;