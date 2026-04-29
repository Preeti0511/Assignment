import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../features/projects/projectSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleCreate = () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    dispatch(createProject({ title, description }));

    // clear inputs after adding
    setTitle("");
    setDescription("");
  };

  return (
   <div className="min-h-screen bg-gray-100 p-6">
  {/* Header */}
<div className="flex justify-between items-center mb-6">
  <h2 className="text-3xl font-bold">Dashboard</h2>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/");
    }}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
  >
    Logout
  </button>
</div>
  {/* Create Project Card */}
  <div className="bg-white p-5 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-3">
    <input
      value={title}
      placeholder="Project title"
      onChange={(e) => setTitle(e.target.value)}
      className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input
      value={description}
      placeholder="Description"
      onChange={(e) => setDescription(e.target.value)}
      className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <button
      onClick={handleCreate}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Add Project
    </button>
  </div>

  {/* Project List */}
  {projects?.length === 0 ? (
    <p className="text-gray-500 text-center">No projects yet</p>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
        >
          {/* Title */}
          <h3
            onClick={() => navigate(`/project/${p._id}`)}
            className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
          >
            {p.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mt-2">{p.description}</p>

          {/* Actions */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => navigate(`/project/${p._id}`)}
              className="text-sm text-green-600 hover:underline"
            >
              Open
            </button>

            <button
              onClick={() => dispatch(deleteProject(p._id))}
              className="text-sm text-red-500 hover:underline"
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