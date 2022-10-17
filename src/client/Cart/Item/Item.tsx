//import the react components
import React, { useState } from "react";

//import styled components
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

// Types
import { CartItemType } from "../../App";

// Styles
import { Wrapper } from "./Item.styles";

type Props = {
	item: CartItemType;
	handleAddToCart: (clickedItem: CartItemType) => void;
};

//this function contains the necessary components to allow a dialog to pop up when the card has been clicked on
const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
	//this hook is defined such that the variable will be able to record true or false in the call, allowing
	//the dialog to open or close based on the answer received.
	const [dialogOpen, setDialogOpen] = React.useState(false);

	//this function is used to open the dialog when clicked
	const handleClickDialogOpen = () => {
		setDialogOpen(true);
	};

	//this function is used to close the dialog when clicked
	const handleDialogClose = () => {
		setDialogOpen(false);
	};
	return (
		<Wrapper>
			<Button onClick={handleClickDialogOpen}>
				<div>
					<img src={item.image} alt={item.title} />
					<h3>{item.title}</h3>
					<h3>${item.price}</h3>
				</div>
			</Button>

			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>{item.title}</DialogTitle>
				<DialogContent>
					<DialogContentText>Category: {item.category}</DialogContentText>
					<DialogContentText>Description: {item.description}</DialogContentText>
					<DialogContentText>Price: ${item.price}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Ok</Button>
				</DialogActions>
			</Dialog>
			<Button
				onClick={() => handleAddToCart(item)}
				data-cy={`add-to-cart-${item.id}`}
			>
				Add to cart
			</Button>
		</Wrapper>
	);
};

export default Item;
