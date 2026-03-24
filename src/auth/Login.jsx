import { useState } from "react";
import api from '../api/api';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post("/api/auth/login", { email, password });
      navigate("/profile");
    } catch {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Email
          <input
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="you@example.com"
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Password
          <input
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="••••••••"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-150 mt-1"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;