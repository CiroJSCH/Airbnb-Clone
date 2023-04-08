'use client';

import { useMemo, useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import useRentModal from '@/hooks/useRentModal';
import categories from '@/constants/categories';

import Heading from '../shared/Heading';
import CategoryInput from '../inputs/CategoryInput';
import Modal from './Modal';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guessCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const category = watch('category');

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) return 'Create';
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) return undefined;
		return 'Back';
	}, [step]);

	const bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							label={item.label}
							icon={item.icon}
							selected={category === item.label}
						/>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<Modal
			title="Airbnb your home"
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={rentModal.onClose}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
};

export default RentModal;
