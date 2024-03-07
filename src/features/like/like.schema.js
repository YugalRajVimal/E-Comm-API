import mongoose from "mongoose";

export const likeSchema = mongoose
  .Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "types",
    },
    types: {
      type: String,
      enum: ["Product", "Category"],
    },
  })
  .pre("save", (next) => {
    console.log("New like coming in");
    next();
  })
  .post("save", (docs) => {
    console.log("Like saved", docs);
  })
  .pre("find", (next) => {
    console.log("Retriving Likes");
    next();
  })
  .post("find", (docs) => {
    console.log("Likes Retrived", docs);
  });
