import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <form className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-lg" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <label htmlFor="email" className="mt-4 block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
        />

        <label htmlFor="password" className="mt-4 block text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
        />

        <button type="submit" className="mt-6 w-full rounded-lg bg-brand text-white font-semibold py-2.5 hover:brightness-95">Sign Up</button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account? <a href="/login" className="text-brand font-medium">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}