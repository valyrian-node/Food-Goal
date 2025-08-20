import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // import your firebase auth
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset previous errors

    try {
      // Sign in using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Show error if login fails
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

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

        <button type="submit">Login</button>

        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
}