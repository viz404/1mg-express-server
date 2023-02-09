const { removeDuplicate } = require("../config/helperfunctions");
const { productModel } = require("../models/productModel");

const getFilters = async (req, res) => {
  try {
    const { category, search } = req.query;

    let searchObject = {};

    if (category) {
      searchObject = { category: { $regex: new RegExp(category, "i") } };
    } else if (search) {
      searchObject = { title: { $regex: new RegExp(search, "i") } };
    }

    const data = await productModel.find(searchObject);

    let ages = removeDuplicate(data.map((e) => e.age));

    let genders = removeDuplicate(data.map((e) => e.gender));

    let brands = removeDuplicate(data.map((e) => e.brand));

    return res.json({ data: { ages, genders, brands }, status: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const getproducts = async (req, res) => {
  try {
    const { category, search, age, gender, brand, sort, order } = req.query;

    let searchObject = {};
    let sortObj = {};

    if (category) {
      searchObject = { category: { $regex: new RegExp(category, "i") } };
    } else if (search) {
      searchObject = { title: { $regex: new RegExp(search, "i") } };
    }

    if (age) {
      searchObject.age = { $in: age.split(",") };
    }

    if (gender) {
      searchObject.gender = { $in: gender.split(",") };
    }

    if (brand) {
      searchObject.brand = { $in: brand.split(",") };
    }

    if (sort && order) {
      sortObj = { [sort]: order == "asc" ? 1 : -1 };
    }

    const data = await productModel.find(searchObject).sort(sortObj);

    return res.json({ data, status: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const getSingleproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await productModel.find({ id });

    res.json({ data: data[0], status: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

module.exports = {
  getproducts,
  getSingleproduct,
  getFilters,
};
