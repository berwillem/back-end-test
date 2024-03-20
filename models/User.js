const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
});
module.exports = mongoose.model("User", userShema);
