import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  // Product should have minPrice specified and category
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      categories = JSON.parse(categories.replace(/'/g, '"'));
      if (categories) {
        filterExpression = {
          $and: [{ category: { $in: categories } }, filterExpression],
        };
      }
      return await collection
        .find(filterExpression)
        .project({ _id: 0, name: 1, price: 1, ratings: { $slice: 1 } })
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  // async rateProduct(userId, productId, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     //1. Find the product
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productId),
  //     });
  //     //2. Find the rating
  //     const userRating = await product?.ratings?.find(
  //       (r) => r.userId == userId
  //     );
  //     if (userRating) {
  //       //3. Update the rating
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productId),
  //           "ratings.userId": new ObjectId(userId),
  //         },
  //         {
  //           $set: {
  //             "ratings.$.rating": rating,
  //           },
  //         }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         { _id: new ObjectId(productId) },
  //         {
  //           $push: {
  //             ratings: {
  //               userId: new ObjectId(userId),
  //               rating,
  //             },
  //           },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApplicationError("Something went wrong", 503);
  //   }
  // }

  async rateProduct(userId, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //1. Remove existing entry
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $pull: {
            ratings: {
              userId: new ObjectId(userId),
            },
          },
        }
      );

      //2. Add new entry
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: {
            ratings: {
              userId: new ObjectId(userId),
              rating,
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async getAvgPricePerCategory() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection
        .aggregate([
          {
            //Stage 1: Get avg price per category
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}

export default ProductRepository;
