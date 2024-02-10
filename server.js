//1. Import Express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

//2. Create Server
const app = express();

app.use(bodyParser.json());

app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users/", userRouter);

//3. Default request handler
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

//4. Listening on port 8080
app.listen(8080, () => {
  console.log("Server is running on Port 8080");
});
