const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todoController");

// Route to create a new todo
router.post("/", createTodo);

// Route to get all todos
router.get("/", getAllTodos);

// Route to get a single todo by ID
router.get("/:id", getTodoById);

// Route to update a todo by ID
router.put("/:id", updateTodoById);

// Route to delete a todo by ID
router.delete("/:id", deleteTodoById);

module.exports = router;
