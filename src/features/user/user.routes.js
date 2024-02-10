//Manage routes/paths to User Controller

//1. Import Express
import express from "express";
import UserController from "./user.controller.js";

//2. Initialize Express Router
const userRouter = express.Router();
const userController = new UserController();

//ALl the paths to controller methods after (localhost:8080/api/products)

userRouter.post("/signup", userController.signUp);

userRouter.post("/signin", userController.signIn);

export default userRouter;
