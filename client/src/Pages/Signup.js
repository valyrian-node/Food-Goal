import React, { useState, useEffect } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Auto-redirect if already logged in
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
      navigate("/dashboard"); // Go to dashboard after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <div className="signup-link">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}