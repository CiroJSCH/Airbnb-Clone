import { SafeListing } from './types';
import EmptyState from './components/shared/EmptyState';
import Container from './components/shared/Container';
import ClientOnly from './components/shared/ClientOnly';
import ListingCard from './components/listings/ListingCard';
import getListings, { IListingsParams } from './actions/getListings';
import { getCurrentUser } from './actions/getCurrentUser';

interface HomeProps {
	searchParams: IListingsParams
}

const Home = async ({searchParams}: HomeProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<Container>
				<div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{
						listings.map((listing: SafeListing) => (
							<ListingCard key={listing.id} currentUser={currentUser} data={listing} />
						))
					}
				</div>
			</Container>
		</ClientOnly>
	);
};

export default Home;
