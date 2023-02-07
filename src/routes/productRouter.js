const { Router } = require("express");
const {
  getproducts,
  getSingleproduct,
  getFilters,
  updateproduct,
} = require("../controllers/productController");

const productRouter = Router();

productRouter.get("/", getproducts);
productRouter.get("/getfilters", getFilters);
productRouter.get("/:id", getSingleproduct);

module.exports = { productRouter };
