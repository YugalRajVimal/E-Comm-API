import mongoose from "mongoose";

const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
  try {
    await mongoose
      .connect(url)
      .then(() => {
        console.log("Connected to DB using Mongoose");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("Error while connecting to DB");
    console.log(error);
  }
};
