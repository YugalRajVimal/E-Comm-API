import CartItemModel from "./cartItems.model.js";

export default class CartItemsController {
  add = (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    console.log(userId);
    CartItemModel.add(productId, userId, quantity);
    res.status(201).send("Item added to cart successfully");
  };

  getAll = (req, res) => {
    const allCartItems = CartItemModel.getAll(req.userId);
    return res.status(200).send(allCartItems);
  };

  delete = (req, res) => {
    const userId = req.userId;
    const cartItemId = req.params.id;
    const error = CartItemModel.delete(cartItemId, userId);
    if (error) {
      return res.status(404).send(error);
    }
    return res.status(200).send("Cart Item is removed");
  };
}
