//Manage routes/paths to Product Controller

//1. Import Express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

//2. Initialize Express Router
const productRouter = express.Router();
const productController = new ProductController();

//ALl the paths to controller methods after (localhost:8080/api/products)

productRouter.get("/filter", productController.filterProducts);

productRouter.get("/", productController.getAllProduct);

productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);

productRouter.get("/:id", productController.getOneProduct);

export default productRouter;
