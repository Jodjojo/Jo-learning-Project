const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.json());

app.use(`/api/users`);

app.listen(port, () => {
	console.log(`Server is now running om  port ${port}...`);
});
