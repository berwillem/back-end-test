const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifytoken");

// Create a new user
router.post("/", userController.register);
//  login
router.post("/login", userController.login);

// Get all users
router.get("/", verifyToken, userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Update user by ID
router.put("/:id", userController.updateUser);

// Delete user by ID
router.delete("/:id", userController.deletUser);
module.exports = router;
