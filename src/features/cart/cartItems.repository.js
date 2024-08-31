import mongoose from "mongoose";
import { cartItemsSchema } from "./cartItems.schema.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";

//Creating model from schema
const CartItemModel = mongoose.model("Cart", cartItemsSchema);

export default class CartItemsRepository {

    async add(productId, userId, quantity) {
        try {
        // Check if the cart item already exists
        const existingCartItem = await CartItemModel.findOne({
            productId:new mongoose.Types.ObjectId(productId),
            userId:new mongoose.Types.ObjectId(userId),
        });
    
        if (existingCartItem) {
            // If it exists, increment the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
        } else {
            // If it doesn't exist, create a new cart item
            const newCartItem = new CartItemModel({
            productId:new mongoose.Types.ObjectId(productId),
            userId:new mongoose.Types.ObjectId(userId),
            quantity,
            });
            await newCartItem.save();
        }
        } catch (error) {
        console.log(error);
        throw new ApplicationError("Something went wrong", 503);
        }
    }
  
    async getAll(userId) {
        try {
            // Find all cart items for the user
            const cartItems = await CartItemModel.find({
            userId:new mongoose.Types.ObjectId(userId),
            });
            return cartItems;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }
  

    async delete(cartItemId, userId) {
        try {
          const result = await CartItemModel.deleteOne({
            _id:new mongoose.Types.ObjectId(cartItemId),
            userId:new mongoose.Types.ObjectId(userId),
          });
          return result.deletedCount > 0;
        } catch (error) {
          console.log(error);
          throw new ApplicationError("Something went wrong", 503);
        }
    }
      

  async getNextCounter(db) {
    const resultDocument = await db.collection("counters").findOneAndUpdate(
      {
        _id: "cartItemId",
      },
      {
        $inc: { value: 1 },
      },
      {
        returnDocument: "after",
      }
    );
    console.log(resultDocument);
    return resultDocument.value;
  }
}
