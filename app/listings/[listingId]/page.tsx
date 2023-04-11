import EmptyState from '@/components/shared/EmptyState';
import ClientOnly from '@/components/shared/ClientOnly';
import getListingById from '@/actions/getListingById';
import { getCurrentUser } from '@/actions/getCurrentUser';

import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params.listingId);
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
			<ListingClient listing={listing} currentUser={currentUser}/>
		</ClientOnly>
	);
};

export default page;
