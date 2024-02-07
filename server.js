//1. Import Express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";

//2. Create Server
const app = express();

app.use(bodyParser.json());

app.use("/api/products", productRouter);

//3. Default request handler
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

//4. Listening on port 8080
app.listen(8080, () => {
  console.log("Server is running on Port 8080");
});
