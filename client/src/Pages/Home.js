import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-brand">FoodGoal</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your one‑stop platform for discovering, ordering, and enjoying amazing food experiences.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-white font-semibold shadow hover:brightness-95"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-white font-semibold shadow hover:brightness-95 dark:bg-white dark:text-gray-900"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
