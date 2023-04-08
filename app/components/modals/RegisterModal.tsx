'use client';
import { useState, useCallback } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import axios from 'axios';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

import Heading from '../shared/Heading';
import Button from '../shared/Button';
import Input from '../inputs/Input';
import Modal from './Modal';

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post('/api/register', data)
			.then(() => {
				registerModal.onClose();
			})
			.catch(() => {
				toast.error('Something went wrong');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const toggleModal = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal]);


	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				type="password"
				label="Password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="mt-3 flex flex-col gap-4">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with GitHub"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="mt-4 text-center font-light text-neutral-500">
				<div className="flex justify-center flex-row items-center gap-2">
					<p>
            Already have an account?<span onClick={toggleModal} className='ml-1 text-neutral-800 cursor-pointer hover:underline'>Log in</span>
					</p>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
