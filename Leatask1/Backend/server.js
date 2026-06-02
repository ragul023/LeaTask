require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const bookletRoutes = require("./routes/bookletRoutes.js");


app.use(cors());
app.use(express.json());

app.use("/api/booklet",bookletRoutes);

app.use("/api", require("./routes/formRoutes"));

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});