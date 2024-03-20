const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("user not found");
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
app.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      res.status(404).json("this user name doesnt exsiste");
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});




app.listen(process.env.PORT);
mongoose
  .connect(process.env.URL)
  .then(() => console.log("Connected to data base !"));

console.log("server is running on port :", process.env.PORT);
