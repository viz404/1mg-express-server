const { Router } = require("express");
const { verifyUser } = require("../controllers/authController");
const { addtoCart, getCartItems } = require("../controllers/cartController");

const cartRouter = Router();

cartRouter.get("/getcart", verifyUser, getCartItems);
cartRouter.post("/add", verifyUser, addtoCart);

module.exports = { cartRouter };
