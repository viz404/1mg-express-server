const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connect");
const { medicineRouter } = require("./routes/medicineRouter");
require("dotenv").config();

const PORT = process.env.PORT;
app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/medicines", medicineRouter);

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
