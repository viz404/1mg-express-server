const jwt = require("jsonwebtoken");
require("dotenv").config();

const { hashPassword, comparePassword } = require("../config/helperfunctions");
const { UserModel } = require("../models/userModel");

const getUserDetails = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ").pop();

    if (token.length == 0) {
      throw new Error();
    }

    const user = jwt.decode(token);

    res.json({ user, status: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500);
    res.json({ message: "please login", status: false });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name == undefined || email == undefined || password == undefined) {
      throw new Error("incomplete credentialas");
    }

    const getUser = await UserModel.find({ email });

    if (getUser.length > 0) {
      throw new Error("user already registered");
    }

    const hashed_password = await hashPassword(password);

    await UserModel.create({ name, email, password: hashed_password });

    res.json({ message: "user registered", status: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500);
    res.json({ message: error.message, status: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == undefined || password == undefined) {
      throw new Error("incomplete credentials");
    }

    const user = await UserModel.find({ email });

    if (user.length == 0) {
      throw new Error("email not found");
    }

    if (user[0].password == undefined) {
      throw new Error("login failed");
    }

    const check_password = await comparePassword(password, user[0].password);

    if (check_password == false) {
      throw new Error("login failed");
    }

    const token = jwt.sign(
      { name: user[0].name, email, _id: user[0]._id },
      process.env.JWT_SECRET
    );

    res.json({ message: "login success", status: true, token });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500);
    res.json({ message: error.message, status: false });
  }
};

module.exports = { getUserDetails, registerUser, loginUser };
