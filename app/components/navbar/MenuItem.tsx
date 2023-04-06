"use client";

interface IMenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = ({onClick, label}: IMenuItemProps) => {
	return (
		<button onClick={onClick} className="text-start px-4 py-3 hover:bg-neutral-100 transition font-semibold">{label}</button>
	);
};

export default MenuItem;