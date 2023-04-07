'use client';

import { SafeUser } from '@/types';
import Container from '@/components/shared/Container';

import UserMenu from './UserMenu';
import Search from './Search';
import Logo from './Logo';

interface INavbarProps {
	currentUser?: SafeUser | null;
}

const Navbar = ({currentUser}: INavbarProps) => {
	console.log(currentUser);
	return (
		<nav className='fixed w-full bg-white z-10 shadow-sm'>
			<div className='py-4 border-b'>
				<Container>
					<div className='flex items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Search/>
						<UserMenu currentUser={currentUser}/>
					</div>
				</Container>
			</div>
		</nav>
	);
};

export default Navbar;