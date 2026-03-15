import { useState, useRef, useEffect } from "react";
import { dbGet, dbSet } from "./supabase.js";

/* ── AUTH ───────────────────────────────────────────────────── */
const PASSWORD = "!33!Munay";

function LoginScreen({ onLogin }) {
  const [pw, setPw]       = useState("");
  const [error, setError] = useState(false);
  const [show, setShow]   = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === PASSWORD) {
      localStorage.setItem("munay_auth", "1");
      onLogin();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ height: 4, background: "linear-gradient(to right, #6B4A00, #B8912A, #6B4A00)", position: "fixed", top: 0, left: 0, right: 0 }} />
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🌿</div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(28px,6vw,46px)", fontWeight: 700, color: "#0D0D0D", letterSpacing: "0.14em", margin: "0 0 8px" }}>MUNAYLEBEN</h1>
        <div style={{ width: 80, height: 2, background: "linear-gradient(to right, transparent, #B8912A, transparent)", margin: "12px auto 16px" }} />
        <p style={{ color: "#6B6B6B", fontSize: 14, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", margin: 0 }}>Marketing Intelligence · Privater Bereich</p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6B6B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'Cinzel', Georgia, serif" }}>Passwort</label>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoFocus
              placeholder="Passwort eingeben…"
              style={{
                width: "100%", padding: "14px 48px 14px 18px",
                border: `2px solid ${error ? "#E05050" : pw ? "#B8912A" : "#E8E0D0"}`,
                borderRadius: 12, fontSize: 15, color: "#0D0D0D",
                outline: "none", background: error ? "#FFF5F5" : "#FAFAF8",
                transition: "all 0.2s", boxSizing: "border-box",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            />
            <button type="button" onClick={() => setShow(!show)}
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9B9B9B", padding: 0 }}>
              {show ? "🙈" : "👁️"}
            </button>
          </div>
          {error && <div style={{ marginTop: 8, fontSize: 13, color: "#C03030", fontWeight: 500 }}>❌ Falsches Passwort</div>}
        </div>

        <button type="submit" disabled={!pw}
          style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none",
            background: pw ? "linear-gradient(135deg, #6B4A00, #D4A83E)" : "#F0EDE8",
            color: pw ? "#fff" : "#B0A890", fontSize: 15, fontWeight: 700,
            cursor: pw ? "pointer" : "not-allowed", transition: "all 0.2s",
            letterSpacing: "0.04em",
          }}>
          Einloggen →
        </button>
      </form>

      <p style={{ marginTop: 32, fontSize: 11, color: "#C0B8A8", letterSpacing: "0.12em", fontFamily: "'Cinzel', Georgia, serif" }}>AYNI · KAWSAY · MUNAY</p>
    </div>
  );
}

/* ── DESIGN TOKENS ─────────────────────────────────────────── */
const GOLD    = "#B8912A";
const GOLD_LT = "#D4A83E";
const BLACK   = "#0D0D0D";
const DARK    = "#1C1C1C";
const MED     = "#3D3D3D";
const MUTED   = "#6B6B6B";
const BORDER  = "#E8E0D0";
const BG_CARD = "#FFFFFF";
const BG_PAGE = "#FAFAF8";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const CAPS  = "'Cinzel', Georgia, serif";
const SANS  = "'DM Sans', system-ui, sans-serif";

// Base font sizes — increase these to make everything bigger
const FS_BODY  = 16;   // main body text (was 14)
const FS_SMALL = 14;   // secondary text (was 12-13)
const FS_TINY  = 12;   // labels/badges (was 11)

const FMT = { Post: "📝", Reel: "🎬", Karussell: "🎠", Story: "📲" };
const MONTHS = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

/* ── CALENDAR DATA ──────────────────────────────────────────── */
function generateCalendar(year, month) {
  const topics = [
    { tema: "Allin Kawsay — Das gute Leben",  formato: "Post",      pilar: "Lehre & Weisheit",         cta: "Teilen" },
    { tema: "Was ist Hucha?",                  formato: "Reel",      pilar: "Lehre & Weisheit",         cta: "Follower" },
    { tema: "Ayni im Alltag anwenden",         formato: "Karussell", pilar: "Heilung & Transformation", cta: "Speichern" },
    { tema: "Mutterwunde heilen",              formato: "Post",      pilar: "Heilung & Transformation", cta: "Ausbildung" },
    { tema: "Peru — Ort der Transformation",   formato: "Reel",      pilar: "Deine Welt & Peru",        cta: "Link in Bio" },
    { tema: "Ahnenarbeit — warum so wichtig",  formato: "Post",      pilar: "Lehre & Weisheit",         cta: "Einzelsitzung" },
    { tema: "Kawsay Pacha verstehen",          formato: "Karussell", pilar: "Lehre & Weisheit",         cta: "Speichern" },
    { tema: "Inneres Kind & Andenkosmologie",  formato: "Post",      pilar: "Heilung & Transformation", cta: "Memberbereich" },
    { tema: "Morgenritual der Anden",          formato: "Reel",      pilar: "Heilung & Transformation", cta: "Follower" },
    { tema: "Selbstwert & Familienenergie",    formato: "Post",      pilar: "Heilung & Transformation", cta: "Ausbildung" },
    { tema: "Vaterwunde erkennen",             formato: "Karussell", pilar: "Heilung & Transformation", cta: "Einzelsitzung" },
    { tema: "Heilige Pflanzen der Anden",      formato: "Post",      pilar: "Deine Welt & Peru",        cta: "Teilen" },
    { tema: "Munay — Die Kraft der Liebe",     formato: "Reel",      pilar: "Lehre & Weisheit",         cta: "Follower" },
    { tema: "Rituale für den Alltag",          formato: "Story",     pilar: "Heilung & Transformation", cta: "Antworten" },
    { tema: "Reise nach Peru 2025",            formato: "Post",      pilar: "Angebote & Community",     cta: "Link in Bio" },
    { tema: "Community Frage",                 formato: "Story",     pilar: "Angebote & Community",     cta: "Antworten" },
    { tema: "Ausbildung — dein Weg",           formato: "Reel",      pilar: "Angebote & Community",     cta: "Ausbildung" },
    { tema: "Munay & Heilung",                 formato: "Post",      pilar: "Heilung & Transformation", cta: "Einzelsitzung" },
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cal = {};
  let idx = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if ([1, 3, 5, 6].includes(dow) && idx < topics.length) {
      const key = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      cal[key] = { ...topics[idx], estado: "pendiente", contenido: "" };
      idx++;
    }
  }
  return cal;
}

/* ── API CALLS (SSE streaming) ──────────────────────────────── */
const MAX_TEXTOS = 40000;

// Parse SSE stream and call onDelta(text) for each chunk, returns final parsed result
async function readSSE(response, onDelta) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // keep incomplete line
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      try {
        const payload = JSON.parse(line.slice(6));
        if (payload.error) throw new Error(payload.error);
        if (payload.delta && onDelta) onDelta(payload.delta);
        if (payload.done) result = payload;
      } catch (e) { /* skip malformed */ }
    }
  }
  return result;
}

async function callManager(msgs, textos, onDelta) {
  const res = await fetch("/api/manager", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: msgs, textos: textos ? textos.slice(0, MAX_TEXTOS) : "" }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return readSSE(res, onDelta);
}

async function callAssistent(msgs, task, textos, onDelta) {
  const res = await fetch("/api/assistent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: msgs, task, textos: textos ? textos.slice(0, MAX_TEXTOS) : "" }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return readSSE(res, onDelta); // returns { text, hashtags, bild }
}

/* ── FORMAT COLORS ──────────────────────────────────────────── */
const FC = {
  Post:      { bg: "#FFF8EC", text: "#8B6A00", dot: "#C9960A" },
  Reel:      { bg: "#FFF0EC", text: "#8B3A00", dot: "#C95A2A" },
  Karussell: { bg: "#EEF2FF", text: "#2A3A8B", dot: "#4A6ACA" },
  Story:     { bg: "#EDFFF4", text: "#0A5A2A", dot: "#2A9A5A" },
};

/* ── SHARED HEADER ──────────────────────────────────────────── */
function Header({ title, subtitle, onBack, right }) {
  return (
    <div style={{
      background: "#fff",
      borderBottom: `1px solid ${BORDER}`,
      padding: "0 24px",
      height: 60,
      display: "flex",
      alignItems: "center",
      gap: 14,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 0 rgba(0,0,0,0.05)",
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "none", border: `1.5px solid ${BORDER}`, borderRadius: 8,
          width: 36, height: 36, cursor: "pointer", fontSize: 18, color: MED,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MED; }}>
          ←
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase", fontFamily: CAPS, fontWeight: 600 }}>MUNAYLEBEN</div>
        <div style={{ fontSize: 15, color: BLACK, fontWeight: 600, fontFamily: SERIF, lineHeight: 1.2 }}>
          {title} {subtitle && <span style={{ fontWeight: 400, color: MUTED, fontSize: 13 }}>— {subtitle}</span>}
        </div>
      </div>
      {right && <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

/* ── BADGE ──────────────────────────────────────────────────── */
function Badge({ children, color = GOLD }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11, fontFamily: SANS, fontWeight: 500,
      color, background: color + "14",
      border: `1px solid ${color}28`,
      borderRadius: 20, padding: "3px 10px",
      lineHeight: 1.4,
    }}>{children}</span>
  );
}

/* ── BUTTON ─────────────────────────────────────────────────── */
function Btn({ children, onClick, disabled, variant = "primary", small, style: ext = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    border: "none", borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: SANS, fontWeight: 600, letterSpacing: "0.01em",
    transition: "all 0.18s", fontSize: small ? 12 : 13,
    padding: small ? "6px 14px" : "10px 20px",
    opacity: disabled ? 0.5 : 1,
    ...ext,
  };
  const variants = {
    primary:   { background: `linear-gradient(135deg, #8B6A00, ${GOLD_LT})`, color: "#fff", boxShadow: `0 2px 10px ${GOLD}30` },
    secondary: { background: "#fff", color: MED, border: `1.5px solid ${BORDER}` },
    ghost:     { background: "transparent", color: MUTED, border: `1px solid ${BORDER}` },
    danger:    { background: "#FFF0F0", color: "#B82222", border: "1px solid #F0C0C0" },
    blue:      { background: "linear-gradient(135deg, #2A3A8B, #4A6ACA)", color: "#fff" },
    green:     { background: "linear-gradient(135deg, #0A5A2A, #2A9A5A)", color: "#fff" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>{children}</button>
  );
}

/* ══════════════════════════════════════════════════════════════
   METRIKEN COMPONENTS
═══════════════════════════════════════════════════════════════ */
function MetrikenUpload({ onAnalyze }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);
  const ref = useRef(null);

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { setFileName(file.name); onAnalyze(e.target.result); };
    reader.readAsText(file, "utf-8");
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => ref.current?.click()}
      style={{ border: `2px dashed ${dragOver ? "#6A3A8A" : BORDER}`, borderRadius: 14, padding: "36px 24px", textAlign: "center", cursor: "pointer", background: dragOver ? "#F8F4FF" : "#FAFAFA", transition: "all 0.2s" }}
    >
      <input ref={ref} type="file" accept=".csv,.txt,.tsv" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
      <div style={{ fontSize: 36, marginBottom: 10 }}>📂</div>
      {fileName
        ? <p style={{ color: "#6A3A8A", fontWeight: 600, fontSize: FS_BODY, margin: 0 }}>✅ {fileName} — wird analysiert…</p>
        : <>
            <p style={{ color: DARK, fontWeight: 600, fontSize: 15, margin: "0 0 6px" }}>CSV hier ablegen oder klicken</p>
            <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>Unterstützt: .csv, .txt, .tsv (Instagram Export)</p>
          </>
      }
    </div>
  );
}

function ManualMetriken({ onAnalyze }) {
  const [vals, setVals] = useState({ followers: "", reach: "", impressions: "", engagement: "", topPost: "", worstPost: "", period: "letzter Monat" });
  const set = (k, v) => setVals(p => ({ ...p, [k]: v }));
  const inp = (label, key, placeholder) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 12, color: MUTED, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 4, textTransform: "uppercase" }}>{label}</label>
      <input value={vals[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
        style={{ width: "100%", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", fontSize: FS_BODY, color: DARK, fontFamily: SANS, outline: "none", boxSizing: "border-box", background: "#FAFAFA" }} />
    </div>
  );
  function submit() {
    const text = `Zeitraum: ${vals.period}
Follower: ${vals.followers}
Reichweite: ${vals.reach}
Impressionen: ${vals.impressions}
Engagement-Rate: ${vals.engagement}%
Bester Post: ${vals.topPost}
Schlechtester Post: ${vals.worstPost}`;
    onAnalyze(text);
  }
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        {inp("Follower", "followers", "z.B. 2.800")}
        {inp("Reichweite", "reach", "z.B. 15.000")}
        {inp("Impressionen", "impressions", "z.B. 45.000")}
        {inp("Engagement-Rate", "engagement", "z.B. 4.2")}
      </div>
      {inp("Bester Post (Thema)", "topPost", "z.B. Reel über Ahnenarbeit — 8.500 Views")}
      {inp("Schlechtester Post", "worstPost", "z.B. Karussell über Preise — 120 Likes")}
      <button onClick={submit}
        style={{ width: "100%", background: `linear-gradient(135deg, #4A1A6A, #6A3A8A)`, border: "none", borderRadius: 10, padding: "12px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 4 }}>
        📊 Jetzt analysieren lassen →
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem("munay_auth") === "1");
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const [screen, setScreen]           = useState("home");
  const [managerMsgs, setManagerMsgs] = useState([]);
  const [assistentMsgs, setAssistentMsgs] = useState([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [textos, setTextos]           = useState(() => localStorage.getItem("munay_textos") || "");
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    // Try new meta format first, fallback to old format (migrate on the fly)
    try {
      const meta = JSON.parse(localStorage.getItem("munay_files_meta") || "null");
      if (meta) return meta.map(f => ({ name: f.name, date: f.date, content: "" }));
      // Old format — migrate: strip content from localStorage to free space
      const old = JSON.parse(localStorage.getItem("munay_files") || "[]");
      if (old.length > 0) {
        const newMeta = old.map(f => ({ name: f.name, date: f.date, size: f.content?.length || 0 }));
        localStorage.setItem("munay_files_meta", JSON.stringify(newMeta));
        localStorage.removeItem("munay_files");
        return old; // keep content in memory for this session
      }
      return [];
    } catch { return []; }
  });
  const [calendar, setCalendar]       = useState(() => {
    try { return JSON.parse(localStorage.getItem("munay_calendar") || "null"); } catch { return null; }
  });
  const [calMonth, setCalMonth]       = useState(() => {
    const n = new Date(); return { year: n.getFullYear(), month: n.getMonth() };
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editHashtags, setEditHashtags] = useState("");
  const [editBild, setEditBild] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const photoInputRef = useRef(null);
  const [calendarTask, setCalendarTask] = useState(null);
  const [showCalBtn, setShowCalBtn]   = useState(false);
  const [generatingDay, setGeneratingDay] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef   = useRef(null);
  const textareaRef    = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [managerMsgs, assistentMsgs, loading]);

  // ── Load from Supabase on startup (cloud overrides localStorage if newer)
  useEffect(() => {
    async function loadFromCloud() {
      const [cloudTextos, cloudCal, cloudFiles] = await Promise.all([
        dbGet("textos"), dbGet("calendar"), dbGet("files_meta")
      ]);
      if (cloudTextos) {
        setTextos(cloudTextos);
        localStorage.setItem("munay_textos", cloudTextos.slice(0, 4_000_000));
      }
      if (cloudCal) {
        try {
          const parsed = JSON.parse(cloudCal);
          setCalendar(parsed);
          localStorage.setItem("munay_calendar", cloudCal);
        } catch(_) {}
      }
      if (cloudFiles) {
        try {
          const parsed = JSON.parse(cloudFiles);
          setUploadedFiles(parsed);
          localStorage.setItem("munay_files_meta", cloudFiles);
        } catch(_) {}
      }
    }
    loadFromCloud();
  }, []); // eslint-disable-line

  // Sync edit fields when calendar content arrives for open modal
  useEffect(() => {
    if (showDayModal && selectedDay && calendar?.[selectedDay]?.estado === "listo") {
      const t = calendar[selectedDay];
      setEditContent(t.contenido || "");
      setEditHashtags(t.hashtags || "");
      setEditBild(t.bild || "");
    }
  }, [calendar, showDayModal, selectedDay]);

  /* ── FILE UPLOAD ── */
  function safeSave(files) {
    // Save metadata (no content) separately to avoid double storage
    try {
      const meta = files.map(f => ({ name: f.name, date: f.date, size: f.content?.length || 0 }));
      localStorage.setItem("munay_files_meta", JSON.stringify(meta));
    } catch (_) {}
    // Save all content as one concatenated string
    const all = files.map(f => `=== ${f.name} ===\n${f.content}`).join("\n\n");
    try {
      localStorage.setItem("munay_textos", all);
    } catch (_) {
      try { localStorage.setItem("munay_textos", all.slice(0, 4_000_000)); } catch (_) {}
    }
    dbSet("textos", all.slice(0, 200_000)); // save first 200KB to cloud
    return all;
  }

  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(e) {
    const ALLOWED = [".txt", ".md", ".rtf", ".text", ".csv", ".doc", ".docx"];
    const files = Array.from(e.target.files).filter(file => {
      const ext = "." + file.name.split(".").pop().toLowerCase();
      return ALLOWED.includes(ext) || file.type.startsWith("text/");
    });
    if (!files.length) { e.target.value = ""; return; }
    setUploading(true);
    try {
      // Read all files sequentially — avoids parallel state update collisions
      const results = [];
      for (const file of files) {
        const ext = "." + file.name.split(".").pop().toLowerCase();
        await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = ev => {
            let content = ev.target.result || "";
            if (ext === ".rtf") content = content.replace(/\{[^{}]*\}|\\[a-z]+\d*\s?|[{}]/g, " ").replace(/\s+/g, " ").trim();
            if (content.length > 50_000) content = content.slice(0, 50_000) + "\n[gekürzt]";
            results.push({ name: file.name, content, date: new Date().toLocaleDateString("de-DE") });
            resolve();
          };
          reader.onerror = () => resolve();
          reader.readAsText(file, "UTF-8");
        });
      }
      // Single state update with all files at once
      setUploadedFiles(prev => {
        const updated = [...prev];
        for (const nf of results) {
          const idx = updated.findIndex(f => f.name === nf.name);
          if (idx >= 0) updated[idx] = nf; else updated.push(nf);
        }
        const all = safeSave(updated);
        setTextos(all);
        return updated;
      });
    } catch(err) {
      console.error("Upload error:", err);
    }
    setUploading(false);
    e.target.value = "";
  }

  function deleteFile(name) {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f.name !== name);
      const all = safeSave(updated);
      setTextos(all);
      return updated;
    });
  }

  /* ── CHAT ── */
  async function sendManagerMsg(text) {
    if (!text.trim() || loading) return;
    const newMsgs = [...managerMsgs, { role: "user", content: text }];
    const placeholder = [...newMsgs, { role: "assistant", content: "", streaming: true }];
    setManagerMsgs(placeholder); setInput(""); setLoading(true);
    try {
      const result = await callManager(newMsgs, textos, (delta) => {
        setManagerMsgs(prev => {
          const msgs = [...prev];
          msgs[msgs.length - 1] = { role: "assistant", content: msgs[msgs.length - 1].content + delta, streaming: true };
          return msgs;
        });
      });
      setManagerMsgs([...newMsgs, { role: "assistant", content: result.text }]);
      if (result.calBtn) setShowCalBtn(true);
    } catch {
      setManagerMsgs([...newMsgs, { role: "assistant", content: "Verbindungsfehler — bitte erneut versuchen." }]);
    }
    setLoading(false);
  }

  async function sendAssistentMsg(text) {
    if (!text.trim() || loading) return;
    const newMsgs = [...assistentMsgs, { role: "user", content: text }];
    const placeholder = [...newMsgs, { role: "assistant", content: "", streaming: true }];
    setAssistentMsgs(placeholder); setInput(""); setLoading(true);
    try {
      const reply = await callAssistent(newMsgs, calendarTask, textos, (delta) => {
        setAssistentMsgs(prev => {
          const msgs = [...prev];
          msgs[msgs.length - 1] = { role: "assistant", content: msgs[msgs.length - 1].content + delta, streaming: true };
          return msgs;
        });
      });
      setAssistentMsgs([...newMsgs, { role: "assistant", content: reply.text || "" }]);
    } catch {
      setAssistentMsgs([...newMsgs, { role: "assistant", content: "Verbindungsfehler — bitte erneut versuchen." }]);
    }
    setLoading(false);
  }

  function activateCalendar() {
    const n = new Date();
    const cal = generateCalendar(n.getFullYear(), n.getMonth());
    const calStr = JSON.stringify(cal);
    setCalendar(cal); localStorage.setItem("munay_calendar", calStr);
    dbSet("calendar", calStr);
    setCalMonth({ year: n.getFullYear(), month: n.getMonth() });
    setShowCalBtn(false); setScreen("calendario");
  }

  function openDayModal(dk) {
    const task = calendar?.[dk];
    if (!task) return;
    setSelectedDay(dk);
    setUploadedPhoto(task.foto || null);
    if (task.estado === "listo") {
      setEditContent(task.contenido || "");
      setEditHashtags(task.hashtags || "");
      setEditBild(task.bild || "");
    } else {
      setEditContent(""); setEditHashtags(""); setEditBild("");
    }
    setShowDayModal(true);
    // Auto-generate if not yet done
    if (task.estado !== "listo" && task.estado !== "generando") {
      generateForDay(dk);
    }
  }

  function saveDayEdits() {
    if (!selectedDay) return;
    setCalendar(prev => {
      const updated = { ...prev, [selectedDay]: { ...prev[selectedDay], contenido: editContent, hashtags: editHashtags, bild: editBild, estado: "listo" } };
      const s = JSON.stringify(updated);
      localStorage.setItem("munay_calendar", s);
      dbSet("calendar", s);
      return updated;
    });
  }

  async function generateForDay(dateKey) {
    const task = calendar[dateKey];
    if (!task || task.estado === "listo") return;
    setGeneratingDay(dateKey);
    setCalendar(prev => ({ ...prev, [dateKey]: { ...prev[dateKey], estado: "generando" } }));
    // Stream content directly into the modal textarea
    setEditContent(""); setEditHashtags(""); setEditBild("");
    let streamed = "";
    try {
      const msgs = [{ role: "user", content: `Erstelle ${task.formato} über "${task.tema}" für die Säule "${task.pilar}". CTA: ${task.cta}.` }];
      const result = await callAssistent(msgs, task, textos, (delta) => {
        streamed += delta;
        // Show content portion live (everything before ===HASHTAGS===)
        const contentPart = streamed.split("===HASHTAGS===")[0].replace("===CONTENT===", "").trim();
        setEditContent(contentPart);
      });
      setEditContent(result.text || "");
      setEditHashtags(result.hashtags || "");
      setEditBild(result.bild || "");
      setCalendar(prev => {
        const updated = { ...prev, [dateKey]: { ...prev[dateKey], estado: "listo", contenido: result.text || "", hashtags: result.hashtags || "", bild: result.bild || "" } };
        const s = JSON.stringify(updated);
        localStorage.setItem("munay_calendar", s);
        dbSet("calendar", s);
        return updated;
      });
    } catch {
      setCalendar(prev => ({ ...prev, [dateKey]: { ...prev[dateKey], estado: "pendiente" } }));
    }
    setGeneratingDay(null);
  }

  const [generatingAll, setGeneratingAll] = useState(false);
  const [genProgress, setGenProgress]     = useState({ done: 0, total: 0 });

  async function generateAllMonth() {
    if (!calendar) return;
    const { year, month } = calMonth;
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    const pending = Object.keys(calendar).filter(k => k.startsWith(prefix) && calendar[k].estado !== "listo");
    if (!pending.length) return;
    setGeneratingAll(true);
    setGenProgress({ done: 0, total: pending.length });
    for (let i = 0; i < pending.length; i++) {
      const dk = pending[i];
      setGeneratingDay(dk);
      setCalendar(prev => ({ ...prev, [dk]: { ...prev[dk], estado: "generando" } }));
      try {
        const task = calendar[dk];
        const msgs = [{ role: "user", content: `Erstelle ${task.formato} über "${task.tema}" für die Säule "${task.pilar}". CTA: ${task.cta}.` }];
        const result = await callAssistent(msgs, task, textos, null);
        setCalendar(prev => {
          const updated = { ...prev, [dk]: { ...prev[dk], estado: "listo", contenido: result.text || "", hashtags: result.hashtags || "", bild: result.bild || "" } };
          const s = JSON.stringify(updated);
          localStorage.setItem("munay_calendar", s);
          dbSet("calendar", s);
          return updated;
        });
      } catch {
        setCalendar(prev => ({ ...prev, [dk]: { ...prev[dk], estado: "pendiente" } }));
      }
      setGenProgress({ done: i + 1, total: pending.length });
      setGeneratingDay(null);
      // Small pause between requests to avoid rate limits
      if (i < pending.length - 1) await new Promise(r => setTimeout(r, 1500));
    }
    setGeneratingAll(false);
    setGenProgress({ done: 0, total: 0 });
  }


  /* ══════════════════════════════════════════════════════════
     SCREEN: TEXTOS
  ══════════════════════════════════════════════════════════ */
  if (screen === "textos") return (
    <div style={{ minHeight: "100vh", background: BG_PAGE, fontFamily: SANS }}>
      <Header
        title="Meine Texte"
        onBack={() => setScreen("home")}
        right={<>
          <Btn onClick={() => fileInputRef.current?.click()} variant="primary" small disabled={uploading}>
            {uploading ? "⏳ Wird geladen…" : "+ Texte hochladen"}
          </Btn>
          <input ref={fileInputRef} type="file" accept=".txt,.md,.rtf,.text,.csv,.doc,.docx,text/*" multiple onChange={handleFileUpload} style={{ display: "none" }} />
        </>}
      />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>

        {/* Info card */}
        <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, color: BLACK, fontFamily: SERIF, fontWeight: 600 }}>Deine Wissensbasis</h2>
          <p style={{ margin: 0, fontSize: FS_BODY, color: MED, lineHeight: 1.7 }}>
            Lade deine .txt Texte hoch — Manager und Assistent übernehmen dann deinen Schreibstil und dein Vokabular.
            Du kannst jederzeit neue Texte hinzufügen oder bestehende ersetzen.
          </p>
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, background: "#EDFFF4", border: "1px solid #A0DFB8", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#0A5A2A", fontWeight: 500 }}>
              ✅ {uploadedFiles.length} Datei{uploadedFiles.length !== 1 ? "en" : ""} aktiv
            </div>
          )}
        </div>

        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{ border: `2px dashed ${BORDER}`, borderRadius: 14, padding: "36px 24px", textAlign: "center", cursor: "pointer", marginBottom: 28, background: "#fff", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = "#FFFCF5"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "#fff"; }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>📂</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: DARK, marginBottom: 4 }}>Klicke hier oder ziehe Dateien rein</div>
          <div style={{ fontSize: 13, color: MUTED }}>.txt · .doc · .docx · .rtf · .md · Mehrere gleichzeitig · Bestehende werden ersetzt</div>
        </div>

        {/* File list */}
        {uploadedFiles.length === 0 ? (
          <div style={{ textAlign: "center", color: MUTED, fontSize: 14, padding: "20px 0" }}>Noch keine Texte hochgeladen.</div>
        ) : (
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", color: MUTED, textTransform: "uppercase", fontFamily: CAPS, marginBottom: 12 }}>
              Hochgeladene Texte ({uploadedFiles.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {uploadedFiles.map((f, i) => (
                <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ fontSize: 24 }}>📄</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: DARK, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                    <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{f.date} · ~{f.content.split(/\s+/).length} Wörter</div>
                  </div>
                  <Btn onClick={() => deleteFile(f.name)} variant="danger" small>Löschen</Btn>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ══════════════════════════════════════════════════════════
     SCREEN: KALENDER
  ══════════════════════════════════════════════════════════ */
  if (screen === "calendario") {
    const { year, month } = calMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = (() => { const d = new Date(year, month, 1).getDay(); return d === 0 ? 6 : d - 1; })();
    const todayKey = (() => { const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`; })();
    const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    const selTask = selectedDay ? calendar?.[selectedDay] : null;
    const monthKeys = Object.keys(calendar || {}).filter(k => k.startsWith(`${year}-${String(month+1).padStart(2,"0")}`));
    const listo = monthKeys.filter(k => calendar[k]?.estado === "listo").length;

    return (
      <div style={{ minHeight: "100vh", background: BG_PAGE, fontFamily: SANS }}>
        <Header
          title="Redaktionskalender"
          subtitle={`${MONTHS[month]} ${year}`}
          onBack={() => setScreen("home")}
          right={<>
            <button onClick={() => { const d = new Date(year, month-1); setCalMonth({ year: d.getFullYear(), month: d.getMonth() }); setSelectedDay(null); }}
              style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: MED }}>‹</button>
            <button onClick={() => { const d = new Date(year, month+1); setCalMonth({ year: d.getFullYear(), month: d.getMonth() }); setSelectedDay(null); }}
              style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: MED }}>›</button>
          </>}
        />

        <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>

          {/* Progress bar */}
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: FS_SMALL, color: MED, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
                  <span>
                    <strong style={{ color: DARK, fontSize: 15 }}>{listo}</strong>
                    <span style={{ color: MUTED }}> / {monthKeys.length} Content-Stücke erstellt</span>
                  </span>
                  {generatingAll && (
                    <span style={{ color: GOLD, fontWeight: 600, fontSize: 12 }}>
                      ⚡ {genProgress.done}/{genProgress.total} generiert…
                    </span>
                  )}
                </div>
                <div style={{ height: 8, background: "#F0EDE8", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${monthKeys.length ? (listo / monthKeys.length) * 100 : 0}%`, background: `linear-gradient(to right, #8B6A00, ${GOLD_LT})`, borderRadius: 4, transition: "width 0.4s" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center", flexWrap: "wrap" }}>
                {listo < monthKeys.length && !generatingAll && (
                  <button onClick={generateAllMonth}
                    style={{ background: `linear-gradient(135deg, #1A1A1A, #3A3A3A)`, border: "none", borderRadius: 10, padding: "9px 18px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    ⚡ Alle generieren ({monthKeys.length - listo} offen)
                  </button>
                )}
                {generatingAll && (
                  <button disabled style={{ background: "#E8E4DC", border: "none", borderRadius: 10, padding: "9px 18px", color: MUTED, fontWeight: 600, fontSize: 13, cursor: "not-allowed" }}>
                    ⏳ Läuft…
                  </button>
                )}
                {listo === monthKeys.length && monthKeys.length > 0 && (
                  <span style={{ fontSize: 13, color: "#2A7A4A", fontWeight: 600 }}>✅ Alles erstellt!</span>
                )}
                {Object.entries(FC).map(([fmt, c]) => (
                  <div key={fmt} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: MED }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                    {FMT[fmt]} {fmt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar grid */}
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#F8F6F2", borderBottom: `1px solid ${BORDER}` }}>
              {DAYS.map(d => (
                <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.12em", fontFamily: CAPS }}>
                  {d}
                </div>
              ))}
            </div>
            {/* Day cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {cells.map((day, i) => {
                if (!day) return <div key={i} style={{ minHeight: 90, borderRight: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: "#FAFAF8" }} />;
                const dk = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                const task = calendar?.[dk];
                const isToday = dk === todayKey;
                const isSel = dk === selectedDay;
                const fc = task ? FC[task.formato] : null;
                return (
                  <div key={i}
                    onClick={() => { if (task) openDayModal(dk); }}
                    style={{
                      minHeight: 90,
                      padding: "8px 7px",
                      borderRight: `1px solid ${BORDER}`,
                      borderBottom: `1px solid ${BORDER}`,
                      cursor: task ? "pointer" : "default",
                      background: isSel ? "#FFFBF0" : isToday ? "#FAFFF5" : "#fff",
                      transition: "background 0.12s",
                      outline: isSel ? `2px solid ${GOLD}` : isToday ? "2px solid #2A9A5A" : "none",
                      outlineOffset: -2,
                      position: "relative",
                    }}
                    onMouseEnter={e => { if (task && !isSel) e.currentTarget.style.background = "#FFFCF5"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isSel ? "#FFFBF0" : isToday ? "#FAFFF5" : "#fff"; }}
                  >
                    <div style={{
                      fontSize: 13, fontWeight: isToday ? 800 : 600,
                      color: isToday ? "#0A5A2A" : DARK,
                      marginBottom: 5, fontFamily: SANS,
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      {day}
                      {isToday && <span style={{ fontSize: 9, background: "#2A9A5A", color: "#fff", borderRadius: 4, padding: "1px 5px", fontWeight: 700, letterSpacing: "0.05em" }}>HOY</span>}
                    </div>
                    {task && fc && (
                      <div style={{ background: fc.bg, borderRadius: 6, padding: "5px 7px", borderLeft: `3px solid ${fc.dot}` }}>
                        <div style={{ fontSize: 10, color: fc.text, fontWeight: 700, marginBottom: 2 }}>
                          {FMT[task.formato]} {task.formato}
                        </div>
                        <div style={{ fontSize: 11, color: DARK, lineHeight: 1.4, fontWeight: 500 }}>
                          {task.tema.length > 24 ? task.tema.slice(0, 24) + "…" : task.tema}
                        </div>
                        <div style={{ fontSize: 11, marginTop: 3 }}>
                          {task.estado === "listo" ? "✅" : task.estado === "generando" ? "⏳" : <span style={{ color: "#C0B8A8", fontSize: 9 }}>○ ausstehend</span>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* DAY MODAL */}
          {showDayModal && selectedDay && selTask && (
            <div onClick={() => { saveDayEdits(); setShowDayModal(false); }}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
              <div onClick={e => e.stopPropagation()}
                style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 620, maxHeight: "94vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>

                {/* Header */}
                <div style={{ background: `linear-gradient(120deg, ${FC[selTask.formato].dot}20, #fff 70%)`, padding: "18px 22px 14px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: CAPS, marginBottom: 4 }}>
                        {new Date(selectedDay + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
                      </div>
                      <h3 style={{ color: BLACK, fontSize: 18, margin: "0 0 8px", fontFamily: SERIF, fontWeight: 700 }}>{selTask.tema}</h3>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        <Badge color={FC[selTask.formato].dot}>{FMT[selTask.formato]} {selTask.formato}</Badge>
                        <Badge color="#7B6A50">{selTask.pilar}</Badge>
                      </div>
                    </div>
                    <button onClick={() => { saveDayEdits(); setShowDayModal(false); }}
                      style={{ background: "#F0EDE8", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14, flexShrink: 0, marginLeft: 10 }}>✕</button>
                  </div>
                </div>

                {/* Body */}
                <div style={{ overflowY: "auto", flex: 1, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Generating spinner */}
                  {selTask.estado === "generando" && (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 14 }}>
                        {[0,1,2].map(j => <div key={j} style={{ width: 10, height: 10, borderRadius: "50%", background: GOLD, animation: `bounce 1.2s ease-in-out ${j*0.2}s infinite` }} />)}
                      </div>
                      <div style={{ color: MED, fontSize: 14, fontStyle: "italic", fontFamily: SERIF }}>KI erstellt deinen Content…</div>
                    </div>
                  )}

                  {/* Content editor */}
                  {(selTask.estado === "listo" || editContent) && (
                    <div>
                      <div style={{ fontSize: 11, color: MUTED, fontFamily: CAPS, letterSpacing: "0.1em", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>✍️ TEXT</span>
                        <button onClick={() => navigator.clipboard.writeText(editContent).then(() => alert("Kopiert! ✅"))}
                          style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, cursor: "pointer", color: MED }}>📋 Kopieren</button>
                      </div>
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        style={{ width: "100%", minHeight: 200, padding: "14px", background: "#FAFAF8", border: `1.5px solid ${BORDER}`, borderRadius: 12, fontSize: FS_BODY, lineHeight: 1.8, color: DARK, fontFamily: SANS, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = GOLD}
                        onBlur={e => e.target.style.borderColor = BORDER}
                      />
                    </div>
                  )}

                  {/* Hashtags */}
                  {(selTask.estado === "listo" || editHashtags) && (
                    <div>
                      <div style={{ fontSize: 11, color: MUTED, fontFamily: CAPS, letterSpacing: "0.1em", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span># HASHTAGS</span>
                        <button onClick={() => navigator.clipboard.writeText(editHashtags).then(() => alert("Hashtags kopiert! ✅"))}
                          style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, cursor: "pointer", color: MED }}>📋 Kopieren</button>
                      </div>
                      <textarea
                        value={editHashtags}
                        onChange={e => setEditHashtags(e.target.value)}
                        style={{ width: "100%", minHeight: 70, padding: "12px 14px", background: "#F0F7FF", border: `1.5px solid #C0D8F8`, borderRadius: 12, fontSize: 13, lineHeight: 1.7, color: "#1A3A6A", fontFamily: SANS, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = "#4A90D9"}
                        onBlur={e => e.target.style.borderColor = "#C0D8F8"}
                      />
                    </div>
                  )}

                  {/* Bild brief */}
                  {(selTask.estado === "listo" || editBild) && (
                    <div>
                      <div style={{ fontSize: 11, color: MUTED, fontFamily: CAPS, letterSpacing: "0.1em", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>🎨 BILD-IDEE FÜR CANVA</span>
                        <a href="https://canva.com" target="_blank" rel="noreferrer"
                          style={{ fontSize: 11, color: GOLD, textDecoration: "none", border: `1px solid ${GOLD}`, borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>
                          Canva öffnen ↗
                        </a>
                      </div>
                      <textarea
                        value={editBild}
                        onChange={e => setEditBild(e.target.value)}
                        style={{ width: "100%", minHeight: 80, padding: "12px 14px", background: "#FDF5FF", border: `1.5px solid #E0C0F8`, borderRadius: 12, fontSize: 13, color: "#4A1A6A", lineHeight: 1.7, fontStyle: "italic", fontFamily: SANS, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = "#9A50D8"}
                        onBlur={e => e.target.style.borderColor = "#E0C0F8"}
                      />
                    </div>
                  )}

                  {/* Photo upload */}
                  <div>
                    <div style={{ fontSize: 11, color: MUTED, fontFamily: CAPS, letterSpacing: "0.1em", marginBottom: 8 }}>📸 DEIN FOTO (optional)</div>
                    {uploadedPhoto ? (
                      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
                        <img src={uploadedPhoto} alt="Uploaded" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 12 }} />
                        <button onClick={() => setUploadedPhoto(null)}
                          style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 6, color: "#fff", padding: "4px 8px", cursor: "pointer", fontSize: 12 }}>✕ Entfernen</button>
                      </div>
                    ) : (
                      <button onClick={() => photoInputRef.current?.click()}
                        style={{ width: "100%", padding: "18px", background: "#F8F6F2", border: `2px dashed ${BORDER}`, borderRadius: 12, cursor: "pointer", color: MUTED, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        📷 Foto hochladen — JPG, PNG
                      </button>
                    )}
                    <input ref={photoInputRef} type="file" accept="image/*" style={{ display: "none" }}
                      onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => {
                        setUploadedPhoto(ev.target.result);
                        // Save photo to calendar day
                        setCalendar(prev => {
                          const updated = { ...prev, [selectedDay]: { ...prev[selectedDay], foto: ev.target.result } };
                          try { localStorage.setItem("munay_calendar", JSON.stringify(updated)); } catch(_) {}
                          return updated;
                        });
                      }; r.readAsDataURL(f); } }} />
                  </div>
                </div>

                {/* Footer actions */}
                <div style={{ padding: "14px 22px", borderTop: `1px solid ${BORDER}`, background: "#FAFAF8", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
                  <button onClick={() => { saveDayEdits(); setShowDayModal(false); }}
                    style={{ flex: 1, background: `linear-gradient(135deg, #8B6000, ${GOLD})`, border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    💾 Speichern & Schließen
                  </button>
                  <Btn variant="ghost" small onClick={() => { generateForDay(selectedDay); }}>⚡ Neu generieren</Btn>
                  <Btn variant="ghost" small onClick={() => { setCalendarTask(selTask); setAssistentMsgs([]); setShowDayModal(false); setScreen("assistent"); }}>✍🏽 Im Assistent öffnen</Btn>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     SCREEN: HOME
  ══════════════════════════════════════════════════════════ */
  if (screen === "home") {
    const calReady = calendar && Object.keys(calendar).length > 0;
    const listo = calReady ? Object.values(calendar).filter(v => v.estado === "listo").length : 0;
    const total = calReady ? Object.keys(calendar).length : 0;

    const cards = [
      {
        key: "textos",
        label: "WISSENSBASIS",
        title: "Meine Texte",
        desc: "Lade deine .txt Texte hoch — Manager & Assistent sprechen dann in deiner Stimme.",
        icon: "📚",
        accent: "#2A7A4A",
        badge: uploadedFiles.length > 0 ? `${uploadedFiles.length} Texte aktiv` : null,
        badgeColor: "#2A7A4A",
        empty: uploadedFiles.length === 0 ? "Noch keine Texte" : null,
      },
      {
        key: "manager",
        label: "STRATEGIE",
        title: "Marketing Manager",
        desc: "Dein KI-Berater — stellt Fragen, analysiert deine Situation und erstellt einen Redaktionskalender.",
        icon: "🎯",
        accent: GOLD,
        badge: null,
        empty: null,
      },
      {
        key: "calendario",
        label: "ZENTRUM",
        title: "Kalender",
        desc: "Monatsplan mit Themen & Formaten — generiere Content direkt aus jedem Tag.",
        icon: "📅",
        accent: "#3A5AAA",
        badge: calReady ? `${listo} / ${total} erstellt` : null,
        badgeColor: "#3A5AAA",
        empty: !calReady ? "Noch kein Kalender" : null,
      },
      {
        key: "assistent",
        label: "CONTENT",
        title: "Assistent",
        desc: "Erstellt Posts, Reels, Karussells & Stories in deiner Sprache und deinem Stil.",
        icon: "✍🏽",
        accent: "#8B3A00",
        badge: null,
        empty: null,
      },
      {
        key: "metriken",
        label: "ANALYSE",
        title: "Metriken",
        desc: "Lade deine Instagram-Statistiken hoch — der Manager analysiert was funktioniert.",
        icon: "📊",
        accent: "#6A3A8A",
        badge: null,
        empty: "CSV hochladen",
      },
    ];

    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: SANS, display: "flex", flexDirection: "column" }}>
        {/* Top gold bar */}
        <div style={{ height: 4, background: `linear-gradient(to right, #6B4A00, ${GOLD}, #6B4A00)` }} />

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "52px 24px 44px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 56, marginBottom: 16, lineHeight: 1 }}>🌿</div>
          <h1 style={{ fontFamily: CAPS, fontSize: "clamp(30px, 6vw, 54px)", fontWeight: 700, color: BLACK, letterSpacing: "0.14em", margin: "0 0 6px" }}>
            MUNAYLEBEN
          </h1>
          <div style={{ width: 100, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: "14px auto 18px" }} />
          <p style={{ color: MED, fontSize: "clamp(14px, 2vw, 17px)", letterSpacing: "0.04em", fontFamily: SERIF, fontStyle: "italic", margin: 0, fontWeight: 500 }}>
            Marketing Intelligence · Urwissen der Anden
          </p>
        </div>

        {/* Cards */}
        <div style={{ flex: 1, padding: "40px 24px 60px", maxWidth: 1000, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {cards.map(c => (
              <button
                key={c.key}
                onClick={() => { if (c.key === "assistent") { setCalendarTask(null); setAssistentMsgs([]); } setScreen(c.key); }}
                style={{
                  background: "#fff",
                  border: `1.5px solid ${BORDER}`,
                  borderTop: `3px solid ${c.accent}`,
                  borderRadius: 14,
                  padding: "26px 22px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.10), 0 0 0 1px ${c.accent}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", color: c.accent, fontFamily: CAPS, fontWeight: 700, marginBottom: 8 }}>{c.label}</div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: BLACK, fontFamily: SERIF, margin: "0 0 10px", lineHeight: 1.2 }}>{c.title}</h2>
                <p style={{ fontSize: FS_SMALL, color: MED, lineHeight: 1.7, margin: "0 0 14px" }}>{c.desc}</p>
                {c.badge && <Badge color={c.badgeColor}>{c.badge}</Badge>}
                {!c.badge && c.empty && <span style={{ fontSize: 12, color: "#C0B8A8", fontStyle: "italic" }}>{c.empty}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "0 0 32px", borderTop: `1px solid ${BORDER}` }}>
          <p style={{ color: "#C0B8A8", fontSize: 11, letterSpacing: "0.16em", fontFamily: CAPS, margin: "16px 0 8px" }}>
            AYNI · KAWSAY · MUNAY
          </p>
          <button onClick={() => { localStorage.removeItem("munay_auth"); window.location.reload(); }}
            style={{ background: "none", border: "none", color: "#C0B8A8", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: SANS }}>
            Ausloggen
          </button>
        </div>

        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      </div>
    );
  }

  /* ── MARKDOWN RENDERER ── */
  function renderMD(text) {
    const lines = text.split("\n");
    const elements = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (/^###\s/.test(line)) {
        elements.push(<h4 key={i} style={{ color: BLACK, fontSize: 14, fontWeight: 700, margin: "16px 0 6px", fontFamily: SERIF, letterSpacing: "0.01em" }}>{line.replace(/^###\s/, "")}</h4>);
      } else if (/^##\s/.test(line)) {
        elements.push(<h3 key={i} style={{ color: BLACK, fontSize: 16, fontWeight: 700, margin: "18px 0 8px", fontFamily: SERIF }}>{line.replace(/^##\s/, "")}</h3>);
      } else if (/^#\s/.test(line)) {
        elements.push(<h2 key={i} style={{ color: BLACK, fontSize: 18, fontWeight: 700, margin: "20px 0 10px", fontFamily: SERIF }}>{line.replace(/^#\s/, "")}</h2>);
      } else if (/^---+$/.test(line.trim())) {
        elements.push(<hr key={i} style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: "14px 0" }} />);
      } else if (/^[\*\-]\s/.test(line)) {
        elements.push(<div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}><span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>•</span><span style={{ color: DARK, fontSize: FS_BODY, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: line.replace(/^[\*\-]\s/, "").replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} /></div>);
      } else if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^(\d+)\./)[1];
        elements.push(<div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}><span style={{ color: GOLD, fontWeight: 700, flexShrink: 0, minWidth: 20, fontSize: 13 }}>{num}.</span><span style={{ color: DARK, fontSize: FS_BODY, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, "").replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} /></div>);
      } else if (line.trim() === "") {
        elements.push(<div key={i} style={{ height: 6 }} />);
      } else {
        elements.push(<p key={i} style={{ color: DARK, fontSize: FS_BODY, lineHeight: 1.8, margin: "0 0 4px" }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />);
      }
      i++;
    }
    return <div>{elements}</div>;
  }

  /* ══════════════════════════════════════════════════════════
     SCREEN: METRIKEN
  ══════════════════════════════════════════════════════════ */
  if (screen === "metriken") {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: SANS }}>
        <Header title="Metriken" subtitle="Instagram Analyse" onBack={() => setScreen("home")} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>

          {/* Instructions */}
          <div style={{ background: "#F8F4FF", border: "1.5px solid #D4B8F0", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
            <h3 style={{ color: BLACK, fontFamily: SERIF, fontSize: 17, marginBottom: 8 }}>Instagram Statistiken hochladen</h3>
            <p style={{ color: MED, fontSize: FS_BODY, lineHeight: 1.7, margin: "0 0 12px" }}>
              Exportiere deine Instagram-Statistiken als CSV (Instagram → Statistiken → Exportieren) und lade die Datei hier hoch. Der Marketing Manager analysiert dann, was funktioniert.
            </p>
            <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px" }}>
              <p style={{ color: MUTED, fontSize: 12, margin: 0, lineHeight: 1.7 }}>
                <strong style={{ color: DARK }}>So exportierst du:</strong><br/>
                Instagram App → Profil → ☰ → Statistiken → oben rechts "Exportieren" → Zeitraum wählen → Als CSV herunterladen
              </p>
            </div>
          </div>

          {/* CSV Upload */}
          <MetrikenUpload onAnalyze={(csv) => {
            setManagerMsgs([]);
            setScreen("manager");
            setTimeout(() => sendManagerMsg(`Ich habe meine Instagram-Statistiken exportiert. Bitte analysiere diese Daten und sag mir was gut funktioniert, was nicht, und was ich verbessern soll:\n\n${csv.slice(0, 8000)}`), 300);
          }} />

          {/* Manual input */}
          <div style={{ marginTop: 24, background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: "20px 24px" }}>
            <h4 style={{ color: BLACK, fontFamily: SERIF, fontSize: 15, marginBottom: 12 }}>Oder Zahlen manuell eingeben</h4>
            <ManualMetriken onAnalyze={(text) => {
              setManagerMsgs([]);
              setScreen("manager");
              setTimeout(() => sendManagerMsg(`Analysiere meine Instagram-Metriken und gib mir konkrete Empfehlungen:\n\n${text}`), 300);
            }} />
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     SCREEN: CHAT (Manager & Assistent)
  ══════════════════════════════════════════════════════════ */
  const isManager = screen === "manager";
  const msgs = isManager ? managerMsgs : assistentMsgs;
  const accentColor = isManager ? GOLD : "#C8724A";
  const modeLabel = isManager ? "Marketing Manager" : "Marketing Assistent";

  const MQ = [
    { label: "🎯 Beratung starten",       prompt: "Hallo! Ich möchte eine neue Marketingstrategie für Munayleben entwickeln." },
    { label: "🚀 Ausbildung launchen",     prompt: "Ich möchte die Ausbildung launchen. Ich habe ca. 2.800 Follower und Reels funktionieren gut." },
    { label: "📅 Kalender erstellen",      prompt: "Bitte erstelle mir jetzt einen Redaktionskalender für diesen Monat." },
    { label: "📊 Metriken analysieren",    prompt: "Ich möchte meine Instagram-Statistiken analysieren. Hier sind meine Zahlen:" },
  ];
  const AQ = calendarTask ? [
    { label: `${FMT[calendarTask.formato]} ${calendarTask.formato} erstellen`, prompt: `Erstelle einen ${calendarTask.formato} über "${calendarTask.tema}" für Säule "${calendarTask.pilar}". CTA: ${calendarTask.cta}.` },
    { label: "🔄 Andere Variante",         prompt: `Erstelle eine andere Variante des ${calendarTask.formato}s über "${calendarTask.tema}".` },
    { label: "📋 Canva-Format",            prompt: `Erstelle den ${calendarTask.formato} über "${calendarTask.tema}" im strukturierten Canva-Format.` },
  ] : [
    { label: "📝 Post aus meinen Texten",  prompt: "Erstelle einen tiefen Instagram-Post aus meinen Texten." },
    { label: "🎬 Reel-Skript: Ayni",       prompt: "Erstelle ein Reel-Skript über Ayni mit Sprechtext und Texteinblendungen." },
    { label: "🎠 Karussell: Hucha",        prompt: "Erstelle ein Karussell mit 6 Slides über Hucha." },
    { label: "📲 Story-Sequenz",           prompt: "Erstelle eine 5-teilige Story-Sequenz über Ahnenarbeit." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BG_PAGE, fontFamily: SANS, display: "flex", flexDirection: "column" }}>
      <Header
        title={modeLabel}
        subtitle={isManager ? "Strategischer Berater" : calendarTask ? calendarTask.tema : "Content Creator"}
        onBack={() => setScreen("home")}
        right={<>
          {textos && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#2A7A4A", background: "#EDFFF4", border: "1px solid #A0DFB8", borderRadius: 20, padding: "4px 12px" }}>
              📚 {uploadedFiles.length} Texte
            </div>
          )}
          {isManager && showCalBtn && (
            <Btn variant="blue" small onClick={activateCalendar}>📅 Kalender öffnen</Btn>
          )}
          {msgs.length > 0 && (
            <Btn variant="ghost" small onClick={() => isManager ? setManagerMsgs([]) : setAssistentMsgs([])}>Neu ↺</Btn>
          )}
        </>}
      />

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", maxWidth: 800, margin: "0 auto", width: "100%" }}>

        {msgs.length === 0 && (
          <div>
            {calendarTask && (
              <div style={{ background: "#EEF2FF", border: "1px solid #C0CCFF", borderRadius: 10, padding: "12px 18px", marginBottom: 16, fontSize: 13, color: "#2A3A8B", display: "flex", gap: 8, alignItems: "center" }}>
                📅 <strong>{FMT[calendarTask.formato]} {calendarTask.formato}</strong> — {calendarTask.tema}
              </div>
            )}
            {!textos && (
              <div style={{ background: "#FFFBEA", border: "1px solid #F0D880", borderRadius: 10, padding: "12px 18px", marginBottom: 16, fontSize: 13, color: "#7A5A00", display: "flex", gap: 8, alignItems: "center" }}>
                ⚠️ <span>Für persönlichen Stil: <button onClick={() => setScreen("textos")} style={{ background: "none", border: "none", color: GOLD, cursor: "pointer", fontWeight: 700, fontSize: 13, padding: 0, textDecoration: "underline" }}>Texte hochladen →</button></span>
              </div>
            )}

            {/* Intro card */}
            <div style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderTop: `3px solid ${accentColor}`, borderRadius: 14, padding: "28px", marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{isManager ? "🎯" : "✍🏽"}</div>
              <h2 style={{ color: BLACK, fontSize: 20, marginBottom: 10, fontFamily: SERIF, fontWeight: 700, lineHeight: 1.3 }}>
                {isManager ? "Marketing Manager — dein strategischer Berater" : "Marketing Assistent — deine kreative Hand"}
              </h2>
              <p style={{ color: MED, fontSize: FS_BODY, lineHeight: 1.8, margin: 0 }}>
                {isManager
                  ? "Ich stelle dir die richtigen Fragen, analysiere deine Situation und erstelle einen personalisierten Redaktionskalender. Erzähl mir deine Ziele."
                  : calendarTask
                    ? `Ich erstelle den ${calendarTask.formato} über „${calendarTask.tema}" — in deiner Stimme, sofort veröffentlichbar.`
                    : textos
                      ? `Ich habe Zugriff auf deine ${uploadedFiles.length} Texte. Sag mir, was ich erstellen soll.`
                      : "Ich erstelle Posts, Reels, Karussells und Stories. Lade deine Texte hoch damit ich in deiner Stimme schreibe."}
              </p>
            </div>

            {/* Quick actions */}
            <div style={{ fontSize: 11, letterSpacing: "0.16em", color: MUTED, textTransform: "uppercase", fontFamily: CAPS, marginBottom: 12 }}>Schnellaktionen</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {(isManager ? MQ : AQ).map((qa, i) => (
                <button key={i}
                  onClick={() => isManager ? sendManagerMsg(qa.prompt) : sendAssistentMsg(qa.prompt)}
                  style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "13px 16px", color: DARK, fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left", lineHeight: 1.5, transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = "#FFFCF5"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {qa.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {msgs.map((msg, i) => {
          const isLast = i === msgs.length - 1;
          const isAssistant = msg.role === "assistant";
          // Smart follow-up suggestions for last assistant message
          const managerFollowUps = [
            { label: "📅 Kalender erstellen", prompt: "Bitte erstelle jetzt den Redaktionskalender für diesen Monat." },
            { label: "🔍 Mehr Details", prompt: "Kannst du das vertiefen und konkretere Maßnahmen nennen?" },
            { label: "📊 Prioritäten setzen", prompt: "Was sind die 3 wichtigsten Maßnahmen, mit denen ich sofort anfangen soll?" },
            { label: "💡 Content-Ideen", prompt: "Welche konkreten Content-Ideen hast du für Munayleben?" },
          ];
          const assistentFollowUps = [
            { label: "🔄 Neue Variante", prompt: "Erstelle eine andere Variante davon mit einem anderen Stil." },
            { label: "✂️ Kürzer", prompt: "Mach den Text kürzer und prägnanter." },
            { label: "🔥 Emotionaler", prompt: "Mach den Text emotionaler und persönlicher." },
            { label: "📋 Canva-Format", prompt: "Gib mir das im strukturierten Canva-Format (Titel, Slides, Text pro Slide)." },
          ];
          return (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                  background: msg.role === "user" ? "#F5EDD8" : `linear-gradient(135deg, ${isManager ? "#6B4A00" : "#6B2A00"}, ${accentColor})`,
                }}>
                  {msg.role === "user" ? "👤" : isManager ? "🎯" : "✍🏽"}
                </div>
                <div style={{
                  maxWidth: "82%",
                  background: msg.role === "user" ? "#F9F3E8" : "#fff",
                  border: `1.5px solid ${msg.role === "user" ? "#E8D8A8" : BORDER}`,
                  borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                  padding: "16px 20px",
                  boxShadow: isAssistant ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                  wordBreak: "break-word",
                }}>
                  {isAssistant ? (
                    <>
                      {renderMD(msg.content)}
                      {msg.streaming && (
                        <span style={{
                          display: "inline-block", width: 8, height: 16,
                          background: accentColor, borderRadius: 2, marginLeft: 2,
                          animation: "blink 0.8s step-end infinite",
                          verticalAlign: "middle",
                        }} />
                      )}
                    </>
                  ) : (
                    <p style={{ color: DARK, fontSize: FS_BODY, lineHeight: 1.8, margin: 0 }}>{msg.content}</p>
                  )}
                  {isAssistant && !msg.streaming && (
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${BORDER}`, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <Btn variant="ghost" small onClick={() => navigator.clipboard.writeText(msg.content).then(() => alert("Kopiert! 🌿"))}>📋 Kopieren</Btn>
                      {isManager && !showCalBtn && msgs.length >= 4 && (
                        <Btn variant="blue" small onClick={activateCalendar}>📅 Kalender öffnen</Btn>
                      )}
                      {!isManager && (
                        <Btn variant="green" small onClick={() => { setCalendarTask(null); setScreen("calendario"); }}>📅 Im Kalender speichern</Btn>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Smart follow-up chips — only after last assistant message */}
              {isAssistant && isLast && !loading && (
                <div style={{ marginTop: 10, marginLeft: 44, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(isManager ? managerFollowUps : assistentFollowUps).map((fu, j) => (
                    <button key={j}
                      onClick={() => isManager ? sendManagerMsg(fu.prompt) : sendAssistentMsg(fu.prompt)}
                      style={{
                        background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 20,
                        padding: "6px 14px", fontSize: 12, fontWeight: 500, color: MED,
                        cursor: "pointer", transition: "all 0.15s", fontFamily: SANS,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; e.currentTarget.style.background = "#FFFCF5"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MED; e.currentTarget.style.background = "#fff"; }}
                    >{fu.label}</button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading indicator */}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${isManager ? "#6B4A00" : "#6B2A00"}, ${accentColor})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
              {isManager ? "🎯" : "✍🏽"}
            </div>
            <div style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: "4px 18px 18px 18px", padding: "14px 20px" }}>
              <div style={{ color: MED, fontSize: 13, fontStyle: "italic", fontFamily: SERIF, marginBottom: 8 }}>
                {isManager ? "Strategie wird entwickelt…" : "Content wird erstellt…"}
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {[0,1,2].map(j => (
                  <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor, animation: `bounce 1.2s ease-in-out ${j*0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div style={{ background: "#fff", borderTop: `1.5px solid ${BORDER}`, padding: "14px 16px 16px", position: "sticky", bottom: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); isManager ? sendManagerMsg(input) : sendAssistentMsg(input); } }}
            placeholder={isManager ? "Erzähl mir deine Ziele…" : calendarTask ? `Content für: ${calendarTask.tema}` : "Welchen Content soll ich erstellen?"}
            rows={1}
            style={{ flex: 1, background: BG_PAGE, border: `1.5px solid ${BORDER}`, borderRadius: 12, padding: "12px 16px", color: DARK, fontFamily: SANS, fontSize: 14, outline: "none", resize: "none", lineHeight: 1.6, maxHeight: 140, overflowY: "auto" }}
            onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; }}
            onFocus={e => e.target.style.borderColor = accentColor}
            onBlur={e => e.target.style.borderColor = BORDER}
          />
          <button
            onClick={() => isManager ? sendManagerMsg(input) : sendAssistentMsg(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44, borderRadius: 12, border: "none", cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
              background: (!input.trim() || loading) ? "#F0EDE8" : `linear-gradient(135deg, ${isManager ? "#6B4A00" : "#6B2A00"}, ${accentColor})`,
              color: (!input.trim() || loading) ? "#B0A890" : "#fff",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s",
            }}>↑</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 7, fontSize: 11, color: "#C0B8A8", letterSpacing: "0.08em", fontFamily: CAPS }}>
          Enter senden · Shift+Enter Zeilenumbruch
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        ::-webkit-scrollbar { width: 5px }
        ::-webkit-scrollbar-thumb { background: #D8D0C0; border-radius: 3px }
      `}</style>
    </div>
  );
}
