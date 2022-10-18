//Import React Items
import React, { useState } from "react";
import { useQuery } from "react-query";

//Components
import Item from "./Cart/Item/Item";
import Cart from "./Cart/Cart";
import RecentPurchases from "./RecentPurchase/recentPurchase";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import {
	Toolbar,
	Typography,
	Badge,
	Grid,
	LinearProgress,
	Drawer,
} from "@material-ui/core";

//Styles
import {
	Wrapper,
	StyledButton,
	StyledAppBar,
	HeaderTypography,
} from "./App.styles";

//Types
export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};

const getCheeses = async (): Promise<CartItemType[]> =>
	await (await fetch(`api/cheeses`)).json();

//this function contains few react hooks which are used to define the open and close of certain functionalities such as
//dialog and drawers. Those hooks are also used to record information inputted bu the user as well as including
//loading functionalities
const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [recentPurchaseOpen, setRecentPurchaseOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	const { data, isLoading, error } = useQuery<CartItemType[]>(
		"cheeses",
		getCheeses
	);
	console.log(data);

	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount, 0);

	//this function is used to set empty cart such that when the cart is empty, it removes the items and close the dialog
	//that this function provides. Used after the user has successfully purchased the items
	const handleEmptyCart = () => {
		setCartItems([]);
		setCartOpen(false);
	};

	//this function is used to open the cart, such that the dialog will pop up from the right side when the button is clicked
	const handleOpenCart = () => {
		setCartOpen(true);
	};

	//this function is used to open the recent purchase icon, such that the drawer will pop up from the left side when the button
	//is clicked
	const handlePurchaseOpen = () => {
		setRecentPurchaseOpen(true);
	};

	//this function is used to close the recent purchase drawer
	const handlePurchaseClose = () => {
		setRecentPurchaseOpen(false);
	};

	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems((prev) => {
			// 1. Is the item already added in the cart?
			const isItemInCart = prev.find((item) => item.id === clickedItem.id);

			if (isItemInCart) {
				return prev.map((item) =>
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			}
			// First time the item is added
			return [...prev, { ...clickedItem, amount: 1 }];
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems((prev) =>
			prev.reduce((ack, item) => {
				if (item.id === id) {
					if (item.amount === 1) return ack;
					return [...ack, { ...item, amount: item.amount - 1 }];
				} else {
					return [...ack, item];
				}
			}, [] as CartItemType[])
		);
	};

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong ...</div>;

	return (
		<Wrapper data-cy={`home`}>
			<StyledAppBar position="static">
				<Toolbar>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<StyledButton
							data-cy={`recent-purchase-button-styled`}
							onClick={handlePurchaseOpen}
						>
							<RestoreIcon />
							<Typography variant="subtitle2">Recent Purchases</Typography>
						</StyledButton>

						<HeaderTypography variant="h3" noWrap>
							Welcome to Patient Zero's Cheeseria
						</HeaderTypography>

						<StyledButton data-cy={`cart-open-button`} onClick={handleOpenCart}>
							<Badge
								badgeContent={getTotalItems(cartItems)}
								color="error"
								data-cy="badge-count"
							>
								<AddShoppingCartIcon />
							</Badge>

							<Typography variant="subtitle2">Cart</Typography>
						</StyledButton>
					</Grid>
				</Toolbar>
			</StyledAppBar>

			<Drawer
				anchor="left"
				open={recentPurchaseOpen}
				onClose={handlePurchaseClose}
			>
				<RecentPurchases />
			</Drawer>

			<Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
					emptyCart={handleEmptyCart}
				/>
			</Drawer>

			<Grid container spacing={3}>
				{data?.map((item) => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
};

export default App;
