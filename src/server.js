import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./api/v1/routes/authRoute.js";

const app = express();
const port = 3000;
// Middleware to prase JSON to request bodies
app.use(bodyParser.json());

// Base Route
app.get("/", (req, res) => {
	res.send("Welcome to the API!");
});

// API routes
// Routes
app.use("/api/v1", authRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`);
});
