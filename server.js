//1. Import Statements

// Implement Validations (imp)
// Complete swagger documentation

import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import bodyParser from "body-parser";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartItemsRouter from "./src/features/cart/cartItems.routes.js";

import apiDocs from "./swagger.json" assert { type: "json" };

import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/errorHandler/applicationErrorHandler.js";
import { errorLogger } from "./src/middlewares/errorLogger.middleware.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.router.js";
import categoryRouter from "./src/features/category/category.routes.js";

//2. Create Server
const app = express();

// CORS policy configuration
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  // * for giving access to all the web clients/headers and mention url for specific clients or header names
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  //return ok status (200) for preflight request
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
// Bearer <token>
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.use(loggerMiddleware);

app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users/", userRouter);
app.use("/api/cartItems/", jwtAuth, cartItemsRouter);
app.use("/api/orders/", jwtAuth, orderRouter);
app.use("/api/likes/", jwtAuth, likeRouter);
app.use("/api/categories/", jwtAuth, categoryRouter);

//3. Default request handler
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

// Setting up Application Level Error Handler Middleware
app.use((err, req, res, next) => {
  // User definded errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }
  //Server Errors
  // ToDo - Implement logs for these Errors
  const errorLog =
    `timestamp: ` + new Date() + ` request URL: ${req.url}, error: ${err}`;
  errorLogger.error(errorLog);
  console.log(err);
  res.status(500).send("Something went wrong, please try later");
});

//4. Middleware to handle 404 requests
app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at /api-docs"
    );
});

//5. Listening on port 8080
app.listen(8080, () => {
  console.log("Server is running on Port 8080");
  // connectToMongoDB();
  connectUsingMongoose();
});
