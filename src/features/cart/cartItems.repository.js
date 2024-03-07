import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);
      await collection.updateOne(
        { productId: new ObjectId(productId), userId: new ObjectId(userId) },
        {
          $setOnInsert: { _id: id },
          $inc: {
            quantity: quantity,
          },
        },
        { upsert: true }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async getAll(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId: new ObjectId(userId) }).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async delete(cartItemId, userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
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
