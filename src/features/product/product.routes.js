//Manage routes/paths to Product Controller

//1. Import Express
import express from "express";
import ProductController from "./product.controller.js";

//2. Initialize Express Router
const productRouter = express.Router();
const productController = new ProductController();

//All the paths to controller methods after (localhost:8080/api/products)

productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});

productRouter.get("/", (req, res) => {
  productController.getAllProduct(req, res);
});

productRouter.post("/", (req, res) => {
  productController.addProduct(req, res);
});

productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

productRouter.post("/rateproduct", (req, res, next) => {
  productController.rateProduct(req, res, next);
});

export default productRouter;
