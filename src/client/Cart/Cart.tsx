//import react components
import React, { useState } from "react";

//import components from other files
import CartItem from "./CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";

//import styled items
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@material-ui/core";

//Defining Props which was done but I've added emptyCart to help assist an empty cart once the purchase is done
type Props = {
	cartItems: CartItemType[];
	addToCart: (clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
	emptyCart: () => void;
};

const Cart: React.FC<Props> = ({
	cartItems,
	addToCart,
	removeFromCart,
	emptyCart,
}) => {
	const calculateTotal = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

	//defined a hook to take in true or false based on whether the dialog is open or not
	const [DialogOpen, setDialogOpen] = useState(false);

	//this function is used to handle dialog such that if the cart has no items, an alert will pop up otherwise
	//the dialog will remains open until another choice has been made
	const handleClickDialogOpen = () => {
		cartItems.length === 0
			? alert("There Are No Items In The Cart")
			: setDialogOpen(true);
	};

	//this function is used to close the dialog
	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	//this function is used to post the request made by the user to the API route which is "/api/purchases" defined in
	//routes.ts
	const postCart = async (items: CartItemType[]) => {
		//this variable is used to define the body used in the request
		const purchasesBody = {
			items: items,
			total: calculateTotal(cartItems).toFixed(2),
		};

		//this variable builds on the configurations required in the call as well as the body defined in the previous variable
		//specifically, purchasesBody
		const request = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(purchasesBody),
		};

		//this try and catch will be used to assist the retrieval of data such that there is a try-catch block which handles
		//all of the errors that may potentially produced in this call. When successful, an alert including the success message
		//will pop up otherwise, an alert with error message will pop up.
		try {
			const getData = await fetch("/api/purchases", request);
			const jsonData = await getData.json();
			//dialog is then closed, the cart is then emptied before alerting and returning the data
			handleDialogClose();
			emptyCart();
			alert("The Items Have Been Purchased Successfully");
			return jsonData;
		} catch (err) {
			alert(
				"The Items Have Not Been Purchased Successfully, Please Contact The Admin"
			);
		}
	};

	return (
		<Wrapper>
			<h2>Your Shopping Cart</h2>
			{cartItems.length === 0 ? <p>No items in cart.</p> : null}
			{cartItems.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}
			<h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
			<Button
				data-cy={`items-checkout`}
				color="default"
				variant="contained"
				onClick={handleClickDialogOpen}
			>
				Checkout
			</Button>
			<Dialog
				data-cy={`cart-dialog`}
				open={DialogOpen}
				onClose={handleDialogClose}
			>
				<DialogContent>
					<DialogContentText>
						Your total payment for this order is $
						{calculateTotal(cartItems).toFixed(2)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						data-cy={`button-checkout`}
						color="primary"
						disableElevation
						variant="contained"
						onClick={() => postCart(cartItems)}
					>
						Purchase
					</Button>
					<Button
						data-cy={`cancel-button-checkout`}
						variant="contained"
						onClick={handleDialogClose}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Wrapper>
	);
};

export default Cart;
