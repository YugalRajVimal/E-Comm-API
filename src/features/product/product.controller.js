import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  getAllProduct = async (req, res) => {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };

  addProduct = async (req, res) => {
    try {
      const { name, desc, price, categories, sizes } = req.body;

      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req?.file?.filename,
        categories,
        sizes?.split(",")
      );
      await this.productRepository.add(newProduct);
      res.status(201).send(newProduct);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };

  getOneProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };

  filterProducts = async (req, res) => {
    try {
      const minPrice = req.query.minPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(minPrice, categories);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };

  rateProduct = async (req, res, next) => {
    try {
      const { productId, ratings } = req.body;
      const userId = req.userId;
      await this.productRepository.rateProduct(userId, productId, ratings);
    } catch (error) {
      console.log("Passing error to middleware");
      next(error);
    }
    res.status(200).send("Rating has been added");
  };

  avgPrice = async (req, res) => {
    try {
      const result = await this.productRepository.getAvgPricePerCategory();
      res.status(200).send(result);
    } catch {
      console.log("Passing error to middleware");
      next(error);
    }
  };
}
