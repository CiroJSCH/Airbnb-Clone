'use client';

import { useCallback, useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';

import Button from '../shared/Button';

interface IModalProps {
  onClose: () => void;
  onSubmit: () => void;
  actionLabel: string;
  secondaryAction?: () => void;
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryLabel?: string;
}

const Modal = ({onClose, onSubmit, actionLabel, body, disabled, footer, isOpen, secondaryAction, secondaryLabel, title}: IModalProps) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);
  
	const handleClose = useCallback(
		() => {
			if (disabled) return;

			setShowModal(false);
			setTimeout(() => {
				onClose();
			}, 300);
		},
		[disabled, onClose],
	);
  
	const handleSubmit = useCallback(() => {
		if (disabled) return;

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(
		() => {
			if (disabled || !secondaryAction) return;
			secondaryAction();
		},
		[disabled, secondaryAction],
	);

	if (!isOpen) return null;
  
	return (
		<>
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
				<div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto'>
					{/* Content */}
					<div className={`translate duration-300 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
						<div className='traslate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
							{/* Header */}
							<div className='flex items-center p-6 rounded-t justify-center relative border-b'>
								<button className='p-1 border-0 hover:opacity-70 transition absolute left-9' onClick={handleClose}>
									<IoMdClose size="18"/>
								</button>
								<h3 className='text-lg font-semibold'>
									{title}
								</h3>
							</div>
							{/* Body */}
							<div className='relative p-6 flex-auto'>
								{body}
							</div>
							{/* Footer */}
							<div className='flex flex-col gap-2 p-6'>
								<div className='flex items-center gap-4 w-full'>
									<Button icon={IoMdClose} label="My button"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;