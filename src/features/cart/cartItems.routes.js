//Manage routes/paths to Useer Controller

//1. Import Express
import express from "express";
import CartItemsController from "./cartItems.controller.js";

//2. Initialize Express Router
const cartItemsRouter = express.Router();
const cartItemsController = new CartItemsController();

cartItemsRouter.post("/", (req, res, next) => {
  cartItemsController.add(req, res, next);
});
cartItemsRouter.get("/", (req, res) => {
  cartItemsController.getAll(req, res);
});
cartItemsRouter.delete("/:id", (req, res, next) => {
  cartItemsController.delete(req, res, next);
});

export default cartItemsRouter;
