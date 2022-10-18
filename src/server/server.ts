import express = require("express");
import apiRouter from "./routes";

const app = express();
const helmet = require("helmet");

app.use(express.static("public"));
//usage of helmet is useful to prevent some well-known web vulnerabilities.
//More here: https://expressjs.com/en/advanced/best-practice-security.html

app.use(helmet);
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
