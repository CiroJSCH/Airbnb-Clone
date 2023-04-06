'use client';

import Container from '@/components/shared/Container';

import UserMenu from './UserMenu';
import Search from './Search';
import Logo from './Logo';

const Navbar = () => {
	return (
		<nav className='fixed w-full bg-white z-10 shadow-sm'>
			<div className='py-4 border-b'>
				<Container>
					<div className='flex items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Search/>
						<UserMenu />
					</div>
				</Container>
			</div>
		</nav>
	);
};

export default Navbar;