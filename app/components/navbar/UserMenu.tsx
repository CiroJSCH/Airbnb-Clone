'use client';
import { useCallback } from 'react';
import { useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';

import { SafeUser } from '@/types/index';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

import Avatar from '../shared/Avatar';
import MenuItem from './MenuItem';


interface IUserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu = ({currentUser}: IUserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const toggleOpen = useCallback(() => {
		setIsOpen(value => !value);
	}, []);

	return (
		<div className="relative">
			<div className="flex ites-center gap-3">
				<div onClick={() => console.log('Hola')} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnbn your home
				</div>
				<div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</div>
			</div>

			{ isOpen ? (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{
							currentUser ? (<>
								<MenuItem onClick={
									() => console.log('hola')
								} label="My trips"/>
								<MenuItem onClick={
									() => console.log('hola')
								} label="My favorites"/>
								<MenuItem onClick={
									() => console.log('hola')
								} label="My reservations"/>
								<MenuItem onClick={
									() => console.log('hola')
								} label="My properties"/>
								<MenuItem onClick={
									() => console.log('hola')
								} label="Airbnb my home"/>
								<hr />
								<MenuItem onClick={
									() => signOut()
								} label="Logout"/>
							</>) : (
						
								<>
									<MenuItem onClick={
										loginModal.onOpen
									} label="Login"/>
									<MenuItem onClick={
										registerModal.onOpen
									} label="Sign Up"/>
								</>
							)
						}
					</div>
				</div>
			) : null }
		</div>
	);
};

export default UserMenu;