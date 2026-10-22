
"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  FileDown,
  Github,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Network,
  Send,
  X,
} from "lucide-react";

import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import {
  experience,
  education,
  certifications,
  community,
} from "@/data/experience";
import { projects } from "@/data/projects";

const filters = [
  "All",
  "Machine Learning",
  "Computer Vision",
  "NLP",
  "Data Analytics",
];

type CalculatorControl = [
  string,
  number,
  string,
  number,
  number,
  (value: number) => void
];

type ConfusionMatrixCell = [number, string];

type GithubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type GithubResponse = {
  repositories?: GithubRepo[];
  error?: string;
};

function NetworkArt() {
  const pts = [
    [50, 20],
    [28, 34],
    [72, 35],
    [17, 53],
    [43, 50],
    [62, 56],
    [83, 59],
    [29, 73],
    [52, 80],
    [73, 82],
    [49, 43],
    [91, 30],
  ];

  const edges = [
    [0, 1], [0, 2], [0, 10], [1, 3], [1, 4], [2, 4],
    [2, 5], [2, 11], [3, 7], [4, 5], [4, 7], [4, 8],
    [5, 6], [5, 8], [5, 9], [6, 9], [7, 8], [8, 9],
    [10, 1], [10, 2], [10, 4], [11, 2], [11, 6],
  ];

  return (
    <div className="hero-art">
      <div className="orb">
        <svg
          viewBox="0 0 100 100"
          className="network"
          aria-label="Abstract neural network illustration"
        >
          {edges.map(([a, b], i) => (
            <line
              key={i}
              className="network-line"
              x1={pts[a][0]}
              y1={pts[a][1]}
              x2={pts[b][0]}
              y2={pts[b][1]}
            />
          ))}

          {pts.map(([x, y], i) => (
            <circle
              key={i}
              className={`node ${i % 4 === 0 ? "violet" : ""}`}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 2.2 : 1.5}
            />
          ))}
        </svg>
      </div>

      <div className="floating-tag tag-one">
        <b>MODEL / 01</b>
        <br />
        predictive systems
      </div>

      <div className="floating-tag tag-two">
        <b>DATA → SIGNAL</b>
        <br />
        patterns, made useful
      </div>

      <div className="floating-tag tag-three">
        <b>PYTHON</b> · ML · CV
      </div>
    </div>
  );
}

function Visual({ kind }: { kind: string }) {
  return (
    <div className={`project-visual ${kind}`}>
      <span className="visual-label">
        {kind === "vision"
          ? "OBJECT DETECTION"
          : kind === "churn"
            ? "CHURN MODEL / EXPLORER"
            : "CUSTOMER VALUE / DISTRIBUTION"}
      </span>

      <span className="visual-corner">
        FIG. 0{kind === "vision" ? 1 : kind === "churn" ? 2 : 3}
      </span>

      {kind === "vision" ? (
        <>
          <div className="car-shape" />
          <div className="bbox" />
          <div className="plate">ABC 123</div>
          <div className="hud">
            DETECTION: PLATE
            <br />
            OCR PIPELINE: READY
            <br />
            CONFIDENCE: —
          </div>
        </>
      ) : (
        <div
          className={
            kind === "churn" ? "churn-visual" : "clv-visual"
          }
        >
          {(kind === "churn"
            ? [
                24, 35, 42, 28, 61, 45, 78, 50, 66, 38,
                85, 58, 70, 46, 91, 62, 75, 48, 82, 53,
              ]
            : [
                15, 22, 20, 32, 28, 39, 33, 51, 43, 62,
                50, 72, 57, 82, 68, 91, 74, 99, 77, 87,
                62, 75, 48, 54, 38, 43, 27, 35, 20, 25,
              ]
          ).map((h, i) => (
            <div
              className="bar"
              key={i}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      )}

      {kind === "churn" && (
        <div className="chart-stat">
          <strong>0.72</strong>
          <span>ILLUSTRATIVE SCORE</span>
        </div>
      )}
    </div>
  );
}

function Playground() {
  const [tab, setTab] = useState("Classification");
  const [tenure, setTenure] = useState(18);
  const [monthly, setMonthly] = useState(75);
  const [support, setSupport] = useState(2);
  const [threshold, setThreshold] = useState(50);

  const score = Math.max(
    4,
    Math.min(
      96,
      Math.round(
        18 +
          (48 - tenure) * 0.65 +
          (monthly - 50) * 0.38 +
          support * 5
      )
    )
  );

  const tp = Math.round((42 * threshold) / 100);
  const fn = 42 - tp;
  const fp = Math.round((28 * (100 - threshold)) / 100);
  const tn = 28 - fp;

  const calculatorControls: CalculatorControl[] = [
    ["Tenure", tenure, "months", 1, 60, setTenure],
    ["Monthly charge", monthly, "$", 20, 120, setMonthly],
    ["Support interactions", support, "", 0, 8, setSupport],
  ];

  const confusionMatrix: ConfusionMatrixCell[] = [
    [tp, "TRUE POSITIVE"],
    [fp, "FALSE POSITIVE"],
    [fn, "FALSE NEGATIVE"],
    [tn, "TRUE NEGATIVE"],
  ];

  return (
    <div className="playground">
      <div className="play-tabs">
        {["Classification", "Churn simulator", "Evaluation"].map((t) => (
          <button
            key={t}
            className={`play-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Classification" ? (
        <div className="play-content">
          <div>
            <div className="eyebrow">DECISION BOUNDARIES</div>
            <h3>How models separate patterns.</h3>
            <p>
              Classification learns a boundary from labelled examples.
              The points are synthetic teaching data, not from a real project.
            </p>
            <span className="section-meta">
              SYNTHETIC DATA · 2 FEATURES
            </span>
          </div>

          <div className="play-chart">
            <svg
              viewBox="0 0 340 205"
              className="scatter"
              role="img"
              aria-label="Synthetic two-class scatter plot"
            >
              <path
                d="M25 178 L310 25 M25 178 L25 15 M25 178 L320 178"
                stroke="#49dceb"
                strokeDasharray="5 5"
                fill="none"
              />

              {Array.from({ length: 48 }, (_, i) => {
                const x = 36 + (i * 47) % 270;
                const y = 24 + (i * 73) % 145;

                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3.2"
                    fill={y > x * 0.48 + 35 ? "#9478ff" : "#49dceb"}
                  />
                );
              })}
            </svg>

            <div className="repo-meta">
              <span>● CLASS A</span>
              <span style={{ color: "#9478ff" }}>● CLASS B</span>
              <span>— BOUNDARY</span>
            </div>
          </div>
        </div>
      ) : tab === "Churn simulator" ? (
        <div className="play-content">
          <div>
            <div className="eyebrow">INTERACTIVE SIMULATION</div>
            <h3>Explore a sample churn score.</h3>
            <p>
              This rule-based score is illustrative, not the trained model
              and not for real decisions.
            </p>

            {calculatorControls.map(
              ([label, val, unit, min, max, setter]) => (
                <div className="control" key={label}>
                  <label>
                    {label}
                    <b>
                      {val}
                      {unit === "months"
                        ? " months"
                        : unit === "$"
                          ? " $"
                          : ""}
                    </b>
                  </label>

                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={val}
                    onChange={(e) => setter(Number(e.target.value))}
                  />
                </div>
              )
            )}
          </div>

          <div className="play-chart">
            <div className="section-meta">
              ILLUSTRATIVE RISK INDEX
            </div>

            <div className="score">
              {score}
              <small> / 100</small>
            </div>

            <div className="score-track">
              <div style={{ width: `${score}%` }} />
            </div>

            <p>
              {score > 65
                ? "Higher illustrative risk range"
                : score > 38
                  ? "Moderate illustrative risk range"
                  : "Lower illustrative risk range"}
            </p>

            <span className="section-meta">NOT A REAL MODEL</span>
          </div>
        </div>
      ) : (
        <div className="play-content">
          <div>
            <div className="eyebrow">THRESHOLD EXPLORER</div>
            <h3>Classification trade-offs.</h3>
            <p>
              Adjust a hypothetical threshold to explore how false positives
              and false negatives shift. All counts are synthetic.
            </p>

            <div className="control">
              <label>
                Decision threshold <b>{threshold}%</b>
              </label>

              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="play-chart">
            <div className="section-meta">
              ILLUSTRATIVE CONFUSION MATRIX
            </div>

            <div className="matrix">
              {confusionMatrix.map(([v, l]) => (
                <div className="matrix-cell" key={l}>
                  <strong>{v}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>

            <p>Illustrative total: 70 examples</p>
          </div>
        </div>
      )}
    </div>
  );
}

function GithubShowcase() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<
    "loading" | "ok" | "empty" | "error"
  >("loading");

  useEffect(() => {
    let alive = true;

    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw Error("GitHub request failed");
        return r.json() as Promise<GithubResponse>;
      })
      .then((data) => {
        if (alive) {
          const repositories = Array.isArray(data.repositories)
            ? data.repositories
            : [];

          setRepos(repositories);
          setStatus(repositories.length ? "ok" : "empty");
        }
      })
      .catch(() => {
        if (alive) setStatus("error");
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="repo-section">
      <div className="eyebrow">OPEN SOURCE / LIVE FEED</div>
      <h3>From the GitHub workspace</h3>

      <p className="muted">
        Public repository metadata fetched from GitHub.
        Repository-to-project matching still needs verification.
      </p>

      {status === "loading" ? (
        <p>Loading public repository metadata…</p>
      ) : status === "error" ? (
        <p>
          GitHub is temporarily unavailable.{" "}
          <a href={profile.github}>Browse the profile directly ↗</a>
        </p>
      ) : status === "empty" ? (
        <p>No public repositories returned by the API.</p>
      ) : (
        <div className="github-list">
          {repos.slice(0, 6).map((r) => (
            <article className="repo" key={r.html_url}>
              <h4>{r.name}</h4>

              <p>
                {r.description || "No public description provided."}
              </p>

              <div className="repo-meta">
                <span>{r.language || "Unspecified"}</span>
                <span>★ {r.stargazers_count}</span>
                <span>⑂ {r.forks_count}</span>
              </div>

              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
              >
                Open repository <ArrowUpRight size={12} />
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState("home");
  const [skill, setSkill] = useState("Programming");
  const [filter, setFilter] = useState("All");
  const [scroll, setScroll] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const shown = useMemo(
    () => projects.filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  const selected =
    skillGroups.find((g) => g.name === skill) || skillGroups[0];

  useEffect(() => {
    const onScroll = () => {
      setScroll(
        window.scrollY /
          Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          )
      );

      for (const id of [
        "home",
        "about",
        "expertise",
        "projects",
        "experience",
        "contact",
      ]) {
        const el = document.getElementById(id);

        if (el && el.getBoundingClientRect().top < 180) {
          setActive(id);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const d = await r.json();

      if (!r.ok) throw Error(d.error || "Message could not be sent.");

      setFormStatus(d.message || "Message sent.");
      form.reset();
    } catch (err) {
      setFormStatus(
        err instanceof Error
          ? err.message
          : "Unable to send. Please email directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const nav = [
    ["Home", "home"],
    ["About", "about"],
    ["Expertise", "expertise"],
    ["Projects", "projects"],
    ["Experience", "experience"],
    ["Contact", "contact"],
  ];

  return (
    <>
      <div
        className="progress"
        style={{ transform: `scaleX(${scroll})` }}
      />

      <nav className="nav">
        <a
          href="#home"
          className="wordmark"
          onClick={() => setMobile(false)}
        >
          <span className="mark">JA</span>
          <span>
            jeremiah<span className="cyan">.</span>
          </span>
        </a>

        <div className="navlinks">
          {nav.map(([l, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <a className="button button-quiet" href="/resume.pdf" download>
            <FileDown size={14} /> Resume
          </a>
        </div>

        <div className="nav-mobile">
          <a href="/resume.pdf" download aria-label="Download resume">
            <FileDown size={18} />
          </a>

          <button
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle navigation"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobile && (
        <div className="mobile-panel">
          {nav.map(([l, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobile(false)}
            >
              {l}
            </a>
          ))}
          <a href="/resume.pdf" download>
            Download resume ↓
          </a>
        </div>
      )}

      <main>
        <section className="hero" id="home">
          <div className="wrap hero-grid">
            <div>
              <div className="location">
                <i /> <MapPin size={12} /> AKURE, NIGERIA{" "}
                <span>·</span> OPEN TO OPPORTUNITIES
              </div>

              <h1>
                Building
                <br />
                <span className="gradient-text">Intelligence</span>
                <br />
                From Data<span className="cyan">.</span>
              </h1>

              <div className="eyebrow">
                MACHINE LEARNING · DATA SCIENCE · COMPUTER VISION & NLP
              </div>

              <p className="intro">{profile.intro}</p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my work <ArrowDownRight size={15} />
                </a>
                <a className="button button-quiet" href="#contact">
                  Let’s connect <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={15} /> GitHub ↗
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Globe2 size={15} /> LinkedIn ↗
                </a>
                <a href={`mailto:${profile.email}`}>
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>

            <NetworkArt />
          </div>

          <a className="scroll-hint" href="#about">
            SCROLL TO EXPLORE
          </a>
        </section>

        <section className="section section-rule" id="about">
          <div className="wrap">
            <div className="about-grid">
              <div className="section-head">
                <div className="eyebrow">01 / ABOUT</div>
                <h2>
                  Curiosity in.
                  <br />
                  <span className="gradient-text">Useful systems out.</span>
                </h2>
                <p className="lead">
                  Turning messy data and real-world questions into practical,
                  testable machine-learning workflows.
                </p>
              </div>

              <div>
                <p className="lead small-lead">{profile.summary}</p>

                <div className="about-note">
                  <p>
                    <strong>My approach</strong> is end-to-end: understand the
                    problem, explore and prepare the data, engineer useful
                    features, train and evaluate models, then communicate what
                    the results mean through usable applications.
                  </p>
                  <p>
                    Predictive machine learning, computer vision, NLP, and
                    data analytics—with a focus on making technical outputs
                    easier to inspect and use.
                  </p>
                </div>
              </div>
            </div>

            <div className="workflow">
              {[
                "Data",
                "Explore",
                "Feature engineering",
                "Model",
                "Evaluate",
                "Deploy",
              ].map((s, i) => (
                <div className="workflow-step" key={s}>
                  <span className="step-num">0{i + 1} / PIPELINE</span>
                  <span className="step-name">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="expertise">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">02 / TECHNICAL EXPERTISE</div>
              <h2>
                The tools behind
                <br />
                <span className="gradient-text">the thinking.</span>
              </h2>
              <p className="lead">
                A practical toolkit for data preparation, predictive modelling,
                intelligent applications, and visual analysis.
              </p>
            </div>

            <div className="skills-layout">
              <div className="skill-tabs">
                {skillGroups.map((g) => (
                  <button
                    key={g.name}
                    className={`skill-tab ${skill === g.name ? "active" : ""}`}
                    onClick={() => setSkill(g.name)}
                  >
                    {g.name}
                  </button>
                ))}
              </div>

              <div className="skill-panel">
                <div className="section-meta">
                  CAPABILITY GROUP /{" "}
                  {String(
                    skillGroups.findIndex((g) => g.name === skill) + 1
                  ).padStart(2, "0")}
                </div>

                <h3>{selected.name}</h3>

                <p className="muted">
                  Technologies and methods listed in my CV. Familiarity varies
                  by tool and project context.
                </p>

                <div className="chips">
                  {selected.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <Code2 className="skill-watermark" size={65} />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-rule" id="projects">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">03 / SELECTED PROJECTS</div>
              <h2>
                Built to answer
                <br />
                <span className="gradient-text">real questions.</span>
              </h2>
              <p className="lead">
                Applied machine learning, computer vision, and customer
                analytics. Descriptions are based on the CV; repository-specific
                evidence is still being verified.
              </p>
            </div>

            <div className="project-toolbar">
              <div className="filters">
                {filters.map((f) => (
                  <button
                    key={f}
                    className={`filter ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <span className="section-meta">
                {String(shown.length).padStart(2, "0")} PROJECTS SHOWN
              </span>
            </div>

            <div className="project-list">
              {shown.map((p) => (
                <article className="project-card" key={p.slug}>
                  <Visual kind={p.visual} />

                  <div className="project-body">
                    <div className="project-category">{p.eyebrow}</div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    {p.metric && (
                      <div className="metric">
                        <strong>{p.metric}</strong>
                        <span>{p.metricLabel}</span>
                      </div>
                    )}

                    <div className="project-tech">
                      {p.technologies.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>

                    <div className="project-foot">
                      <a className="project-link" href={`/projects/${p.slug}`}>
                        Explore case study <ArrowRight size={14} />
                      </a>
                      <span className="section-meta">CASE STUDY ↗</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <GithubShowcase />
          </div>
        </section>

        <section className="section" id="playground">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">04 / INSIDE THE MODEL</div>
              <h2>
                ML, made <span className="gradient-text">tangible.</span>
              </h2>
              <p className="lead">
                Interactive explainers for model behaviour. Educational
                simulations—not live inference from the projects above.
              </p>
            </div>

            <Playground />
          </div>
        </section>

        <section className="section section-rule" id="experience">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">05 / EXPERIENCE</div>
              <h2>
                Learning by
                <br />
                <span className="gradient-text">building.</span>
              </h2>
              <p className="lead">
                Professional experience across freelance machine-learning work
                and data analysis.
              </p>
            </div>

            <div className="timeline">
              {experience.map((e) => (
                <article className="timeline-item" key={e.role}>
                  <div className="timeline-top">
                    <div>
                      <h3>{e.role}</h3>
                      <div className="timeline-org">{e.org}</div>
                    </div>
                    <div className="timeline-date">{e.date}</div>
                  </div>

                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="credentials-grid">
              <div className="credential-panel">
                <div className="eyebrow">EDUCATION</div>
                <h3>{education.qualification}</h3>

                <div className="credential-row">
                  <div className="credential-icon">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <strong>{education.institution}</strong>
                    <span>
                      {education.location} · {education.date}
                    </span>
                    <span>Coursework: {education.coursework}</span>
                  </div>
                </div>
              </div>

              <div className="credential-panel">
                <div className="eyebrow">CERTIFICATIONS</div>
                <h3>Learning in progress.</h3>

                {certifications.map((c) => (
                  <div className="credential-row" key={c}>
                    <div className="credential-icon">
                      <Check size={15} />
                    </div>
                    <div>
                      <strong>{c.split(" · ")[0]}</strong>
                      <span>
                        {c.includes("In progress")
                          ? "In progress"
                          : c.split(" · ").slice(1).join(" · ") ||
                            "Listed on CV"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="credential-panel community-panel">
              <div className="eyebrow">COMMUNITY & CONTRIBUTIONS</div>
              <h3>Share knowledge. Build together.</h3>

              {community.map((c) => (
                <div className="credential-row" key={c}>
                  <div className="credential-icon">
                    <Network size={16} />
                  </div>
                  <div>
                    <strong>{c.split(";")[0]}</strong>
                    <span>
                      {c.includes(";")
                        ? c.split(";")[1]
                        : "Community contribution listed on CV"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="wrap">
            <div className="contact-panel">
              <div className="contact-grid">
                <div>
                  <div className="eyebrow">06 / CONTACT</div>
                  <h2>
                    Have a problem
                    <br />
                    worth <span className="gradient-text">solving?</span>
                  </h2>

                  <p className="lead small-lead">
                    Whether you’re building an intelligent product, exploring
                    predictive analytics, or looking for a machine-learning
                    collaborator, I’d love to hear about it.
                  </p>

                  <div className="credential-row direct-email">
                    <div className="credential-icon">
                      <Mail size={16} />
                    </div>
                    <div>
                      <strong>Email me directly</strong>
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    </div>
                  </div>

                  <div className="socials">
                    <a href={profile.github} target="_blank" rel="noreferrer">
                      <Github size={15} /> GitHub ↗
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe2 size={15} /> LinkedIn ↗
                    </a>
                  </div>
                </div>

                <div>
                  <form className="contact-form" onSubmit={submit}>
                    <div className="field">
                      <label htmlFor="name">Your name</label>
                      <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        minLength={2}
                        maxLength={100}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="email">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        maxLength={254}
                      />
                    </div>

                    <div className="field full">
                      <label htmlFor="subject">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        placeholder="What would you like to discuss?"
                        required
                        minLength={3}
                        maxLength={150}
                      />
                    </div>

                    <div className="field full">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="A little context about the project or opportunity…"
                        rows={5}
                        required
                        minLength={10}
                        maxLength={5000}
                      />
                    </div>

                    <div className="field full honeypot">
                      <label htmlFor="website">Leave empty</label>
                      <input
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="field full">
                      <button
                        className="button button-primary"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Sending…" : "Send message"}
                        <Send size={14} />
                      </button>

                      {formStatus && (
                        <p className="form-status" role="status">
                          {formStatus}
                        </p>
                      )}

                      <p className="form-note">
                        Email delivery requires server-side Resend
                        configuration. If it isn’t configured, use the direct
                        email link; this form won’t claim an undelivered
                        message was sent.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <footer className="footer">
              <a className="wordmark" href="#home">
                <span className="mark">JA</span>
                <span>
                  jeremiah<span className="cyan">.</span>
                </span>
              </a>

              <span>
                © {new Date().getFullYear()} Jeremiah Adebusoye · Built with
                curiosity.
              </span>

              <div className="footer-links">
                <a href="#home">Back to top ↑</a>
                <a href="/resume.pdf" download>
                  Resume
                </a>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
