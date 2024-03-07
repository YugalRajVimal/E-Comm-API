import { ObjectId } from "mongodb";
import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export default class CartItemsController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }

  add = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;
      await this.cartItemsRepository.add(productId, userId, quantity);
      res.status(201).send("Item added to cart successfully");
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };

  getAll = async (req, res) => {
    try {
      const allCartItems = await this.cartItemsRepository.getAll(req.userId);
      return res.status(200).send(allCartItems);
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };

  delete = async (req, res) => {
    try {
      const userId = req.userId;
      const cartItemId = req.params.id;
      const isDeleted = await this.cartItemsRepository.delete(
        cartItemId,
        userId
      );
      if (!isDeleted) {
        return res.status(404).send("Item not found");
      }
      return res.status(200).send("Cart Item is removed");
    } catch (error) {
      console.log(error);
      res.status(503).send("Something went wrong");
    }
  };
}
