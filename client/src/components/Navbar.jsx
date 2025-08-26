import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">FG</span>
          <span>FoodGoal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Home</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Dashboard</NavLink>
          <NavLink to="/login" className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Login</NavLink>
          <NavLink to="/signup" className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Sign Up</NavLink>
          <button onClick={toggleDark} className="ml-2 rounded-lg px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">Toggle theme</button>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2">
          <span className="sr-only">Toggle menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <NavLink to="/" onClick={() => setOpen(false)} className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Home</NavLink>
            <NavLink to="/dashboard" onClick={() => setOpen(false)} className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Dashboard</NavLink>
            <NavLink to="/login" onClick={() => setOpen(false)} className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Login</NavLink>
            <NavLink to="/signup" onClick={() => setOpen(false)} className={({isActive}) => `hover:text-brand ${isActive ? "text-brand" : ""}`}>Sign Up</NavLink>
            <button onClick={() => { toggleDark(); setOpen(false); }} className="text-left rounded-lg px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">Toggle theme</button>
          </div>
        </div>
      )}
    </header>
  );
}