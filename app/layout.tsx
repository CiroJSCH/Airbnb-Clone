import { Nunito } from 'next/font/google';

import Navbar from '@/components/navbar/Navbar';

import '@/styles/globals.css';
import ToasterProvider from './providers/ToasterProvider';
import ClientOnly from './components/shared/ClientOnly';
import RentModal from './components/modals/RentModal';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import { getCurrentUser } from './actions/getCurrentUser';

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone',
};

const font = Nunito({
	subsets: ['latin'],
});

export default async function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {

	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<RentModal />
					<RegisterModal />
					<LoginModal />
					<Navbar currentUser={currentUser}/>
				</ClientOnly>
				<main className='pb-20 pt-28'>
					{children}
				</main>
			</body>
		</html>
	);
}
