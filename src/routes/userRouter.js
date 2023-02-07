const { Router } = require("express");
const {
  getUserDetails,
  registerUser,
  loginUser,
} = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/getuserdetails", getUserDetails);
userRouter.post("/registeruser", registerUser);
userRouter.post("/loginuser", loginUser);

module.exports = { userRouter };
