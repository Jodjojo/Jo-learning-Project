import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

// Middleware to prase JSON to request bodies
app.use(bodyParser.json());

// Base Route
app.get("/", (req, res) => {
	res.send("Welcome to the API!");
});

// API routes
// User routes
app.use("/api/users/", userRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`);
});
