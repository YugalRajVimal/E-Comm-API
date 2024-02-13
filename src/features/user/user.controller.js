import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res) {
    const { name, email, type, password } = req.body;
    const newUser = UserModel.signUp(name, email, type, password);
    res.status(201).send(newUser);
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (!user) {
      return res.status(400).send("Incorrect Credentials");
    }
    // Create Token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "5sjykqMD5M",
      { expiresIn: "1h" }
    );

    console.log(token);

    // Send Token
    res.status(200).send(token);
  }
}
