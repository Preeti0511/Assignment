// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;