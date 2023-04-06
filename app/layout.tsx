import { Nunito } from 'next/font/google';

import Navbar from '@/components/navbar/Navbar';

import '@/styles/globals.css';
import ToasterProvider from './providers/ToasterProvider';
import ClientOnly from './components/shared/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone',
};

const font = Nunito({
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<RegisterModal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
