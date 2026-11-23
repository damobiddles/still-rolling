// Zero-dependency static build: reads content/program.mjs, writes dist/.
import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import * as c from "./content/program.mjs";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const tags = (arr) => (arr && arr.length ? ` data-for="${arr.join(" ")}"` : "");
const nigLabel = Object.fromEntries(c.niggles.map((n) => [n.id, n.label]));

const exercise = (ex, i) => `
  <li class="ex"${tags(ex.for || Object.keys(ex.swaps || {}))}>
    <div class="ex-num" aria-hidden="true">${i + 1}</div>
    <div class="ex-body">
      <div class="ex-head">
        <h4>${esc(ex.name)}</h4>
        <span class="dose">${esc(ex.dose)}</span>
      </div>
      <p class="why"><span class="lbl">For the mats</span>${esc(ex.why)}</p>
      ${ex.cue ? `<p class="cue">${esc(ex.cue)}</p>` : ""}
      <p class="easier"><span class="lbl">Easier option</span>${esc(ex.easier)}</p>
      ${Object.entries(ex.swaps || {})
        .map(
          ([k, v]) =>
            `<p class="swap" data-niggle="${k}"><span class="pill pill-${k}">${esc(nigLabel[k])}</span>${esc(v)}</p>`
        )
        .join("")}
    </div>
  </li>`;

const session = (s) => `
  <article class="session" id="session-${s.id}">
    <header class="session-head">
      <p class="eyebrow">${esc(s.day)} · about ${s.minutes} min</p>
      <h3>${esc(s.name)}</h3>
      <p class="muted">${esc(s.focus)}</p>
    </header>
    <ol class="ex-list">${s.exercises.map(exercise).join("")}</ol>
  </article>`;

const rule = (r, i) => `
  <li class="rule"${r.niggle ? ` data-for="${r.niggle}"` : ""}>
    <span class="rule-num">${i + 1}</span>
    <div>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.body)}</p>
      ${
        r.lights
          ? `<div class="lights">${r.lights
              .map(
                (l) =>
                  `<div class="light light-${l.colour}"><span class="dot"></span><strong>${esc(l.range)}</strong><span>${esc(l.text)}</span></div>`
              )
              .join("")}</div>`
          : ""
      }
    </div>
  </li>`;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.site.name)} · ${esc(c.site.tagline)}</title>
<meta name="description" content="${esc(c.site.description)}">
<meta property="og:title" content="${esc(c.site.name)}: ${esc(c.site.tagline)}">
<meta property="og:description" content="${esc(c.site.description)}">
<meta name="theme-color" content="#16232e">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Fraunces:opsz,wght@9..144,600;9..144,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to the plan</a>

<header class="top">
  <div class="wrap top-inner">
    <a class="brand" href="#top" aria-label="${esc(c.site.name)} home">
      <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="13" width="28" height="6" rx="2"/><rect x="11" y="10" width="10" height="12" rx="1.5" class="knot"/></svg>
      <span>${esc(c.site.name)}</span>
    </a>
    <nav aria-label="Sections">
      <a href="#week">Week</a><a href="#sessions">Sessions</a><a href="#food">Food</a><a href="#head">Head</a><a href="#log">Log</a>
    </nav>
  </div>
</header>

<main id="main">
<section class="hero" id="top">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">${esc(c.site.tagline)}</p>
      <h1>Stay on the mats<br>past fifty.</h1>
      <p class="lead">Two short strength sessions at home, ten minutes of prep before class, and a Sunday walk. Built around your training, not instead of it, and gentle on the hip and shoulder that have been grumbling.</p>
      <div class="cta">
        <a class="btn btn-primary" href="#niggles">Start week 1</a>
        <a class="btn btn-ghost" href="#sessions">See the sessions</a>
      </div>
    </div>
    <dl class="stats">
      <div><dt>Strength</dt><dd>2 × 30<small>min a week</small></dd></div>
      <div><dt>Before class</dt><dd>10<small>min mat prep</small></dd></div>
      <div><dt>Kit</dt><dd>£0–10<small>chair, rucksack, band</small></dd></div>
    </dl>
  </div>
</section>

<section class="flag" aria-labelledby="flag-h">
  <div class="wrap flag-inner">
    <div class="flag-icon" aria-hidden="true">!</div>
    <div>
      <h2 id="flag-h">Numbness or tingling? Get it checked first.</h2>
      <p>${esc(c.redFlags.intro)}</p>
      <p class="urgent">${esc(c.redFlags.urgent)}</p>
    </div>
  </div>
</section>

<section class="band" id="niggles" aria-labelledby="nig-h">
  <div class="wrap">
    <p class="step">Step 1</p>
    <h2 id="nig-h">What's grumbling?</h2>
    <p class="muted">Pick any that apply. The plan highlights the exercises and tweaks that matter for you. It's saved on this device only.</p>
    <div class="chips" role="group" aria-label="Injuries">
      ${c.niggles
        .map(
          (n) => `<button type="button" class="chip" data-niggle="${n.id}" aria-pressed="false">
        <span class="chip-tick" aria-hidden="true"></span>
        <span><strong>${esc(n.label)}</strong><small>${esc(n.detail)}</small></span>
      </button>`
        )
        .join("")}
    </div>
    <p class="soon">Coming later: ${c.comingSoon.map(esc).join(", ")}.</p>
  </div>
</section>

<section id="week" aria-labelledby="week-h">
  <div class="wrap">
    <p class="step">Step 2</p>
    <h2 id="week-h">Your week</h2>
    <p class="muted">Four mat days as the anchor, strength slotted between them. Swap days around your own timetable; just keep a mat day or rest day between strength days.</p>
    <ol class="week">
      ${c.week
        .map(
          (d) => `<li class="day day-${d.kind}">
        <span class="day-name">${d.day}</span>
        <strong>${esc(d.main)}</strong>
        <span class="day-extra">${esc(d.extra)}</span>
        <span class="day-time">${esc(d.time)}</span>
      </li>`
        )
        .join("")}
    </ol>
    <div class="kit">
      <h3>What you need</h3>
      <ul>${c.kit.map((k) => `<li>${esc(k)}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="band" id="rules" aria-labelledby="rules-h">
  <div class="wrap">
    <p class="step">Step 3</p>
    <h2 id="rules-h">Five rules that keep you training</h2>
    <ol class="rules">${c.rules.map(rule).join("")}</ol>
  </div>
</section>

<section id="prep" aria-labelledby="prep-h">
  <div class="wrap prep-grid">
    <div>
      <p class="step">Step 4</p>
      <h2 id="prep-h">Mat prep</h2>
      <p class="muted">${esc(c.matPrep.intro)}</p>
      <button type="button" class="btn btn-ghost btn-small" data-reset="prep">Clear ticks</button>
    </div>
    <ul class="checklist" data-store="prep">
      ${c.matPrep.moves
        .map(
          (m, i) => `<li${tags(m.for)}><label><input type="checkbox" data-key="prep-${i}"><span class="box" aria-hidden="true"></span><span class="move">${esc(m.name)}</span><span class="dose">${esc(m.dose)}</span></label></li>`
        )
        .join("")}
    </ul>
  </div>
</section>

<section class="band" id="sessions" aria-labelledby="sess-h">
  <div class="wrap">
    <p class="step">Step 5</p>
    <h2 id="sess-h">The two strength sessions</h2>
    <ul class="notes">${c.sessionNotes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
    <div class="sessions">${c.sessions.map(session).join("")}</div>

    <h3 class="sub">How it builds</h3>
    <ol class="prog">
      ${c.progression.map((p) => `<li><strong>${esc(p.week)}</strong><span>${esc(p.text)}</span></li>`).join("")}
    </ol>
  </div>
</section>

<section id="food" aria-labelledby="food-h">
  <div class="wrap">
    <h2 id="food-h">Food, kept simple</h2>
    <p class="lead-s">${esc(c.food.intro)}</p>
    <div class="cards">
      ${c.food.items.map((f) => `<div class="card"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join("")}
    </div>
    <p class="homework"><strong>Week 1 homework:</strong> ${esc(c.food.homework.replace(/^This week, j/, "J"))}</p>
  </div>
</section>

<section class="band" id="together" aria-labelledby="tog-h">
  <div class="wrap">
    <h2 id="tog-h">Do it with other people</h2>
    <p class="muted">Most of us train better with company. The plan leans on that.</p>
    <div class="cards cards-2">
      ${c.social.map((s) => `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("")}
    </div>
  </div>
</section>

<section id="head" aria-labelledby="head-h">
  <div class="wrap">
    <h2 id="head-h">Head as well as body</h2>
    <p class="lead-s">${esc(c.head.intro)}</p>
    <ul class="evidence">
      ${c.head.evidence.map((e) => `<li><p>${esc(e.text)}</p><a href="${e.link.href}" rel="noopener">${esc(e.link.label)}</a></li>`).join("")}
    </ul>
    <div class="checkin">
      <div>
        <h3>The Sunday check-in</h3>
        <p>${esc(c.head.checkinText)}</p>
      </div>
      <ul class="scores">${c.head.checkin.map((x) => `<li><span>${x}</span><span class="scale" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></li>`).join("")}</ul>
    </div>
    <p class="crisis">Having a really bad time? You don't need to wait for an appointment. <strong>Samaritans: <a href="tel:116123">116 123</a></strong>, free, day or night.</p>
  </div>
</section>

<section class="band" id="log" aria-labelledby="log-h">
  <div class="wrap">
    <h2 id="log-h">Week 1 log</h2>
    <p class="muted">Pain scores are 0 (none) to 10 (worst). It saves on this device as you type. Print it if you prefer paper.</p>
    <div class="log-wrap">
      <table class="log" data-store="log">
        <thead><tr><th scope="col">Day</th><th scope="col">Done</th><th scope="col" data-joint="0">Joint 1 pain</th><th scope="col" data-joint="1">Joint 2 pain</th><th scope="col">Sleep (h)</th><th scope="col">Notes</th></tr></thead>
        <tbody>
          ${c.week
            .map(
              (d, i) => `<tr>
            <th scope="row">${days[i]}<small>${esc(d.main)}</small></th>
            <td><input type="checkbox" aria-label="${days[i]} done" data-key="log-${i}-done"></td>
            <td><input type="number" min="0" max="10" inputmode="numeric" aria-label="${days[i]} joint 1 pain" data-key="log-${i}-j1"></td>
            <td><input type="number" min="0" max="10" inputmode="numeric" aria-label="${days[i]} joint 2 pain" data-key="log-${i}-j2"></td>
            <td><input type="number" min="0" max="14" step="0.5" inputmode="decimal" aria-label="${days[i]} sleep hours" data-key="log-${i}-sleep"></td>
            <td><input type="text" aria-label="${days[i]} notes" data-key="log-${i}-notes"></td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="log-actions">
      <button type="button" class="btn btn-primary btn-small" onclick="window.print()">Print</button>
      <button type="button" class="btn btn-ghost btn-small" data-reset="log">Start a new week</button>
    </div>
  </div>
</section>

<section id="resources" aria-labelledby="res-h">
  <div class="wrap">
    <h2 id="res-h">Worth your time</h2>
    <p class="muted">A short list. Each is free or cheap, from a credible source, and suits people in midlife. UK-based. Start with one.</p>
    <ul class="res">
      ${c.resources
        .map(
          (r) => `<li><a href="${r.href}" rel="noopener"><span class="res-type">${esc(r.type)} · ${esc(r.cost)}</span><strong>${esc(r.name)}</strong><span>${esc(r.why)}</span></a></li>`
        )
        .join("")}
    </ul>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap foot-inner">
    <p><strong>${esc(c.site.name)}</strong> is general guidance, not medical advice. If something hurts in a way that worries you, see a GP or physio. Stop any exercise that gives sharp pain or numbness.</p>
    <p class="muted">Updated ${c.site.updated}. Free to use and share.</p>
  </div>
</footer>
<script src="app.js" defer></script>
</body>
</html>`;

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", html);
for (const f of ["styles.css", "app.js", "favicon.svg"]) copyFileSync(`src/${f}`, `dist/${f}`);
console.log("Built dist/index.html");
