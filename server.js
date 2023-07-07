const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Enable JSON parsing for request bodies
app.use(bodyParser.json());
// User signup route
const userRouter = require("./routers/userRouter");
app.use(`/api/users`, userRouter);

// Start the server
app.listen(port, () => {
	console.log(`Server is now running om  port ${port}...`);
});
