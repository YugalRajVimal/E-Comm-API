import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, imageUrl, category, sizes, id) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
    this._id = id;
  }

  static rateProduct(userId, productId, rating) {
    //Validate User
    const user = UserModel.getAll().find((u) => u.id == userId);

    if (!user) {
      throw new ApplicationError("User not found", 400);
    }

    //Validate Product
    const product = products.find((p) => p.id == productId);
    if (!product) {
      throw new ApplicationError("Prodcut not found", 400);
    }

    //Check if there are any ratings or not. If not then create a rating array.
    if (!products.ratings) {
      product.ratings = [];
      product.ratings.push({
        userId: userId,
        rating: rating,
      });
    } else {
      //Checking if this user already rated or not. If rated then update the old rating.
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userId == userId
      );

      if (existingRatingIndex >= 0) {
        product.rating[existingRatingIndex].rating = rating;
      } else {
        //If no existing rating then add new rating
        product.ratings.push({
          userId: userId,
          rating: rating,
        });
      }
    }
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
