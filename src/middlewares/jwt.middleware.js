import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //1. Read the token
  const token = req.headers["authorization"];
  // console.log(token);

  //2. If no token present then return the error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //3. Check if token is valid or not
  try {
    const payload = jwt.verify(token, "5sjykqMD5M");
    req.userId = payload.userId;
    // console.log(payload);
  } catch (error) {
    //5. If not valid then return error
    console.log(error);
    return res.status(401).send("Unauthorized Access");
  }

  //4. If valid call next()
  next();
};

export default jwtAuth;
