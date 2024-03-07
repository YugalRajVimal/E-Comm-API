import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {
  async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        types: "Product",
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        types: "Category",
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async getLikes(userId, id, type) {
    try {
      const likedItems = await LikeModel.find({
        user: new ObjectId(userId),
        likeable: new ObjectId(id),
        types: type,
      })
        .populate("user")
        .populate({ path: "likeable", model: type });
      return likedItems;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}
