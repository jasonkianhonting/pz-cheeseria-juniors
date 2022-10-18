/// <reference types="cypress" />

context("Cart Actions", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Test Case 1: Add items to cart", () => {
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();

		cy.get("[data-cy=badge-count]").should("have.text", "2");
	});

	// Test case 2: ideal case for purchasing items
	it("Test Case 2: Purchase Items Ideal Case", () => {
		// add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();

		//count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "2");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		// test units
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// Purchase item
		cy.get("[data-cy=button-checkout]").click();
	});
	// Test case 3: extreme case for purchasing items
	it("Test Case 3: Purchase Items Extreme Case", () => {
		// add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-2]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();
		cy.get("[data-cy=add-to-cart-5]").click();

		//count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "8");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		// test units for checkout dialogs including buttons and calling of POST requests
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// Purchase item
		cy.get("[data-cy=button-checkout]").click();
	});

	// Check for empty cart after checkout
	it("Test Case 4: Check For Cart After Checkout", () => {
		// add items 2 and 3 to cart
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=add-to-cart-4]").click();

		//count the number of items
		cy.get("[data-cy=badge-count]").should("have.text", "2");

		// test unit for button to open cart
		cy.get("[data-cy=cart-open-button]").click();

		// test units for dialog and buttons to pop up and work
		cy.get("[data-cy=items-checkout]").click();
		cy.get("[data-cy=cart-dialog]").should("be.visible");
		cy.get("[data-cy=button-checkout]").should("have.text", "Purchase");
		cy.get("[data-cy=cancel-button-checkout]").should("have.text", "Cancel");

		// Purchase item
		cy.get("[data-cy=button-checkout]").click();

		// Check if cart is empty
		cy.get("[data-cy=cart-open-button").click();
		cy.get("[data-cy=badge-count]").should("have.text", "0");
	});

	// Check recent purchases
	it("Test Case 5: Check Recent Purchases", () => {
		cy.get("[data-cy=recent-purchase-button-styled]").click();

		cy.get("[data-cy=items-purchased-4]").should("contain.text", "FETA");
		cy.get("[data-cy=items-purchased-3]").should("contain.text", "ADELOST");
		cy.get("[data-cy=items-purchased-5]").should("contain.text", "JARLSBERG");
	});
});
