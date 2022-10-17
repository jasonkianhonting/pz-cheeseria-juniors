//imports
import * as express from "express";
import { writeFile } from "fs";

//variables
const cheeses = require("./data/cheeses.json");
const purchases = require("./data/purchases.json");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

//routes
router.get("/api/cheeses", (req, res, next) => {
	res.json(cheeses);
});

//API route to post the items in the cart to be purchased into a JSON file in data/purchases.json
router.post("/api/purchases", jsonParser, async (req, res) => {
	//PurchaseId being +1 due to the length starting from 0
	const purchaseId = purchases.length + 1;

	//this variable helps to record the necessary information for the items to be saved in JSON file
	const purchaseItem = {
		purchaseId: purchaseId,
		purchaseItems: req.body.items,
		purchaseTotal: req.body.total,
	};

	//this piece of code helps to add the items in order into the array of purchaseItem
	purchases.unshift(purchaseItem);

	//try-catch function that writes the information recorded into purchases.json. If successful, the data will be displayed
	//otherwise the respective error message will be displayed
	try {
		await writeFile(
			"./src/server/data/purchases.json",
			JSON.stringify(purchases, null, 2),
			(err) => {
				if (err) {
					res.status(400).json("Unable To Retrieve Data");
				} else {
					res.status(200).json("Data Retreived Successfully");
				}
			}
		);
		res.status(200).json("Your Purchase Is Successful, Thank You");
	} catch (err) {
		res
			.status(400)
			.json("Your Purchase has been unsuccessful, please contact the admin");
	}
});

//API route to help retrieve information posted from the route above. If successful, the data will be displayed otherwise
//error messages will be displayed

router.get("/api/purchases", async (req, res, next) => {
	try {
		await res.json(purchases);
		res.status(200).json("Data Retreived Successfully");
	} catch (e) {
		res.status(400).json("Data Cannot Be Retreived, Please Contact The Admin");
	}
});

export default router;
