'use client';
import { useCallback } from 'react';
import { useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';

import { SafeUser } from '@/types/index';
import useRentModal from '@/hooks/useRentModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

import Avatar from '../shared/Avatar';
import MenuItem from './MenuItem';

interface IUserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: IUserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className="relative">
			<div className="ites-center flex gap-3">
				<div
					onClick={onRent}
					className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
				>
          Airbnbn your home
				</div>
				<div
					onClick={toggleOpen}
					className="flex cursor-pointer items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>

			{isOpen ? (
				<div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
					<div className="flex cursor-pointer flex-col">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => console.log('hola')}
									label="My trips"
								/>
								<MenuItem
									onClick={() => console.log('hola')}
									label="My favorites"
								/>
								<MenuItem
									onClick={() => console.log('hola')}
									label="My reservations"
								/>
								<MenuItem
									onClick={() => console.log('hola')}
									label="My properties"
								/>
								<MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
								<hr />
								<MenuItem onClick={() => signOut()} label="Logout" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label="Login" />
								<MenuItem onClick={registerModal.onOpen} label="Sign Up" />
							</>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default UserMenu;
