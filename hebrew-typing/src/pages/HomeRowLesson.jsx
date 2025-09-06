import React, { useEffect, useMemo, useRef, useState } from "react";

const FIXED = {
 ex11: [
  "חחח חחח חחח חחח ללל ללל ללל ללל חחח ללל חחח ללל חחח ללל חלח חלח חלח חלח לחל לחל לחל לחל",
    "חחח חחח חחח ללל ללל ללל חל חל חל לח לח לח חח לל חל לח לח חל חח חל לל לח ח ח ח ח",
  "ל ל ל ל ח ל ל ח ח ל ל ח חלח חחל לחח ללח חלל ללל חחח לחל"
],
  ex12: [
    "ךךך ךךך ךךך ךךך ףףף ףףף ףףף ףףף ךךך ףףף ךךך ףףף ךךך ףףף ךף ך ךף ך ךף ך ךף ך ךף ך",
    "ףךף ךךך ךךך ךךך ףףף ףףף ףףף ךף ךף ךף ךף ך ף ך ף ך ף ךך ף ךף ף ך ף ךך ךף ףף ף ךךך ךךך ךךך",
    "ף ף ף ך ף ך ך ף ך ך ף ך ך ף ךך ף ךך ף ך ךף ף ף ף ךךך ףךף",
  ],
  ex13: [
    "חחח חחח ללל ללל חחח ללל ךךך ךךך ףףף ףףף ךךך ףףף חחח ךךך ללל ףףף ללל ףףף ךךך חחח ףףף",
    "ךךך ללל חחח חלח חלח חךח חךח ךףח ךףח ךףח ח ל ך ח ל ך ח ל חחך חךך חךך חחח ללל",
    "ללל ךךך ףףף חלח חךח חףח חךח ללך לףל לףל חךך לףך לףך חח ל חך חך ח ל חף ח לל ח לך ךך חף",
    "ףח ףל ךח ףף",
  ],
  ex14: [
    "כככ כככ כככ כככ גגג גגג גגג גגג כככ גגג כככ גגג כככ גגג כגכ כגכ כגכ כגכ כגכ",
    "גכג כככ כככ כככ גגג גגג גגג כג כג כג כג כגכ כגכ כגכ ג כ כ כ כ כ",
    "ג ג ג גכ גכ גג גכג ככג גכג גככ גכ גגג כככ גכג",
  ],
  ex15: [
    "דדד דדד דדד דדד ששש ששש ששש ששש דדד ששש דדד ששש דדד ששש דשד דשד דשד דשד שדש שדש שדש",
    "שדש דדד דדד דדד ששש ששש ששש דש דש דש שד שד שד דד שש דש שד שד דש שד דש דד דש שש שד ד ד ד ד",
    "ש ש ש ש ד ש ש ד ד ש ש ד דשד דדש ששד דשש ששש דדד שדש",
  ],
  ex16: [
    "כככ כככ גגג גגג כככ גגג דדד דדד ששש ששש דדד ששש כככ דדד גגג ששש גגג ששש דדד כככ ששש",
    "דדד גגג כככ כגכ כגכ כגג גכג שדש שדש ששד ששד כ ש ג ש כ ש ג ש כשג כשג כשג כשג כככ",
    "גגג דדד ששש גכג גככ גכש גגג גשג גכג גשג גשכ שדש גשד גשש שדש ככ כג גכ כג גכ גג גג גש גש דש שג",
  ],
  ex17: [
    "חחח כככ חחח כככ חחח ללל גגג ללל גגג ךךך דדד ךךך דדד ךךך דדד ףףף ששש ףףף ששש ףףף ששש ףףף ששש",
    "ששש ףףף ששש ךחף ךחף ךחף כששג כששג כששג חחח ללל ךךך ףףף כככ גגג דדד ששש ששש חכח חכח",
    "חכח חכח חלח חלח חלח חךח חךח חךח ךף ך ך ך ך ך ך ך ך ך ך ך כגכ כגכ כגכ כגג כגג",
    "שדש שדש שדש שדש",
  ],
  ex18: [
      "ייי ייי ייי ייי עעע עעע עעע עעע ייי עעע ייי עעע ייי עעע יעי יעי יעי יעי עיי עיי עיי",
    "עי עי עי ייי ייי ייי עעע עעע עעע יע יע יע יע יעע יעע יעע יעע יי יע יע יע עי יע יע יי יי עי עע יע יי יי יי",
    "ע ע ע עי עי ע עי עי ע עי עי יעי יעי יעי יעי ייע עיי עיי יעי עיי עיי עיי עעע ייי יעי",
  ],
  ex19: [
    "ייי ייי עעע עעע ייי עעע חחח חחח כככ כככ חחח כככ ייי חחח עעע כככ עעע כככ עעע חחח ייי כככ",
    "חחח ייי יעי יעי יעי יעי חכח חכח חכח חכח כיח כיח ככח כיח י כ ע ח י כ ע ח י כ יעכח יעכח יעכח יעכח ייי",
    "עעע חחח כככ יעי יכי יכח יעי עחי עחי עחי עכי עעי עעי עעי יי יע יח יכ יע עע יח יע יח חכ",
    "כח עי עכ יח עי חח יי יע יח יכ",
  ],
  ex20: [
    "ששש ששש ששש ףףף ףףף ףףף דדד דדד דדד ךךך ךךך ךךך גגג גגג גגג ללל ללל ללל כככ כככ כככ חחח חחח חחח",
    "חחח עעע עעע עעע ייי ייי ייי עעע ייי כככ חחח גגג ללל דדד דדד ללל ללל כככ כככ חחח דדד ללל דדד ךךך דדד ששש ךךך ששש ששש ףףף ףףף",
    "שכגכייךף שכשכגכייךף שכשכגכייךף שכ;ךגכייך שכ;ךגכייך שכ;ךגכייך עיי;גכשך עיי;גכשך עיי;גכשך",
    "שדש שדש שגש שגש שכש שכש שכש שכש שאש שאש שגש שגש שגש שגש שאש שאש שגש שגש שאש שאש שכש שכש שכש שכש",
    "ששש דדד דדד דדד ךף ךף ךל ךל ךל ךל שלש שלש שלש דשד דשד דשד שכש שכש שכש שכש",
    "שככ שככ שככ שככ גכג גכג גכג גכג גכג גכג גכג גכג גגג כגכ כגכ גגג גגג דדד שדד שדד ששש גכג גכג גכג",
    "לככ לככ לככ לככ חכח חכח חכח חכח יעי יעי יעי יעי כככ יככ יככ יככ",
    "כככ גככ גככ גככ דכד דכד דכד דכד דכד דכד יכד יכד יכד יכד כככ דככ דככ כככ דכד דכד דכד דכד",
    "שככ שככ שככ שככ גכג גכג גכג גכג כגכ כגכ כגכ כגג כגג דככ דככ",
    "לככ לככ לככ לככ חכח חכח חכח חכח עכח עכח עכח עכח",
    "כככ כככ דככ דככ גכג גכג יכג יכג חכג חכג דככ דככ חככ חככ",
    "שגכ גשכ גשכ גשכ עשכ עשכ עשכ עשכ שגג שגג שגג שגג יגי יגי יגי יגי",
    "כדכ כדכ כדכ כדכ דככ דככ דככ דככ דככ דככ דככ דככ",
    "שככ שככ שככ שככ דכד דכד דכד דכד כככ כככ כככ כככ",
    "חכח חכח יכח יכח כככ כככ חככ חככ כככ",
    "ש ד ג",
  ],
};

/* ----------------------- a typeable exercise block ------------------------ */
function Drill({ title, text }) {
  const [cursor, setCursor] = useState(0);

  // states: pending | correct | wrong | tofix | fixed
  // fixed = correct after a mistake (green text + yellow highlight)
  const [states, setStates] = useState(() =>
    Array(text.length).fill("pending")
  );

  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const boxRef = useRef(null);

  const reset = () => {
    setCursor(0);
    setStates(Array(text.length).fill("pending"));
    setPaused(false);
    setEnded(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const focus = () => inputRef.current?.focus();

  useEffect(() => {
    if (!caretRef.current || !boxRef.current) return;
    const c = caretRef.current.getBoundingClientRect();
    const b = boxRef.current.getBoundingClientRect();
    if (c.right > b.right - 40) boxRef.current.scrollLeft += c.right - b.right + 40;
    if (c.left < b.left + 40) boxRef.current.scrollLeft -= b.left - c.left + 40;
  }, [cursor]);

  const onKeyDown = (e) => {
    if (paused || ended) return;

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
      e.preventDefault();
      reset();
      return;
    }
    if (e.key === "Escape") {
      setPaused((p) => !p);
      return;
    }

    // backspace: step back; if it was wrong -> mark as 'tofix' (awaiting correction)
    if (e.key === "Backspace") {
      if (cursor > 0) {
        const ns = [...states];
        const prev = ns[cursor - 1];
        if (prev === "wrong") ns[cursor - 1] = "tofix";
        else ns[cursor - 1] = "pending";
        setStates(ns);
        setCursor(cursor - 1);
      }
      e.preventDefault();
      return;
    }

    if (e.key === "Shift") return;

    const expected = text[cursor];
    const key = e.key === "Enter" ? "\n" : e.key;

    const ns = [...states];
    if (key === expected) {
      // if we previously marked this spot as 'tofix', promote to 'fixed'
      ns[cursor] = ns[cursor] === "tofix" ? "fixed" : "correct";
      setStates(ns);
      const next = cursor + 1;
      setCursor(next);
      if (next >= text.length) setEnded(true);
    } else {
      ns[cursor] = "wrong";
      setStates(ns);
      const next = cursor + 1;
      setCursor(next);
      if (next >= text.length) setEnded(true);
    }
  };

  return (
    <section style={{ marginBottom: 28 }}>
      <h3 style={{ color: "#126", marginBottom: 8, textDecoration: "underline" }}>{title}</h3>

      <div
        ref={boxRef}
        onClick={focus}
        style={{
          background: "#fff9f0",
          border: "1px solid #e8d7b5",
          borderRadius: 16,
          padding: "14px 16px",
          lineHeight: "2.1rem",
          fontSize: 20,
          whiteSpace: "pre",
          overflowX: "auto",
          cursor: "text",
        }}
        dir="rtl"
      >
        <input
          ref={inputRef}
          onKeyDown={onKeyDown}
          style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
        />
        {text.split("").map((ch, i) => {
          const state = states[i];
          const current = i === cursor;

          // base styles
          let style = { color: "#111", padding: "0 1px", borderRadius: 3 };

          if (state === "correct") style.color = "#059669";            // green
          if (state === "wrong")   style.color = "#dc2626";            // red
          if (state === "fixed") {                                     // corrected-after-mistake
            style.color = "#059669";                                   // green text
            style.background = "#fef08a";                              // yellow highlight
          }

          return (
            <span key={i} style={style}>
              {current && (
                <span
                  ref={caretRef}
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1.4rem",
                    background: "#0284c7",
                    margin: "0 1px",
                    animation: "blink 1s infinite",
                    verticalAlign: "middle",
                  }}
                />
              )}
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </div>

      <div style={{ marginTop: 6, textAlign: "right" }}>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            color: "#0a6",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: 700,
            padding: 0,
          }}
        >
          Restart
        </button>
      </div>
    </section>
  );
}


/* ----------------------- page content (same drills) ----------------------- */
export default function HomeRowLesson() {
  const lines = useMemo(() => ({
  rh12: FIXED.ex11.join("\n"),
  rh34: FIXED.ex12.join("\n"),
  rhAll: FIXED.ex13.join("\n"),
  lh12: FIXED.ex14.join("\n"),
  lh34: FIXED.ex15.join("\n"),
  lhAll: FIXED.ex16.join("\n"),
  both: FIXED.ex17.join("\n"),
  hAndG: FIXED.ex18.join("\n"),      
  fourIndex: FIXED.ex19.join("\n"),  
  allTogether: FIXED.ex20.join("\n")
}), []);

  return (
    <div dir="rtl">
      <h1 style={{ marginBottom: 12 }}>שיעור 1: שורת הבית</h1>
      <p style={{ color: "#456" }}>
        נלמד בהדרגה את שורת הבית — לחצו על קופסת התרגול כדי להתחיל להקליד.
      </p>

      <h2 style={{ color: "#246", margin: "24px 0 8px" }}>יד ימין</h2>
      <p>נתחיל עם שתי האותיות הראשונות: <b>ח, ל</b></p>
      <Drill title="תרגיל הקלדה 1.1" text={lines.rh12} />

      <p>כעת נלמד את שתי האותיות הבאות: <b>ך, ף</b></p>
      <Drill title="תרגיל הקלדה 1.2" text={lines.rh34} />

      <p>מצוין! עכשיו נשלב את ארבע האותיות יחד: <b>ח, ל, ך, ף</b></p>
      <Drill title="תרגיל הקלדה 1.3" text={lines.rhAll} />

      <h2 style={{ color: "#246", margin: "24px 0 8px" }}>יד שמאל</h2>
      <p>נתחיל עם שתי האותיות הראשונות: <b>כ, ג</b></p>
      <Drill title="תרגיל הקלדה 1.4" text={lines.lh12} />

      <p>כעת האותיות הבאות: <b>ש, ד</b></p>
      <Drill title="תרגיל הקלדה 1.5" text={lines.lh34} />

      <p>ולבסוף כל אותיות יד שמאל: <b>כ, ג, ד, ש</b></p>
      <Drill title="תרגיל הקלדה 1.6" text={lines.lhAll} />

      <h2 style={{ color: "#246", margin: "24px 0 8px" }}>שתי הידיים</h2>
      <p>כעת נשלב את כל האותיות שלמדנו: <b>ח, ל, ך, ף, כ, ג, ד, ש</b></p>
      <Drill title="תרגיל הקלדה 1.7" text={lines.both} />
      <h2 style={{ color: "#246", margin: "24px 0 8px" }}>י ו־ע</h2>
      <p>כעת לומדים לצאת משורת הבית עם האצבעות ולהגיע אל האותיות <b>י</b> ו־<b>ע</b>.</p>
      <Drill title="תרגיל הקלדה 1.8" text={lines.hAndG} />

      <p style={{ marginTop: 16 }}>עכשיו כל ארבע אותיות האצבעות: <b>…</b></p>
      <Drill title="תרגיל הקלדה 1.9" text={lines.fourIndex} />

      <h2 style={{ color: "#246", margin: "24px 0 8px" }}>הכול יחד</h2>
      <Drill title="תרגיל הקלדה 1.10" text={lines.allTogether} />
    </div>
  );
}
