import React, { useEffect, useRef, useState, useCallback } from "react";

/* ---------------------------------------------------------------
   FONTS + GLOBAL STYLE
--------------------------------------------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .csi-root {
      --bg: #FAFAF8;
      --bg-raised: #F3F2EC;
      --text: #14151A;
      --text-dim: #5B5C66;
      --violet: #6D4AFF;
      --mint: #0F8F5F;
      --amber: #C2660D;
      --gold: #A6790A;
      --line: rgba(20,21,26,0.10);
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      position: relative;
      scroll-behavior: smooth;
    }
    .csi-root .disp { font-family: 'Space Grotesk', sans-serif; }
    .csi-root .mono { font-family: 'JetBrains Mono', monospace; }

    .csi-root section { scroll-margin-top: 0; }

    .csi-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
    }
    .csi-reveal.in {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .csi-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
      .csi-marquee-track { animation: none !important; }
    }

    .csi-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
    .csi-marquee-track { display: flex; width: max-content; animation: csi-scroll 26s linear infinite; }
    .csi-marquee:hover .csi-marquee-track { animation-play-state: paused; }
    @keyframes csi-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    .csi-blink { animation: csi-blink 1s steps(1) infinite; }
    @keyframes csi-blink { 50% { opacity: 0; } }

    .csi-dot { transition: background 0.3s, transform 0.3s; }
    .csi-dot.active { background: var(--violet) !important; transform: scale(1.4); }

    .csi-root a:focus-visible, .csi-root button:focus-visible {
      outline: 2px solid var(--mint);
      outline-offset: 3px;
    }

    .csi-grain {
      pointer-events: none;
      position: fixed;
      inset: 0;
      opacity: 0.02;
      z-index: 50;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
  `}</style>
);

/* ---------------------------------------------------------------
   REVEAL HOOK
--------------------------------------------------------------- */
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(node);
        }
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }) => {
  const [ref, inView] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`csi-reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
};

/* ---------------------------------------------------------------
   TECH BADGES (hand-drawn generic marks, not trademarked logos)
--------------------------------------------------------------- */
const Badge = ({ label, bg, fg = "#0B0C10", children, mono }) => (
  <div
    className="flex items-center gap-2 px-3.5 py-2 rounded-full border shrink-0"
    style={{ borderColor: "var(--line)", background: "var(--bg-raised)" }}
  >
    <span
      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
    <span className={`text-sm ${mono ? "mono" : "disp"}`} style={{ color: "var(--text)" }}>
      {label}
    </span>
  </div>
);

const svgProps = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none" };

const Icons = {
  html: (
    <svg {...svgProps}><path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="currentColor" opacity="0.9"/></svg>
  ),
  css: (
    <svg {...svgProps}><path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="currentColor" opacity="0.9"/></svg>
  ),
  js: (
    <svg {...svgProps}><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/></svg>
  ),
  node: (
    <svg {...svgProps}><path d="M12 2l8 4.6v10.8L12 22l-8-4.6V6.6L12 2z" fill="currentColor" opacity="0.9"/></svg>
  ),
  express: (
    <svg {...svgProps}><path d="M3 12h18M3 12c3-6 15-6 18 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
  ),
  react: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
    </svg>
  ),
  mongo: (
    <svg {...svgProps}><path d="M12 2c3 4 5 8 5 12a5 5 0 01-10 0c0-4 2-8 5-12z" fill="currentColor" opacity="0.9"/></svg>
  ),
  wordpress: (
    <svg {...svgProps}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M12 7v10M8 8l4 10 4-10" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
  ),
  shopify: (
    <svg {...svgProps}><path d="M6 8h12l1 12H5L6 8z" fill="currentColor" opacity="0.9"/><path d="M9 8a3 3 0 016 0" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
  ),
};

const TECH = [
  { label: "HTML", bg: "#FFB86B", icon: Icons.html },
  { label: "CSS", bg: "#7C5CFC", icon: Icons.css },
  { label: "JavaScript", bg: "#F3E36B", icon: Icons.js },
  { label: "Node.js", bg: "#3DDC97", icon: Icons.node },
  { label: "Express.js", bg: "#8B8C96", icon: Icons.express },
  { label: "React", bg: "#0B0C10", fg: "#7C5CFC", icon: Icons.react, border: true },
  { label: "MongoDB", bg: "#3DDC97", icon: Icons.mongo },
];

/* ---------------------------------------------------------------
   PROGRESS RAIL
--------------------------------------------------------------- */
const RAIL = ["Overview", "Role", "Projects", "Stack", "Build", "Friction", "Skills", "Ahead"];

function ProgressRail({ active, onJump }) {
  return (
    <div
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      aria-hidden="false"
    >
      {RAIL.map((label, i) => (
        <button
          key={label}
          onClick={() => onJump(i)}
          className="group flex items-center gap-3"
          aria-label={`Jump to ${label}`}
        >
          <span
            className="mono text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-dim)" }}
          >
            {String(i).padStart(2, "0")} {label}
          </span>
          <span
            className={`csi-dot w-2 h-2 rounded-full ${active === i ? "active" : ""}`}
            style={{ background: "var(--line)" }}
          />
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   TERMINAL LOG (signature element)
--------------------------------------------------------------- */
const LOG_LINES = [
  "$ init corporate-soldiers/internship --role=wordpress-shopify",
  "> boot: jun 2026 — aug 2026",
  "$ auth.configure --hash=bcrypt --salt=true",
  "> authorization: role-based, session-secure",
  "$ db.connect mongodb://project/full-stack",
  "> rest api: crud operations — 200 OK",
  "$ status: reviewed-by-senior-devs",
  "> outcome: coding-standards++ debugging++",
];

function TerminalLog() {
  const [ref, inView] = useReveal(0.3);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shown >= LOG_LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 420);
    return () => clearTimeout(t);
  }, [inView, shown]);

  return (
    <div
      ref={ref}
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--line)", background: "#0A0A0D" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F56" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#27C93F" }} />
        <span className="mono text-xs ml-2" style={{ color: "var(--text-dim)" }}>
          build.log
        </span>
      </div>
      <div className="p-5 md:p-6 min-h-[220px]">
        {LOG_LINES.slice(0, shown).map((line, i) => (
          <div
            key={i}
            className="mono text-[12.5px] md:text-sm leading-7"
            style={{
              color: line.startsWith(">") ? "#6EE7B7" : "#8B8C96",
            }}
          >
            {line}
          </div>
        ))}
        {shown < LOG_LINES.length && (
          <span className="mono text-sm csi-blink" style={{ color: "#6EE7B7" }}>
            _
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SMALL BUILDING BLOCKS
--------------------------------------------------------------- */
const Eyebrow = ({ n, children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="mono text-xs" style={{ color: "var(--mint)" }}>
      {n}
    </span>
    <span className="h-px w-10" style={{ background: "var(--line)" }} />
    <span className="mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-dim)" }}>
      {children}
    </span>
  </div>
);

const Card = ({ title, items, accent = "var(--violet)" }) => (
  <div
    className="rounded-xl border p-6 md:p-7 h-full"
    style={{ borderColor: "var(--line)", background: "var(--bg-raised)" }}
  >
    <h3 className="disp text-xl md:text-2xl font-semibold mb-4" style={{ color: accent }}>
      {title}
    </h3>
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: "var(--text)" }}>
          <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

/* ---------------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------------- */
export default function InternshipRecap() {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setActive(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const jump = useCallback((i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const setSectionRef = (i) => (el) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      className="csi-root h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y proximity" }}
    >
      <GlobalStyle />
      <div className="csi-grain" />
      <ProgressRail active={active} onJump={jump} />

      {/* 00 — HERO */}
      <section
        ref={setSectionRef(0)}
        data-idx={0}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 relative"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal delay={0}>
          <p className="mono text-xs tracking-[0.25em] uppercase mb-8" style={{ color: "var(--text-dim)" }}>
            Corporate Soldiers · WordPress &amp; Shopify Intern
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="disp font-semibold leading-[0.95] text-[13vw] md:text-[6.2vw] tracking-tight">
            Two months.
            <br />
            <span style={{ color: "var(--violet)" }}>WordPress</span> by day.
            <br />
            <span style={{ color: "var(--mint)" }}>Full‑stack</span> by night.
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-8 max-w-xl text-base md:text-lg" style={{ color: "var(--text-dim)" }}>
            An internship recap — June to August 2026. Client sites, page
            layouts, and a self‑driven detour into building things from
            scratch.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-16 flex items-center gap-2 mono text-xs" style={{ color: "var(--text-dim)" }}>
            <span>Scroll</span>
            <span className="csi-blink">↓</span>
          </div>
        </Reveal>
      </section>

      {/* 01 — ROLE */}
      <section
        ref={setSectionRef(1)}
        data-idx={1}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="01">The company &amp; the role</Eyebrow>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Reveal delay={100}>
            <div>
              <h2 className="disp text-3xl md:text-4xl font-semibold mb-5 leading-tight">
                A digital marketing &amp; web solutions company.
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                Builds business websites and e‑commerce stores — spanning
                design, branding, content management, and full client
                projects.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <Card
              title="My responsibilities"
              accent="var(--mint)"
              items={[
                "WordPress website management",
                "Website layout & page structuring",
                "Organizing website content",
                "Typography & visual consistency",
                "Website prototyping & UI discussions",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 02 — PROJECTS */}
      <section
        ref={setSectionRef(2)}
        data-idx={2}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="02">Client work</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="disp text-3xl md:text-4xl font-semibold mb-10 leading-tight max-w-2xl">
            Two live client engagements, one shared standard for quality.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal delay={160}>
            <Card
              title="Addrs Labs"
              accent="var(--violet)"
              items={[
                "Content organization",
                "Layout improvements",
                "Typography selection",
                "Basic UI prototyping",
                "Visual consistency across pages",
              ]}
            />
          </Reveal>
          <Reveal delay={260}>
            <Card
              title="Other client websites"
              accent="var(--amber)"
              items={[
                "Updating WordPress pages",
                "Managing website content",
                "Maintaining responsive layouts",
                "Coordinating with the dev team",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 03 — STACK / PARALLEL LEARNING */}
      <section
        ref={setSectionRef(3)}
        data-idx={3}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="03">Learning in parallel</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="disp text-3xl md:text-4xl font-semibold mb-6 leading-tight max-w-2xl">
            Alongside client work, a self‑taught detour into the full stack.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="max-w-xl mb-12 text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            Understanding both worlds — the no‑code/low‑code side of
            WordPress and the fully custom side of modern web development.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="csi-marquee">
            <div className="csi-marquee-track gap-3 pr-3">
              {[...TECH, ...TECH].map((t, i) => (
                <Badge key={i} label={t.label} bg={t.bg} fg={t.fg}>
                  <span style={{ color: t.fg || "#0B0C10" }}>{t.icon}</span>
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 04 — PERSONAL PROJECT / TERMINAL */}
      <section
        ref={setSectionRef(4)}
        data-idx={4}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="04">Personal project</Eyebrow>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <Reveal delay={100}>
            <div>
              <h2 className="disp text-3xl md:text-4xl font-semibold mb-5 leading-tight">
                A full‑stack app, built to prove the learning was real.
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--text-dim)" }}>
                React, Node.js, Express.js, and MongoDB — with real
                authentication, authorization, and a secure login system
                built from scratch.
              </p>
              <ul className="space-y-2 mono text-[13px]" style={{ color: "var(--text)" }}>
                {[
                  "User authentication & authorization",
                  "Password hashing & salting",
                  "Secure login system",
                  "Database integration",
                  "REST APIs · CRUD operations",
                ].map((f) => (
                  <li key={f} className="flex gap-2">
                    <span style={{ color: "var(--mint)" }}>›</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm" style={{ color: "var(--text-dim)" }}>
                Reviewed regularly by experienced developers — sharpening
                coding standards, debugging, and project structure.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <TerminalLog />
          </Reveal>
        </div>
      </section>

      {/* 05 — CHALLENGES */}
      <section
        ref={setSectionRef(5)}
        data-idx={5}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="05">Friction points</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="disp text-3xl md:text-4xl font-semibold mb-10 leading-tight max-w-2xl">
            Four real challenges, in the order they showed up.
          </h2>
        </Reveal>
        <div className="space-y-0">
          {[
            {
              n: "01",
              t: "Understanding real client requirements",
              d: "Every client had different expectations — learned to translate ideas into working layouts.",
            },
            {
              n: "02",
              t: "Creativity in website design",
              d: "Balancing typography, spacing, colour, and layout took constant experimentation — small UI decisions, big UX impact.",
            },
            {
              n: "03",
              t: "Balancing internship and personal learning",
              d: "Internship tasks alongside a self-built full-stack project — a real test of time management and consistency.",
            },
            {
              n: "04",
              t: "Learning new technologies",
              d: "Moving from WordPress into backend development meant tackling APIs, databases, and authentication for the first time.",
            },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 100}>
              <div
                className="flex flex-col md:flex-row gap-3 md:gap-10 py-6 md:py-7 border-t"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="mono text-sm shrink-0 w-10" style={{ color: "var(--amber)" }}>
                  {c.n}
                </span>
                <h3 className="disp text-lg md:text-xl font-medium md:w-80 shrink-0">{c.t}</h3>
                <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: "var(--text-dim)" }}>
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — SKILLS */}
      <section
        ref={setSectionRef(6)}
        data-idx={6}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="06">Skills &amp; knowledge gained</Eyebrow>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              t: "WordPress",
              accent: "var(--violet)",
              items: ["Content management", "Website structure", "Page layout", "Typography", "UI consistency"],
            },
            {
              t: "Full-stack dev",
              accent: "var(--mint)",
              items: ["React", "Node.js", "Express.js", "MongoDB"],
            },
            {
              t: "Backend concepts",
              accent: "var(--amber)",
              items: ["Authentication", "Authorization", "Password hashing & salting", "REST APIs", "CRUD", "Database design"],
            },
            {
              t: "Soft skills",
              accent: "var(--gold)",
              items: ["Team collaboration", "Problem solving", "Communication", "Time management", "Client understanding"],
            },
          ].map((g, i) => (
            <Reveal key={g.t} delay={i * 90}>
              <Card title={g.t} accent={g.accent} items={g.items} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 07 — TAKEAWAYS / CLOSE */}
      <section
        ref={setSectionRef(7)}
        data-idx={7}
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
        style={{ scrollSnapAlign: "start" }}
      >
        <Reveal>
          <Eyebrow n="07">Key takeaways</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="disp font-semibold leading-[0.95] text-[11vw] md:text-[5vw] tracking-tight mb-10">
            From CMS
            <br />
            to <span style={{ color: "var(--mint)" }}>code.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <ul className="max-w-2xl space-y-3">
            {[
              "Understood the complete website development workflow",
              "Learned how professional teams collaborate on client projects",
              "Improved problem-solving and debugging skills",
              "Built real confidence building web applications",
              "Experienced both WordPress and custom full-stack development",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] md:text-base leading-relaxed">
                <span style={{ color: "var(--violet)" }}>—</span>
                <span style={{ color: "var(--text)" }}>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={320}>
          <p className="mt-16 mono text-xs" style={{ color: "var(--text-dim)" }}>
            Corporate Soldiers · Jun – Aug 2026 · End of log
          </p>
        </Reveal>
      </section>
    </div>
  );
}