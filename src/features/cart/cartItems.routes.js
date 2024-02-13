//Manage routes/paths to Useer Controller

//1. Import Express
import express from "express";
import CartItemsController from "./cartItems.controller.js";

//2. Initialize Express Router
const cartItemsRouter = express.Router();
const cartItemsController = new CartItemsController();

cartItemsRouter.post("/", cartItemsController.add);
cartItemsRouter.get("/", cartItemsController.getAll);
cartItemsRouter.delete("/:id", cartItemsController.delete);

export default cartItemsRouter;
