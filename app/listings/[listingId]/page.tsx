import EmptyState from '@/components/shared/EmptyState';
import ClientOnly from '@/components/shared/ClientOnly';
import getReservations from '@/actions/getReservations';
import getListingById from '@/actions/getListingById';
import { getCurrentUser } from '@/actions/getCurrentUser';

import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params.listingId);
	const reservations = await getReservations(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient listing={listing} reservations={reservations} currentUser={currentUser}/>
		</ClientOnly>
	);
};

export default page;
