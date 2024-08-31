import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, categories,inStock, sizes, userId, id) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.categories = categories;
    this.inStock = inStock;
    this.sizes = sizes;
    this.user = userId
    this._id = id;
  }
}
