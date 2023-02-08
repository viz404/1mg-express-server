const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectDatabase } = require("./database/connect");
const { productRouter } = require("./routes/productRouter");
const { oauthRouter } = require("./routes/oauthRouter");
const { userRouter } = require("./routes/userRouter");
const { cartRouter } = require("./routes/cartRouter");

const PORT = process.env.PORT;
app = express();

// middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_REDIRECT_URI }));
app.use(morgan("tiny"));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/products", productRouter);
app.use("/api/oauth/", oauthRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

// start server
const startServer = () => {
  app.listen(PORT, async () => {
    try {
      console.log("server is listening on port: " + PORT);
      await connectDatabase();
    } catch (error) {}
  });
};

module.exports = { startServer };
