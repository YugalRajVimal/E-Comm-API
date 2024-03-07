import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, imageUrl, categories, sizes, id) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categories = categories;
    this.sizes = sizes;
    this._id = id;
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 10",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "category1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "category2",
    ["M", "L"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "category2",
    ["M", "L", "XL"]
  ),
];
