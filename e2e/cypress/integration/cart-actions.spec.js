/// <reference types="cypress" />

context("Cart Actions", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	//Test case 1: add items to cart
	//Expected: add items to cart
	it("Test Case 1: Add items to cart", () => {
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();

		cy.get("[data-cy=badge-count]").should("have.text", "2");
	});

	// Test case 2: ideal case for purchasing items
	// Expected: add items into the cart then purchased it successfully
	it("Test Case 2: Purchase Items Ideal Case", () => {
		// test units to add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();

		//test unit to count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "2");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		// test units for checkout button and dialog
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// test unit to purchase item
		cy.get("[data-cy=button-checkout]").click();
	});

	// Test case 3: extreme case for purchasing items
	// Expected: add items into the cart then purchased it successfully
	it("Test Case 3: Purchase Items Extreme Case", () => {
		// test unit to add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-2]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();
		cy.get("[data-cy=add-to-cart-5]").click();

		//test unit to count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "8");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		// test units for checkout dialogs including buttons and calling POST requests
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// test unit for checkout button
		cy.get("[data-cy=button-checkout]").click();
	});

	// Check for empty cart after checkout
	// Expected: add items into the cart then purchased it successfully. It then results in an empty cart
	it("Test Case 4: Check For Cart After Checkout", () => {
		// test unit to add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();

		//test unit to count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "2");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		// test units for dialog and buttons to pop up and work
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// test unit for checkout button
		cy.get("[data-cy=button-checkout]").click();

		// test unit to check if cart is empty
		cy.get("[data-cy=cart-open-button").click();
		cy.get("[data-cy=badge-count]").should("have.text", "0");
	});

	// Test case to check recent purchases
	// Expected: able to view recent purchases after clicking the recently purchased button
	it("Test Case 5: Check Recent Purchases", () => {
		cy.get("[data-cy=recent-purchase-button-styled]").click();
		cy.get("[data-cy=items-purchased-4]").should("contain.text", "FETA");
		cy.get("[data-cy=items-purchased-3]").should("contain.text", "ADELOST");
		cy.get("[data-cy=items-purchased-5]").should("contain.text", "JARLSBERG");
	});

	// Test case to check if dialog for each cheese work
	// Expected: able to open the dialog from each cheese
	it("Test Case 6: Check If Dialog For Each Cheese Works", () => {
		cy.get("[data-cy=item-button-1]").click();
		cy.get("[data-cy=item-button-1]").should(
			"contain.text",
			"ABBAYE DE BELLOC"
		);
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-2]").click();
		cy.get("[data-cy=item-button-2]").should(
			"contain.text",
			"ABBAYE DU MONT DES CATS"
		);
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-3]").click();
		cy.get("[data-cy=item-button-3]").should("contain.text", "ADELOST");
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-4]").click();
		cy.get("[data-cy=item-button-4]").should("contain.text", "FETA");
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-5]").click();
		cy.get("[data-cy=item-button-5]").should("contain.text", "JARLSBERG");
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-6]").click();
		cy.get("[data-cy=item-button-6]").should("contain.text", "MAASDAM");
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-7]").click();
		cy.get("[data-cy=item-button-7]").should("contain.text", "ROYALP TILSIT");
		cy.get("[data-cy=item-ok-button]").click();
		cy.get("[data-cy=item-button-8]").click();
		cy.get("[data-cy=item-button-8]").should("contain.text", "SAINT ALBRAY");
		cy.get("[data-cy=item-ok-button]").click();
	});

	//Test case to check if increasing the amount works
	//Expected: amount increases by 1
	it("Test Case 7: Check To See If The Button To Increase The Amount Works", () => {
		// test units to add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-1]").click();
		cy.get("[data-cy=add-to-cart-1]").click();

		//test unit to count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "2");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		//test unit for item button to increase once
		cy.get("[data-cy=item-increase-buttom]").click();

		// test units for checkout button and dialog
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// test unit to purchase item
		cy.get("[data-cy=button-checkout]").click();

		//test unit to click on recently purchase button
		cy.get("[data-cy=recent-purchase-button-styled]").click();

		//test unit to check the total amount purchased
		cy.get("[data-cy=total-item-amount]").should(($amount) => {
			expect($amount.first()).to.contain(3);
		});
	});

	//Test case to check if decreasing the amount works
	//Expected: amount decreases by 1
	it("Test Case 8: Check To See If The Button To Decrease The Amount Works", () => {
		// test units to add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-2]").click();
		cy.get("[data-cy=add-to-cart-2]").click();

		//test unit to count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "2");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		//test unit for item button to decrease once
		cy.get("[data-cy=item-decrease-buttom]").click();

		// test units for checkout button and dialog
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// test unit to purchase item
		cy.get("[data-cy=button-checkout]").click();

		//test unit to click on recently purchase button
		cy.get("[data-cy=recent-purchase-button-styled]").click();

		//test unit to check the total amount purchased
		cy.get("[data-cy=total-item-amount]").should(($amount) => {
			expect($amount.first()).to.contain(1);
		});
	});
});
