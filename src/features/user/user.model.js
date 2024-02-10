export default class UserModel {
  constructor(name, email, type, password, id) {
    this.name = name;
    this.email = email;
    this.type = type;
    this.password = password;
    this.id = id;
  }

  static signUp(name, email, type, password) {
    const newUser = new UserModel(name, email, type, password);
    newUser.id = users.length + 1;
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
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
