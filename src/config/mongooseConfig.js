import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";

const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to DB using Mongoose");
        addCategory();
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("Error while connecting to DB");
    console.log(error);
  }
};

async function addCategory() {
  const CategoryModel = mongoose.model("Category", categorySchema);
  const categories = await CategoryModel.find({});
  if (!categories || categories.length == 0) {
    await CategoryModel.insertMany([
      {
        name: "Cloths",
      },
      {
        name: "Electronics",
      },
    ]);
  }
  console.log("Categories are added");
}
