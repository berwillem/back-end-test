const Todo = require("../models/Todo");

// Create a new todo
async function createTodo(req, res) {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

// Get all todos
async function getAllTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Get single todo by ID
async function getTodoById(req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Update todo by ID
async function updateTodoById(req, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Delete todo by ID
async function deleteTodoById(req, res) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
