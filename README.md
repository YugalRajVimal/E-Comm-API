# E-Commerce API
API for E-Commerce Application | Only Use in Chrome browser on Laptop/PC

## Overview
This repository contains the API for an E-Commerce application. The API allows users to manage products, categories, cart items, and likes. It also provides authentication features such as user signup, login, and password reset.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [Users Endpoints](#users-endpoints)
    - [Products Endpoints](#products-endpoints)
    - [Cart Endpoints](#cart-endpoints)
    - [Likes Endpoints](#likes-endpoints)
    - [Categories Endpoints](#categories-endpoints)


## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/YugalRajVimal/E-Comm-API/

2. Install NPM packages
   ```sh
   npm install

3. Create a .env file in the root directory and add your environment variables
   ```env
   DB_URL = your_mongo_uri
   JWT_SECRET = your_jwt_secret

## Usage
The API runs on `http://localhost:8080`. Use the Swagger docs to test the endpoints. You can also use a tool like Postman or your browser to test the endpoints.

## Authentication
  To authenticate, users must log in via the `/api/users/signin` endpoint to receive a token. This token must be included in the Authorization header for any subsequent requests that require authentication.
  1. **Login and obtain the token:**
    - **Endpoint:** POST  `/api/users/signin`
    - **Request Body:**
      ```json
      {
        "email": "string",
        "password": "string"
      }
   - **Response:**
      ```json
        {
          "token": "your_jwt_token"
        }
  2. **Use the token:**
    - In the Swagger UI, click the Authorize button.
    - Paste the token in the `Authorization` field as `<your_jwt_token>`.
    - Now, you can access the secured endpoints.

## Users Endpoints
  - **SignUp**
    - **POST** `/api/users/signup`
    - **Description:** User SignUp to Create Account
    - **Request Body:**
      ```json
      {
        "name": "string",
        "email": "string",
        "type": "string",
        "password": "string"
      }
      ```
    - **Responses:**
      - **200 OK**: Successfully created user account.
      - **400 Incorrect Credentials**: The request body is missing required fields or contains invalid data.
  
  - **Login**
    - **POST** `/api/users/signin`
    - **Description:** User Login to get token
    - **Request Body:**
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
    - **Responses:**
      - **200 OK**: Successfully authenticated and token received.
      - **400 Incorrect Credentials**: Invalid email or password.
  
  - **Reset Password**
    - **POST** `/api/users/resetPassword`
    - **Description:** Reset User Password using Email and Old Password
    - **Request Body:**
      ```json
      {
        "email": "string",
        "password": "string",
        "newPassword": "string"
      }
      ```
    - **Responses:**
      - **200 OK**: Password successfully reset.
      - **400 Incorrect Credentials**: Incorrect email or password.
     
## Products Endpoints
  - **Get All Products**
    - **GET** `/api/products`
    - **Description:** Retrieve all products.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: List of all products.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Add a Product**
    - **POST** `/api/products`
    - **Description:** Add a new product.
    - **Request Body:**
      ```json
      {
        "name": "string",
        "desc": "string",
        "price": "number",
        "categories": "string",
        "inStock": "number",
        "sizes": "string"
      }
      ```
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Product successfully added.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Get a Product by ID**
    - **GET** `/api/products/{id}`
    - **Description:** Retrieve a specific product by its unique ID.
    - **Parameters:**
      - **id** (path parameter): ID of the product to retrieve.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Product details.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Rate a Product**
    - **POST** `/api/products/rateproduct`
    - **Description:** Rate a product between 1 to 5.
    - **Request Body:**
      ```json
      {
        "ratings": "number",
        "productId": "string"
      }
      ```
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Rating successfully recorded.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Filter Products**
    - **GET** `/api/products/filter`
    - **Description:** Filter products using minimum price and categories.
    - **Parameters:**
      - **minPrice** (query parameter): Minimum price of the product.
      - **categories** (query parameter): IDs of categories separated by commas.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Filtered list of products.
      - **401 Unauthorized**: Missing or invalid JWT token.
     
## Cart Endpoints

  - **Get Cart Items**
    - **GET** `/api/cartItems/`
    - **Description:** Retrieve all cart items of the user.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: List of cart items.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Add Product to Cart**
    - **POST** `/api/cartItems/`
    - **Description:** Add a product to the cart with specified quantity.
    - **Request Body:**
      ```json
      {
        "productId": "string",
        "quantity": "number"
      }
      ```
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Product successfully added to cart.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Delete Cart Item**
    - **DELETE** `/api/cartItems/{id}`
    - **Description:** Delete a cart item using its ID.
    - **Parameters:**
      - **id** (path parameter): ID of the cart item to delete.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Cart item successfully deleted.
      - **401 Unauthorized**: Missing or invalid JWT token.
     
## Likes Endpoints

  - **Get All Likes**
    - **GET** `/api/likes/`
    - **Description:** Retrieve all likes.
    - **Parameters:**
      - **typeId** (query parameter): ID of the product or category to like.
      - **type** (query parameter): Type - Product or Category.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: List of all likes.
      - **401 Unauthorized**: Missing or invalid JWT token.
  
  - **Like a Product**
    - **POST** `/api/likes/`
    - **Description:** Like a product or category.
    - **Request Body:**
      ```json
      {
        "typeId": "string",
        "type": "string"
      }
      ```
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: Product or category successfully liked.
      - **401 Unauthorized**: Missing or invalid JWT token.

## Categories Endpoints

  - **Get All Categories**
    - **GET** `/api/categories/`
    - **Description:** Retrieve all categories.
    - **Security:** Requires JWT token in the Authorization header.
    - **Responses:**
      - **200 OK**: List of all categories.
      - **401 Unauthorized**: Missing or invalid JWT token.
     
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## How to Contribute

  1. **Fork the Project**
     - Click the "Fork" button at the top-right corner of the repository page on GitHub.
  
  2. **Create your Feature Branch**
     - Run the following command to create a new branch for your feature:
       ```sh
       git checkout -b feature/AmazingFeature
       ```
  
  3. **Commit your Changes**
     - Stage and commit your changes with a descriptive message:
       ```sh
       git commit -m 'Add some AmazingFeature'
       ```
  
  4. **Push to the Branch**
     - Push your changes to your forked repository:
       ```sh
       git push origin feature/AmazingFeature
       ```
  
  5. **Open a Pull Request**
     - Go to the original repository on GitHub and click on "Compare & pull request."
     - Add a descriptive title and comment for your pull request.
     - Submit the pull request for review.
  
  Thank you for contributing!






  
  

   
