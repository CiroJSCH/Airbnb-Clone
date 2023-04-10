'use client';

import { useCallback } from 'react';

import { TbPhotoPlus } from 'react-icons/tb';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange],
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="jryojszi"
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
					>
						<TbPhotoPlus size="50" />
						<p className="text-lg font-semibold">Click to upload</p>
						{value && (
							<div className='absolute inset-0 w-full h-full'>
								<Image alt="upload" fill className='object-cover' src={value}/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
