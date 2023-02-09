const { CartModel } = require("../models/cartModel");

const addtoCart = async (req, res) => {
  try {
    const products = req.body;
    const { _id, email } = req.user;

    await CartModel.findOneAndUpdate(
      { user_id: _id },
      {
        user_id: _id,
        user_email: email,
        cart: products,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.json({ message: "added to cart", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { _id, email } = req.user;

    const data = await CartModel.find({ user_id: _id });

    return res.json({ data: data[0]?.cart || [], status: true });
  } catch (error) {
    return res.json({ message: "failed to get cart", status: false });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const { product_id, variant, quantity } = req.body;
    const { _id } = req.user;

    const prevCart = await CartModel.find({
      user_id: _id,
      "cart.product_id": product_id,
      "cart.variant": variant,
    });

    let negativeCheck = false;

    for (let item of prevCart[0].cart) {
      if (
        item.product_id == product_id &&
        item.variant == variant &&
        item.quantity + quantity >= 1
      ) {
        negativeCheck = true;
      }
    }

    if (negativeCheck) {
      await CartModel.updateOne(
        {
          user_id: _id,
          "cart.product_id": product_id,
          "cart.variant": variant,
        },
        {
          $inc: { "cart.$.quantity": quantity },
        }
      );
      return res.json({ message: "cart updated", status: true });
    }

    return res.json({ message: "cart upadate failed", status: false });
  } catch (error) {
    return res.json({ message: "server error", status: false });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { product_id, variant } = req.body;
    const { _id } = req.user;

    const response = await CartModel.updateOne(
      {
        user_id: _id,
      },
      {
        $pull: {
          cart: { product_id, variant },
        },
      }
    );

    res.json({ message: response, status: true });
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

const emptyCart = async (req, res) => {
  try {
    const { _id } = req.user;

    await CartModel.deleteOne({ user_id: _id });

    res.json({ message: "cart deleted", state: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, status: false });
  }
};

module.exports = {
  addtoCart,
  getCartItems,
  updateItemQuantity,
  deleteCartItem,
  emptyCart,
};
