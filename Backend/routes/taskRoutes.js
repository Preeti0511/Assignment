// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  toggleTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:projectId", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasks);
router.put("/:id", authMiddleware, toggleTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;