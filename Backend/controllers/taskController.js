// controllers/taskController.js
const Task = require("../models/Task.model");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
   
    const { title, dueDate } = req.body;

    const task = await Task.create({
      title,
      dueDate,
      project: req.params.projectId,
    });

    res.status(201).json(task);
  } catch (err) {
    console.log(err); // 👈 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};
// GET TASKS BY PROJECT
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE TASK STATUS
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    task.status = task.status === "pending" ? "completed" : "pending";

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};