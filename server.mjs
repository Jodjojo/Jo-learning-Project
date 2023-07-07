import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

// Enable JSON parsing for request bodies
app.use(bodyParser.json());
// User signup route

import userRouter from "./routers/userRouter.mjs";
app.use(`/api/users`, userRouter);

// Start the server
app.listen(port, () => {
	console.log(`Server is now running om  port ${port}...`);
});
