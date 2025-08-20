import React from "react";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


