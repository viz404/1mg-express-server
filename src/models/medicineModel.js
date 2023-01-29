const { Schema, model } = require("mongoose");

const medicineSchema = new Schema({
  id: Number,
  title: String,
  desc: String,
  rating: Number,
  price: Number,
  discount: Number,
  category: String,
  brand: String,
  product_form: String,
  gender: String,
  age: String,
  image: String,
});

const MedicineModel = model("Medicine", medicineSchema);

module.exports = { MedicineModel };
