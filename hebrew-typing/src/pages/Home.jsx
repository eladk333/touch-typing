// src/pages/Home.jsx
export default function Home() {
  return (
    <div dir="rtl" style={{ padding: "24px 20px" }}>
      {/* Title */}
      <h1
        style={{
          margin: "0 0 12px",
          fontSize: "2.2rem",
          lineHeight: 1.2,
          color: "#0f3b6f",
          textShadow: "0 1px 0 #cfefff",
          borderTop: "6px solid #19e2ff",
          paddingTop: 10,
        }}
      >
        שיעורי הקלדה עיוורת
      </h1>

      {/* Intro paragraph — bigger and comfy to read */}
      <p
        style={{
          fontSize: "1.35rem",
          lineHeight: 1.9,
          color: "#111",
          margin: 0,
        }}
      >
        כשאת/ה מתחיל/ה בשיעורי ההקלדה, התמקד/י קודם כול בדיוק. שאפו ל-100% דיוק — המהירות
        תגיע עם האימון. הקלדה עיוורת היא פיתוח של{" "}
        <span style={{ textDecoration: "underline", fontWeight: 700 }}>
          זיכרון שריר
        </span>{" "}
        באמצעות חזרות עקביות של תנועות האצבעות. עם הזמן התנועות יהפכו לטבעיות ותמצא/י את
        עצמך מקליד/ה מהר יותר ובפחות מאמץ.
      </p>

      {/* Optional: highlight box version — toggle display by changing 'display' */}
      <div
        style={{
          display: "none", // change to "block" if you prefer a highlighted box
          background: "#eef9ff",
          border: "2px solid #90cdf4",
          borderRadius: 12,
          padding: "16px 20px",
          marginTop: 18,
          fontSize: "1.2rem",
          lineHeight: 1.9,
          color: "#123",
        }}
      >
        כשאת/ה מתחיל/ה בשיעורי ההקלדה, התמקד/י קודם כול בדיוק. שאפו ל-100% דיוק — המהירות
        תגיע עם האימון. הקלדה עיוורת היא פיתוח של{" "}
        <b>זיכרון שריר</b> באמצעות חזרות עקביות של תנועות האצבעות. עם הזמן התנועות יהפכו
        לטבעיות ותמצא/י את עצמך מקליד/ה מהר יותר ובפחות מאמץ.
      </div>
    </div>
  );
}
