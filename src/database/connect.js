const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const database_name = "/onemg";

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI + database_name);
};

module.exports = { connectDatabase };
