//Manage routes/paths to Order Controller

//1. Import Express
import express from "express";
import OrderController from "./order.controller.js";

//2. Initialize Express Router
const orderRouter = express.Router();
const orderController = new OrderController();

//All the paths to controller methods after (localhost:8080/api/order)

orderRouter.post("/", (req, res, next) => {
  orderController.placeOrder(req, res, next);
});

export default orderRouter;
