const { Router } = require("express");
const {
  getMedicines,
  getSingleMedicine,
  getFilters,
  updateMedicine,
} = require("../controllers/medicineController");

const medicineRouter = Router();

medicineRouter.get("/", getMedicines);
medicineRouter.get("/getfilters", getFilters);
medicineRouter.get("/:id", getSingleMedicine);

module.exports = { medicineRouter };
