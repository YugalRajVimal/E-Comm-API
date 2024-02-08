import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProduct = (req, res) => {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  };

  addProduct = (req, res) => {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name: name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };

    const createdRecord = ProductModel.addProduct(newProduct);
    res.status(201).send(createdRecord);
  };

  getOneProduct = (req, res) => {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  };

  filterProducts = (req, res) => {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);

    res.status(200).send(result);
  };
}