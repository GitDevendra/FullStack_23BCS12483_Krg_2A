import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  // 🧠 Controlled input state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🧩 Update handler
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🚀 Submit handler (for now, just logs values)
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Later: API call -> success -> redirect to login
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <p className="text-center text-gray-200 mb-8 text-sm">
          Hard-coded controlled form ✨
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-100 mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-100 mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-center mt-6 text-sm text-gray-200">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-300 hover:text-white hover:underline transition-all"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
