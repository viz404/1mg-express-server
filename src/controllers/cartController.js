const { CartModel } = require("../models/cartModel");

const addtoCart = async (req, res) => {
  try {
    const products = req.body;
    const { _id, email } = req.user;

    // let userCart = await CartModel.find({ user_id: _id });

    // if (userCart.length == 0) {
    //   await CartModel.create({
    //     user_id: _id,
    //     user_email: email,
    //     cart: [product],
    //   });
    // } else {
    //   let cart = userCart[0].cart;

    //   let checkProduct = cart.some(
    //     (e) => e.title == product.title && e.variant == product.variant
    //   );

    //   if (checkProduct) {
    //     let updated = cart.map((e) =>
    //       e.title == product.title && e.variant == product.variant ? product : e
    //     );

    //     cart = updated;
    //   } else {
    //     cart.push(product);
    //   }

    //   await CartModel.updateOne({ user_id: _id }, { cart });
    // }

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

module.exports = { addtoCart, getCartItems };
