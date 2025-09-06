import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Nav({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        "Sidebar-link" + (isActive ? " is-active" : "")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="Sidebar" dir="rtl">
      <h2 className="Sidebar-title">תרגול הקלדה</h2>

      <nav className="Sidebar-section">
        <Nav to="/" end>דף הבית</Nav>
        <Nav to="/practice">תרגול חופשי</Nav>
      </nav>

      <Nav to="/speed-test" end className="Sidebar-link">מבחן מהירות</Nav>

      <p className="Sidebar-subtitle">שיעורים</p>
      <nav className="Sidebar-lessons">
        <Nav to="/lessons/home-row">שורת הבית</Nav>
        <Nav to="/lessons/top-row">שורה עליונה</Nav>
        <Nav to="/lessons/bottom-row">שורה תחתונה</Nav>
        <Nav to="/lessons/capitals">אותיות רישיות</Nav>
        <Nav to="/lessons/punctuation">סימני פיסוק</Nav>
        <Nav to="/lessons/numbers">מספרים</Nav>
        <Nav to="/lessons/symbols">סמלים</Nav>
      </nav>
    </aside>
  );
}
