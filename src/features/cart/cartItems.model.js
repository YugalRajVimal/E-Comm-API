export default class CartItemModel {
  constructor(productId, userId, quantity, id) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.id = id;
  }

  static getAll(userId) {
    const allCartItems = cartItems.filter((c) => c.userId == userId);
    return allCartItems;
  }

  static add(productId, userId, quantity) {
    const newCartItem = new CartItemModel(productId, userId, quantity);
    newCartItem.id = cartItems.length + 1;
    cartItems.push(newCartItem);
    return newCartItem;
  }

  static delete(cartItemId, userId) {
    const cartItemIndex = cartItems.findIndex(
      (c) => c.id == cartItemId && c.userId == userId
    );
    if (cartItemIndex < 0) {
      return "Cart Item not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
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
