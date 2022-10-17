// importing items and type
import React from "react";
import { CartItemType } from "../../App";

// Styles
import { Wrapper } from "./itemPurchased.styles";

//defining a type similar to App.tsx where in this case, it is purchaseData
type purchaseData = {
	items: CartItemType[];
	total: number;
};

const itemPurchased: React.FC<purchaseData> = ({ items, total }) => {
	return (
		<Wrapper>
			{/* this mapping shows the name of the item, amount of the item and the total amount */}
			{items?.map((item) => (
				<div className="item">
					<div>
						<h3>
							<span>{item.title}</span>
						</h3>
						<div>
							<p>Amount: {item.amount}</p>
							<p>Total: ${(item.amount * item.price).toFixed(2)}</p>
						</div>
					</div>
					<img src={item.image} alt={item.title} />
				</div>
			))}
			<h3>Order Total: ${total}</h3>
		</Wrapper>
	);
};

export default itemPurchased;
