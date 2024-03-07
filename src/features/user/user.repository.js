import mongoose from "mongoose";
import { userScheme } from "./user.schema.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";

//Creating model from schema
const UserModel = mongoose.model("User", userScheme);

export default class UserRepository {
  async resetPassword(email, hashedPassword) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.log("Error in Reseting Password ", error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async signUp(user) {
    try {
      //create instance of model.
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        console.log("Error in SignUp ", error);
        throw new ApplicationError("Something went wrong", 503);
      }
    }
  }

  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (error) {
      console.log("Error in SignIn ", error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log("Error in finding User ", error);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}
