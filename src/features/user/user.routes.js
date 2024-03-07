//Manage routes/paths to User Controller

//1. Import Express
import express from "express";
import UserController from "./user.controller.js";

//2. Initialize Express Router
const userRouter = express.Router();
const userController = new UserController();

//ALl the paths to controller methods after (localhost:8080/api/products)

userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});

userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});

userRouter.post("/resetPassword", (req, res) => {
  userController.resetPassword(req, res);
});

export default userRouter;
