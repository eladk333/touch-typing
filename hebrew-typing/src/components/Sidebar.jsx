import { NavLink } from "react-router-dom";

function Item({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        display: "block",
        padding: "12px 16px",
        margin: "6px 0",
        borderRadius: 14,
        textDecoration: "none",
        fontWeight: 600,
        color: isActive ? "#0b7d62" : "#0b2239",
        background: isActive ? "rgba(16,185,129,0.12)" : "transparent",
      })}
    >
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside
      dir="rtl"
      style={{
        width: 300,
        minWidth: 260,
        padding: 18,
        borderRight: "1px solid #e6eef5",
        background: "linear-gradient(180deg,#f7fbff,#f3faf6)",
        boxSizing: "border-box",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h2 style={{ margin: "6px 0 18px", fontSize: 26, color: "#0b2239" }}>
        לימוד הקלדה עיוורת
      </h2>

      <h3 style={{ margin: "18px 0 6px", color: "#6a8aa3" }}>ראשי</h3>
      <Item to="/" end>דף הבית</Item>

      <h3 style={{ margin: "18px 0 6px", color: "#6a8aa3" }}>שיעורים</h3>
      <nav>
        <Item to="/lessons/home-row">1. שורת הבית</Item>
        <Item to="/lessons/top-row">2. שורה עליונה</Item>
        <Item to="/lessons/bottom-row">3. שורה תחתונה</Item>
        <Item to="/lessons/capitals">4. אותיות רישיות</Item>
        <Item to="/lessons/punctuation">5. סימני פיסוק</Item>
        <Item to="/lessons/numbers">6. מספרים</Item>
        <Item to="/lessons/symbols">7. סמלים</Item>
      </nav>

      <h3 style={{ margin: "18px 0 6px", color: "#6a8aa3" }}>מבחן מהירות</h3>
      <nav>
        <Item to="/speed-test">Typing Test</Item>
      </nav>
    </aside>
  );
}
