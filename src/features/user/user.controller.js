import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const { name, email, type, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new UserModel(name, email, type, hashedPassword);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  }

  async signIn(req, res) {
    try {
      // FInding user by email
      const user = await this.userRepository.findByEmail(req.body.email);

      //Validating User
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        //Compare password with hashedPassword
        const matched = await bcrypt.compare(req.body.password, user.password);
        //Password not matched
        if (!matched) {
          return res.status(400).send("Incorrect Credentials");
        }
      }

      // Password matched and Creating Token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log(token);

      // Send Token
      res.status(200).send(token);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  }
}
