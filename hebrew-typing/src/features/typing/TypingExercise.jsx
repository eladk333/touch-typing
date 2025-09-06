import React, { useEffect, useMemo, useRef, useState } from "react";
import { LESSONS } from "../../data/lessons.js";

// --- Helpers ---------------------------------------------------------------
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const fmt = (n) => (Number.isFinite(n) ? n.toFixed(1) : "0.0");

const ROW_TOP = "קראטוןםפ";
const ROW_MID = "שדגכיעחלך";
const ROW_BOT = "זסבהנמצתץ";

const HEB_QUOTES = [
  "שלום עולם",
  "יש לי כלב קטן",
  "השמש זורחת הבוקר",
  "מחשב טוב עושה שמחה",
  "לומדים להקליד בעברית",
  "הדרך הכי טובה היא תרגול"
];

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildDrillFromChars(chars, syllable = 2, words = 10) {
  const pieces = [];
  for (let w = 0; w < words; w++) {
    let word = "";
    const len = clamp(Math.round(syllable + Math.random() * 2), 2, 5);
    for (let i = 0; i < len; i++) {
      word += chars[Math.floor(Math.random() * chars.length)];
    }
    pieces.push(word);
  }
  return pieces.join(" ");
}

// lesson generators
const LESSON_GENERATORS = {
  top: () => buildDrillFromChars(ROW_TOP, 2, 18),
  mid: () => buildDrillFromChars(ROW_MID, 2, 18),
  bot: () => buildDrillFromChars(ROW_BOT, 2, 18),
  mix: () =>
    Math.random() < 0.5
      ? buildDrillFromChars(ROW_TOP + ROW_MID + ROW_BOT, 3, 20)
      : sample(HEB_QUOTES),
};

// --- Component -------------------------------------------------------------
export default function TypingExercise({ lessonId }) {
  const [target, setTarget] = useState("");
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const [paused, setPaused] = useState(false);
  const caretRef = useRef(null);
  const containerRef = useRef(null);

  // Generate new drill text
  const makeNewText = () => {
    const generator = LESSON_GENERATORS[lessonId] || LESSON_GENERATORS.top;
    const txt = generator();
    setTarget(txt);
    setCursor(0);
    setErrors(0);
    setStartedAt(null);
    setEndedAt(null);
    setPaused(false);
  };

  useEffect(() => {
    makeNewText();
  }, [lessonId]);

  // Stats
  const elapsedSec = useMemo(() => {
    if (!startedAt) return 0;
    const end = endedAt || Date.now();
    return Math.max(0, (end - startedAt) / 1000);
  }, [startedAt, endedAt]);

  const charsTyped = cursor + errors;
  const wordsTyped = charsTyped / 5;
  const wpm = elapsedSec > 0 ? (wordsTyped * 60) / elapsedSec : 0;
  const accuracy = charsTyped > 0 ? (cursor / charsTyped) * 100 : 100;

  // Key handling
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!target || paused) return;
      if (endedAt) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
        makeNewText();
        return;
      }

      if (!startedAt) setStartedAt(Date.now());

      const expected = target[cursor];
      if (e.key === "Shift") return;

      if (e.key === "Escape") {
        setPaused((p) => !p);
        return;
      }

      const key = e.key === "Enter" ? "\n" : e.key;

      if (key === expected) {
        setCursor((i) => i + 1);
        if (cursor + 1 >= target.length) {
          setEndedAt(Date.now());
        }
      } else {
        setErrors((n) => n + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [target, cursor, startedAt, paused, endedAt]);

  // Keep caret in view
  useEffect(() => {
    if (!caretRef.current || !containerRef.current) return;
    const caret = caretRef.current;
    const scroller = containerRef.current;
    const cb = caret.getBoundingClientRect();
    const sb = scroller.getBoundingClientRect();
    if (cb.right > sb.right - 40) scroller.scrollLeft += cb.right - sb.right + 40;
    if (cb.left < sb.left + 40) scroller.scrollLeft -= sb.left - cb.left + 40;
  }, [cursor]);

  return (
    <div>
      {/* Stats */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"12px"}}>
        <Stat label="מהירות (WPM)" value={fmt(wpm)} />
        <Stat label="דיוק (%)" value={fmt(accuracy)} />
        <Stat label="שגיאות" value={String(errors)} />
        <Stat label="זמן (ש׳׳)" value={fmt(elapsedSec)} />
      </div>

      {/* Drill */}
      <div
        ref={containerRef}
        style={{
          border:"1px solid #ddd",
          borderRadius:"12px",
          padding:"16px",
          background:"#fff",
          overflowX:"auto",
          whiteSpace:"pre",
          fontSize:"22px",
          lineHeight:"2.2rem",
          direction:"rtl"
        }}
      >
        {target.split("").map((ch, i) => {
          const done = i < cursor;
          const current = i === cursor;
          const isSpace = ch === " ";
          return (
            <span key={i} style={{color: done ? "#059669" : "#111"}}>
              {current && (
                <span
                  ref={caretRef}
                  style={{
                    display:"inline-block",
                    width:"2px",
                    height:"1.5rem",
                    background:"#0284c7",
                    animation:"blink 1s infinite",
                    margin:"0 1px"
                  }}
                />
              )}
              {isSpace ? "\u00A0" : ch}
            </span>
          );
        })}
      </div>

      <p style={{marginTop:"8px", fontSize:"14px", color:"#555"}}>
        Esc = השהיה/המשך | Ctrl/Cmd+R = תרגיל חדש
      </p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{background:"#fff", border:"1px solid #ddd", borderRadius:"12px", padding:"8px"}}>
      <div style={{fontSize:"13px", color:"#666"}}>{label}</div>
      <div style={{fontSize:"20px", fontWeight:"bold"}}>{value}</div>
    </div>
  );
}
