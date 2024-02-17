import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationErrorHandler.js";

export default class UserModel {
  constructor(name, email, type, password, id) {
    this.name = name;
    this.email = email;
    this.type = type;
    this.password = password;
    this._id = id;
  }

  static getAll() {
    return users;
  }
}

let users = [
  {
    name: "Customer 1",
    email: "customer@gmail.com",
    type: "customer",
    password: "cc",
    id: 1,
  },
  {
    name: "Seller 1",
    email: "seller@gmail.com",
    type: "seller",
    password: "ss",
    id: 2,
  },
];
