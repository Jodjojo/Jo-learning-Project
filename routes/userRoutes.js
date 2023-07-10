const express = require("express");
const userController = require("../controllers/userController");

const Router = express.Router();

Router.post("/signup", userController.signUp);