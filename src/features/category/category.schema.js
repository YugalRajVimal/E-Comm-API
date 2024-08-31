import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export const CategoryModel = mongoose.model("Category", categorySchema);