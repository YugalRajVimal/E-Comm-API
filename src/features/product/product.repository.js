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
  async getAll() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async get(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async add(productData) {
    try {
      //2. Check if the categories exist, if not create them
      for (const categoryName of productData.categories) {
        let category = await CategoryModel.findOne({ name: categoryName });
        if (!category) {
          category = new CategoryModel({ name: categoryName, products: [] });
          await category.save();
        }
      }

      //3. Convert Category Names to IDs
      const categories = await CategoryModel.find({
        name: { $in: productData.categories },
      });
      productData.categories = categories.map((category) => category._id);

      //4. Save the product
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();

      //5. Update the categories
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

  async filter(minPrice, categories) {
    try {
      let filterExpression = {};

      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }

      if (categories) {
        const categoriesArray = categories
          .split(",")
          .map((e) => e.trim().replace(/'/g, "")); // Remove any surrounding quotes and trim
  
        if (categoriesArray.length > 0) {
          filterExpression.categories = { $in: categoriesArray };
        }
      }

      const products = await ProductModel.find(filterExpression).select({
        _id: 0,
        name: 1,
        price: 1,
      });

      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}

export default ProductRepository;
