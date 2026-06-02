require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/formRoutes"));

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});