export default class CartItemModel {
  constructor(productId, userId, quantity, id) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this._id = id;
  }
}

var cartItems = [
  {
    productId: 1,
    userId: 1,
    quantity: 2,
    id: 1,
  },
  {
    productId: 2,
    userId: 2,
    quantity: 1,
    id: 2,
  },
  {
    productId: 5,
    userId: 2,
    quantity: 3,
    id: 3,
  },
];
