'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import categories from '@/constants/categories';

import Container from '../shared/Container';
import CategoryBox from '../shared/CategoryBox';

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathname = usePathname();

	const isMainPage = pathname === '/';

	if (!isMainPage) return null;
	return (
		<Container>
			<div className="pt-4 flex items-center justify-between overflow-x-auto">
				{
					categories.map(item => (
						<CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label}/>
					))
				}
			</div>
		</Container>
	);
};

export default Categories;