import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = 3000;

// Enable JSON parsing for request bodies
app.use(bodyParser.json());
// User signup route
app.use(`/api/users`, userRouter);

// Start the server
app.listen(port, () => {
	console.log(`Server is now running on port ${port}...`);
});
