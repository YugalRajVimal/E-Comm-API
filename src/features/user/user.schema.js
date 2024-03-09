import mongoose from "mongoose";

export const userScheme = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name cannot be greater than 25 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\../, "Please enter a valid email"],
  },
  password: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
    //   },
    //   message:
    //     "Password must be between 8 - 12 characters and have a special character",
    // },
    minLength: [8, "Password must be atleast 8 character long"],
    maxLength: [100, "Password cannot be greater than 100 characters"],
  },
  type: {
    type: String,
    enum: ["customer", "seller"],
  },
});
