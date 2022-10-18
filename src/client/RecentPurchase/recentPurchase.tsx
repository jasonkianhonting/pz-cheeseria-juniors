//Importing react to use its components
import React from "react";
import { useQuery } from "react-query";

//Importing items from other files
import PurchaseItem from "./ItemPurchased/itemPurchased";
import { CartItemType } from "../App";

//Importing style items
import LinearProgress from "@material-ui/core/LinearProgress";
import { Wrapper } from "./recentPurchase.styles";

//Similar to the type found in App.tsx, this is a type made specifically for purchases where items and total cost are recorded
export type purchaseItemType = {
	purchaseItems: CartItemType[];
	purchaseTotal: number;
};

//this function contains 2 function within it. One function is an API call to retreive the recent purchase result made by
//the user. The other function is used to fetch data from the first function using useQuery.
const RecentPurchases: React.FC = () => {
	//API call to retreive the recent purchases made by the user which is then converted to a JSON string to retreive the
	//information provided in the API call
	const getRecentPurchase = async () =>
		await (await fetch(`api/purchases`)).json();

	//this function is used to fetch data and also loads the data. UseQuery is used here as it fetches data and is relatively
	//easy to use - it takes two arguments, in this case, recentPurchase and getRecentPurchase. It then produces a response used
	//for the loading of the data as well as the error messages when necessary
	const { data, isLoading, error } = useQuery<purchaseItemType[]>(
		"recentPurchase",
		getRecentPurchase
	);

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong ...</div>;

	return (
		<Wrapper>
			<h2>Recent Purchases</h2>
			{data?.length === 0 ? (
				<p>
					<span data-cy={`no-recent-purchases`}>No Recent Purchase.</span>
				</p>
			) : null}
			{data?.map((item) => (
				<PurchaseItem items={item.purchaseItems} total={item.purchaseTotal} />
			))}
		</Wrapper>
	);
};

export default RecentPurchases;
