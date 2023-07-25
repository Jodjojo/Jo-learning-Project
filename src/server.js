import express from "express";
import router from './api/v1/routes/index.js';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware to prase JSON to request bodies
app.use(bodyParser.json());

// Base Route
app.get("/", (req, res) => {
	res.send("Welcome to the API!");
});

// API routes
app.use("/api/v1/", router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`);
});
