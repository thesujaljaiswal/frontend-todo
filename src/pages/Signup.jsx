import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post("/auth/signup", form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="max-w-md w-screen bg-white/80 backdrop-blur-sm border border-white/60 shadow-2xl rounded-3xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-3">
            <svg
              className="w-7 h-7 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 21v-1a5 5 0 015-5h2a5 5 0 015 5v1"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join and start managing your tasks in seconds
          </p>
        </div>

        {err && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-black text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-black text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create a strong password"
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-black text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-2xl bg-gradient-to-r from-stone-600 to-stone-700 py-3 text-sm font-semibold text-white shadow-lg hover:from-stone-700 hover:to-stone-800 transform transition"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-semibold text-stone-600 hover:text-stone-700"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
