const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ").pop();

    const { user, status } = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (error, decoded) => {
        if (decoded) {
          return { user: decoded, status: true };
        }
        return { status: false };
      }
    );

    if (status == false) {
      throw new Error("verification failed");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.json({ message: error.message, status: false });
  }
};

module.exports = { verifyUser };
