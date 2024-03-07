import OrderRepository from "./order.repository.js";

export default class orderController {
  constructor() {
    this.OrderRepository = new OrderRepository();
  }

  placeOrder = async (req, res, next) => {
    try {
      const userId = req.userId;
      await this.OrderRepository.placeOrder(userId);
      res.status(201).send("Order is Placed");
    } catch (error) {
      console.log(error, "Passing error to middleware");
      next(error);
    }
  };
}
