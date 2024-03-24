const mongoose = require("mongoose");
const TodoShema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    required: true,
  },
  deadline: {
    type: Date,
  },
});
module.exports = mongoose.model("Todo", TodoShema);
