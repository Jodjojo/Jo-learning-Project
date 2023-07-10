const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
import express from "express";
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

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`);
});
