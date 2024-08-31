import express from "express";
import { CategoryController } from "./category.controller.js";

const categoryRouter = express.Router();

const categoryController = new CategoryController();

categoryRouter.get("/", (req, res, next) => {
  categoryController.getCategories(req, res, next);
});

export default categoryRouter;
