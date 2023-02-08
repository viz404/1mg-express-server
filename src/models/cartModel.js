const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  user_email: { type: String, required: true },
  cart: [
    {
      product_id: {
        type: Number,
        required: true,
      },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
      quantity: { type: Number, required: true },
      variant: { type: String, required: true },
    },
  ],
});

const CartModel = model("Cart", cartSchema);

module.exports = { CartModel };
