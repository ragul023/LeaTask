const express = require("express");
const app = express();

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const formRoutes = require("./routes/formRoutes");

app.use(cors());
app.use(express.json());

// routes
app.use("/api", formRoutes);

//set Listen port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});