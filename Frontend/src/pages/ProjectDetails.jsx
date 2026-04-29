import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "../features/tasks/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getTasks(id));
    }
  }, [dispatch, id]);

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    dispatch(createTask({ projectId: id, title, dueDate }));

    setTitle("");
    setDueDate("");
  };

  return (
   <div className="min-h-screen bg-gray-100 p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <button
      onClick={() => navigate("/dashboard")}
      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
    >
      ⬅ Back
    </button>

    <h2 className="text-2xl font-bold">Project Tasks</h2>
  </div>

  {/* Create Task Card */}
  <div className="bg-white p-4 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-3">
    <input
      value={title}
      placeholder="Task title"
      onChange={(e) => setTitle(e.target.value)}
      className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="border p-2 rounded-lg"
    />

    <button
      onClick={handleCreate}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Add Task
    </button>
  </div>

  {/* Task List */}
  {tasks?.length === 0 ? (
    <p className="text-center text-gray-500">No tasks yet</p>
  ) : (
    <div className="grid gap-4">
      {tasks.map((t) => (
        <div
          key={t._id}
          className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
        >
          {/* Left */}
          <div>
            <h3
              className={`text-lg font-semibold ${
                t.status === "completed"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {t.title}
            </h3>

            {t.dueDate && (
              <p className="text-sm text-gray-500">
                Due: {new Date(t.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Right Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(toggleTask(t._id))}
              className={`px-3 py-1 rounded-lg text-white ${
                t.status === "completed"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {t.status === "completed" ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => dispatch(deleteTask(t._id))}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
}