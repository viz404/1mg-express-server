const { Router } = require("express");
const { verifyUser } = require("../controllers/authController");
const {
  addtoCart,
  getCartItems,
  updateItemQuantity,
  deleteCartItem,
  emptyCart,
} = require("../controllers/cartController");

const cartRouter = Router();

cartRouter.get("/getcart", getCartItems);
cartRouter.delete("/deleteitem", deleteCartItem);
cartRouter.delete("/emptycart", emptyCart);
cartRouter.post("/add", addtoCart);
cartRouter.post("/updatequantity", updateItemQuantity);

module.exports = { cartRouter };
