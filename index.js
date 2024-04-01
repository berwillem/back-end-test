// imports::
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userroutes = require("./routes/userroutes");
const todoroutes = require("./routes/todoroutes");
const app = express();
const cors = require("cors");
const upload = require("./middlewares/imageUpload");
// parsing midlwear:
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// cors usage:
app.use(cors());
// image upload route :
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("file uploaded succefuly");
});

// routes :
app.use("/users", userroutes);
app.use("/todos", todoroutes);

// server init::
app.listen(process.env.PORT, () => {
  console.log("Server is running on port:", process.env.PORT);
});

// connexion to data base :::
mongoose
  .connect(process.env.URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Error connecting to database:", err));
