require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const formRoutes =
  require("./routes/formRoutes");

app.use("/api", formRoutes);

const downloadBooklet = require("./routes/bookletRoutes");

app.use("/api/booklet",downloadBooklet);

app.listen(5000, () => {
  console.log(
    "Server Running on Port 5000"
  );
});