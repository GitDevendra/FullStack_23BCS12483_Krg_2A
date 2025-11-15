import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdContext from "../Context/creation";

export default function LoginPage() {
  const navigate = useNavigate();
  const { userid, setuserid } = useContext(IdContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      setuserid(["0001", "admin"]);
      navigate("/admin");
    } else if (email === "student@example.com" && password === "student123") {
      setuserid(["1234", "student"]);
      navigate("/student");
    } else {
      alert("Invalid credentials");
      setuserid([null, null]);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-white border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-200 mb-8 text-sm">
          Please log in to continue
        </p>

        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-100">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-100">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-200">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-pink-300 hover:text-white hover:underline cursor-pointer transition-all"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
