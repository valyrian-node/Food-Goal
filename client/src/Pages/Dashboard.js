import React from "react";

// Single-file, responsive dashboard inspired by the shared layout
// Pure React + CSS (no external UI libs). Drop this in src/Dashboard.jsx and route to "/dashboard".
export default function Dashboard() {
  // ---- Mock data (replace with real data later) ----
  const user = { name: "Pablo Nicolus", location: "NY, USA" }; // get from auth/profile
  const medical = { bmi: 22.4, allergies: ["Peanuts"], lastUpdate: "12 Aug 2025" };
  const weekly = [
    { label: "Mon", protein: 70, carbs: 180, fat: 55 },
    { label: "Tue", protein: 64, carbs: 160, fat: 50 },
    { label: "Wed", protein: 75, carbs: 190, fat: 60 },
    { label: "Thu", protein: 68, carbs: 170, fat: 52 },
    { label: "Fri", protein: 72, carbs: 200, fat: 58 },
    { label: "Sat", protein: 65, carbs: 150, fat: 45 },
    { label: "Sun", protein: 60, carbs: 140, fat: 42 },
  ];
  const featuredMeal = {
    title: "Mediterranean Bowl",
    kcal: 520,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1280&auto=format&fit=crop", // any food photo
    macros: { protein: 32, carbs: 64, fat: 18 },
  };

  // ---- Tiny helpers to render simple charts (SVG) ----
  const Donut = ({ value, total, size = 120, stroke = 16, label }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = Math.min(100, Math.max(0, (value / total) * 100));
    const dash = (pct / 100) * circumference;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="donut-text">
          {Math.round(pct)}%
        </text>
        {label && (
          <text x="50%" y={size - 8} textAnchor="middle" className="donut-label">{label}</text>
        )}
      </svg>
    );
  };

  const Bars = ({ data, keys }) => {
    const max = Math.max(
      ...data.flatMap((d) => keys.map((k) => d[k]))
    );
    return (
      <div className="bars">
        {data.map((d) => (
          <div key={d.label} className="bar-col">
            <div className="bar-stack">
              {keys.map((k) => (
                <div
                  key={k}
                  className={`bar bar-${k}`}
                  style={{ height: `${(d[k] / max) * 100}%` }}
                  title={`${k}: ${d[k]}g`}
                />
              ))}
            </div>
            <span className="bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fg-shell">
      <aside className="fg-sidebar">
        <div className="fg-logo">
          <div className="logo-box">FG</div>
          <span>Food Goal</span>
        </div>
        <button className="fg-cta">Create New</button>
        <nav className="fg-nav">
          <a className="active" href="#">Dashboard</a>
          <a href="#">My Profile</a>
          <a href="#">Medical History</a>
          <a href="#">Meal Plans</a>
          <a href="#">Recommendations</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      <main className="fg-main">
        <header className="fg-header">
          <div className="welcome">
            <div>
              <h1>Welcome, <span className="hl">{user.name}</span></h1>
              <div className="location">{user.location}</div>
            </div>
            <div className="welcome-art" aria-hidden>
              {/* decorative illustration replacement */}
              <div className="pill" />
              <div className="pill" />
              <div className="pill" />
            </div>
          </div>
        </header>

        <section className="fg-grid">
          {/* Medical Overview */}
          <div className="card">
            <h3>Medical Overview</h3>
            <div className="kv">
              <div>
                <div className="k">BMI</div>
                <div className="v">{medical.bmi}</div>
              </div>
              <div>
                <div className="k">Allergies</div>
                <div className="v">{medical.allergies.join(", ") || "None"}</div>
              </div>
              <div>
                <div className="k">Updated</div>
                <div className="v">{medical.lastUpdate}</div>
              </div>
            </div>
          </div>

          {/* Featured Meal */}
          <div className="card meal">
            <div className="meal-image" style={{ backgroundImage: `url(${featuredMeal.img})` }} />
            <div className="meal-info">
              <h3>{featuredMeal.title}</h3>
              <p>{featuredMeal.kcal} kcal • P {featuredMeal.macros.protein}g • C {featuredMeal.macros.carbs}g • F {featuredMeal.macros.fat}g</p>
              <button className="btn">View Recipe</button>
            </div>
          </div>

          {/* Weekly Nutrient Intake (stacked bars) */}
          <div className="card">
            <div className="card-head">
              <h3>Weekly Nutrient Intake</h3>
              <span className="sub">grams per day</span>
            </div>
            <Bars data={weekly} keys={["protein", "carbs", "fat"]} />
          </div>

          {/* Hydration Goal (donut) */}
          <div className="card center">
            <h3>Hydration</h3>
            <Donut value={9} total={12} label="of 12 glasses" />
          </div>

          {/* Next Check-up */}
          <div className="card">
            <h3>Next Check‑up</h3>
            <div className="checkup">
              <div>
                <div className="big">26</div>
                <div className="muted">Aug 2025</div>
              </div>
              <div>
                <p>With Dr. Patel</p>
                <p className="muted">City Clinic, 3:30 PM</p>
                <button className="btn ghost">Add to Calendar</button>
              </div>
            </div>
          </div>

          {/* Monthly Progress (donut) */}
          <div className="card center">
            <h3>Monthly Progress</h3>
            <Donut value={18} total={24} label="plans completed" />
          </div>
        </section>
      </main>

      <style>{`
        :root {
          --bg: #f5f3f0;
          --panel: #ffffff;
          --muted: #6b7280;
          --text: #1f2937;
          --accent: #f25f5c; /* warm food-ish accent */
          --accent-2: #3fb27f; /* green */
          --accent-3: #f2c14e; /* yellow */
          --shadow: 0 10px 25px rgba(0,0,0,0.06);
          --radius: 16px;
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        .fg-shell {
          min-height: 100vh;
          background: radial-gradient(1200px 800px at 10% 10%, #f2e9e4, transparent),
                      radial-gradient(1000px 700px at 95% 15%, #e6f6ee, transparent),
                      var(--bg);
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
          padding: 24px;
          color: var(--text);
        }
        .fg-sidebar {
          background: #fff7;
          backdrop-filter: blur(6px);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .fg-logo { display: flex; align-items: center; gap: 10px; font-weight: 700; }
        .logo-box { width: 36px; height: 36px; border-radius: 10px; background: var(--accent); color: #fff; display:flex; align-items:center; justify-content:center; }
        .fg-cta { background: linear-gradient(90deg, var(--accent), #ff8b6a); color: #fff; border: 0; border-radius: 20px; padding: 10px 14px; font-weight: 600; cursor: pointer; box-shadow: var(--shadow); }
        .fg-cta:hover { filter: brightness(0.98); }
        .fg-nav { display: grid; gap: 8px; margin-top: 6px; }
        .fg-nav a { text-decoration: none; color: var(--text); padding: 12px 12px; border-radius: 12px; background: #fff; box-shadow: var(--shadow); }
        .fg-nav a.active { outline: 2px solid #0000000d; }

        .fg-main { display: grid; gap: 20px; }
        .fg-header .welcome {
          display: grid; grid-template-columns: 1fr 320px; align-items: center;
          background: #ffdcd3;
          border: 1px solid #f6b9ad;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 24px;
        }
        .hl { color: #0b1a2b; }
        .location { margin-top: 6px; display: inline-block; padding: 6px 10px; background: #fff; border-radius: 999px; border: 1px solid #f1bfb1; color: #8b5c52; font-weight: 600; font-size: 12px; }
        .welcome-art { display:flex; gap: 10px; justify-content: flex-end; }
        .pill { width: 70px; height: 70px; background: #fff; border-radius: 14px; opacity: .6; }

        .fg-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
        }
        .card {
          background: var(--panel);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 18px;
        }
        .card.center { display: grid; justify-items: center; align-items: center; }
        .card h3 { margin: 0 0 10px; }
        .card-head { display:flex; align-items: baseline; justify-content: space-between; }
        .sub { color: var(--muted); font-size: 12px; }

        /* Grid placements */
        .fg-grid > .card:nth-child(1) { grid-column: span 3; }
        .fg-grid > .card.meal { grid-column: span 5; display:grid; grid-template-columns: 2fr 3fr; gap: 14px; }
        .fg-grid > .card:nth-child(3) { grid-column: span 4; }
        .fg-grid > .card:nth-child(4) { grid-column: span 3; }
        .fg-grid > .card:nth-child(5) { grid-column: span 6; }
        .fg-grid > .card:nth-child(6) { grid-column: span 3; }

        .kv { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .k { color: var(--muted); font-size: 12px; }
        .v { font-weight: 700; font-size: 20px; }

        .meal-image { border-radius: 12px; background-size: cover; background-position: center; min-height: 140px; }
        .meal-info .btn { margin-top: 8px; }

        .bars { display:flex; gap: 10px; height: 160px; align-items: flex-end; }
        .bar-col { flex: 1; display:flex; flex-direction: column; align-items: center; gap: 6px; }
        .bar-stack { width: 100%; display:grid; grid-template-rows: 1fr; align-items: end; gap: 4px; height: 100%; }
        .bar { width: 100%; border-radius: 6px 6px 0 0; }
        .bar-protein { background: var(--accent-2); }
        .bar-carbs { background: #7dc4ff; }
        .bar-fat { background: var(--accent-3); }
        .bar-label { font-size: 12px; color: var(--muted); }

        .donut-text { font-size: 18px; font-weight: 700; fill: var(--text); }
        .donut-label { font-size: 11px; fill: var(--muted); }

        .checkup { display:flex; gap: 18px; align-items: center; }
        .big { font-size: 40px; font-weight: 800; }
        .muted { color: var(--muted); }

        .btn { background: var(--accent); color: #fff; border: 0; padding: 10px 14px; border-radius: 12px; font-weight: 600; cursor: pointer; }
        .btn.ghost { background: #fff; color: var(--text); border: 1px solid #e5e7eb; }
        .btn:hover { filter: brightness(.98); }

        /* Laptop-first, still responsive down to tablets */
        @media (max-width: 1100px) {
          .fg-shell { grid-template-columns: 220px 1fr; }
          .fg-grid > .card.meal { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .fg-shell { grid-template-columns: 1fr; }
          .fg-sidebar { position: sticky; top: 0; z-index: 2; display:grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 10px; }
          .fg-nav { grid-column: 1 / -1; grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 780px) {
          .fg-grid { grid-template-columns: repeat(6, 1fr); }
          .fg-grid > .card { grid-column: span 6 !important; }
          .fg-header .welcome { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
