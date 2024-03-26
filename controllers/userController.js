const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration endpoint
exports.register = async (req, res) => {
  const { username, password, age, todo } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword, age, todo });
    await user.save();
    res.json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "3h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("todos");
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("todo");
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      todos: req.body.todos,
    });
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.deletUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
