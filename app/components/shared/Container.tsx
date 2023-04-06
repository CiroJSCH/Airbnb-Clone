'use client';

interface IContainerProps {
	children: React.ReactNode;
}

const Container = ({children}: IContainerProps) => {
	return (
		<div className="max-w-[2520px] xl:px-20 md:px-10 mx-auto sm:px-2 px-4">{children}</div>
	);
};

export default Container;