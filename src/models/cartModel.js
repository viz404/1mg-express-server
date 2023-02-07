const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  variant: { type: String, required: true },
});

const CartModel = model("Cart", cartSchema);

module.exports = { CartModel };
