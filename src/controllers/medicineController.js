const { MedicineModel } = require("../models/medicineModel");

const getMedicines = async (req, res) => {
  try {
    const { category, search } = req.query;

    const searchObject = category
      ? { category: { $regex: new RegExp(category, "i") } }
      : { title: { $regex: new RegExp(search, "i") } };

    const data = await MedicineModel.find(searchObject);

    res.json(data);
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error" });
  }
};

module.exports = { getMedicines };
