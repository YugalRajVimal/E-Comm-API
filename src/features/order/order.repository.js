import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();
      session.startTransaction();
      const collection = db.collection(this.collection);
      // 1. Get cart items of user, calculate total amount.
      const items = await this.getTotalAmount(userId, session);
      const totalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(totalAmount);

      // 2. Create a record for the Order.
      const newOrder = new OrderModel(
        new ObjectId(userId),
        totalAmount,
        new Date()
      );
      await collection.insertOne(newOrder, session);

      // 3. Reduce the stock (product quantity).
      // To Do - Handle negative stocks
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productId },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }
      throw new ApplicationError("Something went wrong", 503);
      // 4. Clear the cart.
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });
      return;
    } catch (error) {
      session.abortTransaction();
      console.log(error);
      throw new ApplicationError(error);
    }
  }

  async getTotalAmount(userId, session) {
    const db = getDB();
    const collection = db.collection("cartItems");
    const result = await collection
      .aggregate(
        [
          //1. Get cart items for the user
          {
            $match: { userId: new ObjectId(userId) },
          },
          //2. Get the products from products collection
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          //3. Unwind the productinfo
          {
            $unwind: "$productInfo",
          },
          //4. Calculate total amount for each cartitems
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    return result;
  }
}
