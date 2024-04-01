const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },
  pdp: {
    type: String,
  },
});
module.exports = mongoose.model("User", userShema);
