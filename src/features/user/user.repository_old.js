import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import { getDB } from "../../config/mongodb.js";

class UserRepository {
  constructor() {
    this.collection = "users";
  }
  async signUp(newUser) {
    try {
      //1. Get the database
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      //3. Insert the user document
      await collection.insertOne(newUser);

      return;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async signIn(email, password) {
    try {
      //1. Get the database
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      //3. Find and Verify the user document
      return await collection.findOne({ email, password });
    } catch (error) {
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async findByEmail(email) {
    try {
      //1. Get the database
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      //3. Find and Verify the user document
      return await collection.findOne({ email });
    } catch (error) {
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}

export default UserRepository;
