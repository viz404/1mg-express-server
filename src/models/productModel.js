const { Schema, model } = require("mongoose");

const variatSchema = new Schema({
  _id: false,
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  product_form: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  image: { type: String, required: true },
  variants: [variatSchema],
});

const productModel = model("product", productSchema);

module.exports = { productModel };
