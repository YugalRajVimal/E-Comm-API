import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { ObjectId } from "mongodb";
import { categorySchema } from "./category.schema.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);

class ProductRepository {
  async add(productData) {
    try {
      //1. Add the product
      console.log(productData);
      productData.categories = productData.categories
        .split(",")
        .map((e) => e.trim());
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();

      //2. Update the categories
      await CategoryModel.updateMany(
        { _id: { $in: productData.categories } },
        { $push: { products: new ObjectId(savedProduct._id) } }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async rateProduct(userId, productId, rating) {
    try {
      //1. Check if product exist
      const productToUpdate = await ProductModel.findById({
        _id: new ObjectId(productId),
      });
      console.log(productToUpdate);
      if (!productToUpdate) {
        throw new Error("Product Not Found");
      }
      //2. Find the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productId),
        user: new ObjectId(userId),
      });
      let newReviewId;

      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          user: new ObjectId(userId),
          product: new ObjectId(productId),
          rating: rating,
        });
        await newReview.save();
        newReviewId = newReview._id;
        console.log(newReview);
        productToUpdate.reviews.push(newReview._id);
        productToUpdate.save();
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}

export default ProductRepository;
