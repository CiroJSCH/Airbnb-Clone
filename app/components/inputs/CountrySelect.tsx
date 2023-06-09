'use client';

import Select from 'react-select';

import useCountries from '@/hooks/useCountries';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface ICountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ onChange, value }: ICountrySelectProps) => {
	const { getAll } = useCountries();

	return (
		<div>
			<Select
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={value}
				onChange={(value) => onChange(value as CountrySelectValue)}
				formatOptionLabel={(option: CountrySelectValue) => (
					<div className="itmes-center flex gap-3">
						<span>{option.flag}</span>
						<p>
							{option.label},
							<span className="ml-1 text-neutral-500">{option.region}</span>
						</p>
					</div>
				)}
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#FFE4E6',
					},
				})}
			/>
		</div>
	);
};

export default CountrySelect;
