import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout, setUser } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [tasks, setTasks] = useState([]);
  const [q, setQ] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [err, setErr] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/profile");
      setProfile(res.data);
      setUser(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/tasks?q=${encodeURIComponent(q)}`);
      setTasks(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) {
      setErr("Title required");
      return;
    }
    try {
      const res = await axios.post("/tasks", newTask);
      setTasks((prev) => [res.data, ...prev]);
      setNewTask({ title: "", description: "" });
      setErr("");
    } catch (e) {
      setErr(e.response?.data?.error || "Failed");
    }
  };

  const updateTask = async (id, changes) => {
    const res = await axios.put(`/tasks/${id}`, changes);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Welcome back,{" "}
              <span className="font-bold text-gray-900">{profile?.name}</span>
            </p>
          </div>

          <button
            onClick={logout}
            className="px-8 py-3 bg-gradient-to-r from-stone-500 to-stone-600 text-white font-semibold rounded-2xl hover:from-stone-600 hover:to-stone-700 transition-all duration-300 shadow-lg transform active:scale-95 w-full lg:w-auto"
          >
            Sign Out
          </button>
        </header>

        {/* CREATE TASK */}
        <section className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg
              className="w-8 h-8 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Task
          </h2>

          {err && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {err}
            </div>
          )}

          <form
            onSubmit={createTask}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Task Title
              </label>
              <input
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Enter a clear task title..."
                className="w-full p-5 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 text-black text-lg placeholder-gray-400 shadow-sm hover:shadow-md"
                required
              />
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Add details about this task..."
                rows={3}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-blue-500 text-black focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 resize-vertical placeholder-gray-400 shadow-sm hover:shadow-md"
              />
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 py-5 px-8 bg-gradient-to-r from-stone-600 to-stone-700 text-white font-bold rounded-2xl hover:from-stone-700 hover:to-stone-800 transition-all duration-300 shadow-xl transform active:scale-95 text-lg flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Task
              </button>

              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search your tasks..."
                  className="flex-1 p-4 pl-12 border-2 text-black border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={fetchTasks}
                  className="py-4 px-6 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-semibold rounded-2xl hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-md transform active:scale-95 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* TASK LIST */}
        <section className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Your Tasks ({tasks.length})
            </h2>
            {tasks.length > 0 && (
              <div className="text-sm text-gray-500 font-medium">
                Showing {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              </div>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Create your first task above to get started. Your tasks will
                appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="group bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-200 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 pr-12 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                        {task.title}
                      </h3>
                      <label className="flex items-center gap-2 p-2 rounded-xl bg-green-50/50 group-hover:bg-green-100 transition-all duration-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() =>
                            updateTask(task._id, { completed: !task.completed })
                          }
                          className="w-5 h-5 text-green-600 bg-white border-2 border-green-200 rounded focus:ring-green-500 focus:ring-2 transition-all duration-300"
                        />
                        <span className="text-sm font-semibold text-green-800">
                          Done
                        </span>
                      </label>
                    </div>

                    {task.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                      <span>
                        Created {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-gray-400">
                        {new Date(task.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={() => {
                          const t = prompt("Edit title", task.title);
                          if (t != null) updateTask(task._id, { title: t });
                        }}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform active:scale-95 text-sm flex items-center justify-center gap-2 group-hover:ring-2 group-hover:ring-yellow-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1.5-3l2.5-2.5"
                          />
                        </svg>
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm("Delete this task?"))
                            deleteTask(task._id);
                        }}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform active:scale-95 text-sm flex items-center justify-center gap-2 group-hover:ring-2 group-hover:ring-red-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
