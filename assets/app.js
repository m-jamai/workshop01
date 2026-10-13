/* Workshop 01 — site logic. No need to edit this file to add content. */

/* Later: replace with the YouTube Data API or the channel RSS feed,
   then merge the details above by youtubeId or slug. */
async function getVideos() { return VIDEOS.slice().sort((a, b) => b.date.localeCompare(a.date)); }

/* ============================================================ */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const watch = v => v.youtubeId ? `https://www.youtube.com/watch?v=${encodeURIComponent(v.youtubeId)}` : CONFIG.youtube;
const list = (v, k) => Array.isArray(v[k]) ? v[k] : [];
const count = v => SECTIONS.reduce((n, s) => n + list(v, s.key).length, 0);
const host = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const no = v => String(VIDS.length - VIDS.indexOf(v)).padStart(3, "0");
function ftype(it) {
  const m = it.label.match(/\.([a-z0-9]{1,5})$/i); if (m) return m[1].toUpperCase();
  const h = host(it.href);
  return h.includes("github") ? "REPO" : "WEB";
}
const PLAY = s => `<svg width="${s}" height="${s}" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 2.8v10.4L13.4 8z" fill="currentColor"/></svg>`;
let VIDS = [], filter = "all";

const plate = v => (CONFIG.useYouTubeMedia && v.youtubeId)
  ? `<img src="https://i.ytimg.com/vi/${esc(v.youtubeId)}/hqdefault.jpg" alt="" loading="lazy">`
  : `<span class="plate ${v.kind}"><span class="no">${no(v)}</span><span class="dur">${esc(v.duration)}</span></span>`;

function Row(v) {
  const n = count(v);
  return `<li class="row">
    <span class="r-thumb">${plate(v)}</span>
    <div class="r-body">
      <span class="type ${v.kind}">${KINDS[v.kind].label}</span>
      <h2 class="r-title"><a href="#videos-${esc(v.slug)}">${esc(v.title)}</a></h2>
      <p class="r-desc">${esc(v.description)}</p>
    </div>
    <div class="r-side">
      <dl class="meta"><dd>${fmt(v.date)}</dd><dd>${esc(v.duration)}</dd></dl>
      <div class="r-links">
        ${n ? `<a class="files" href="#videos-${esc(v.slug)}">${n} file${n > 1 ? "s" : ""}</a>` : ""}
        <a href="${esc(watch(v))}" target="_blank" rel="noopener">YouTube ↗</a>
      </div>
    </div>
  </li>`;
}

function Home() {
  const shown = VIDS.filter(v => filter === "all" || v.kind === filter);
  const n = k => VIDS.filter(v => k === "all" || v.kind === k).length;
  const tab = (k, label) => `<button type="button" data-filter="${k}" aria-pressed="${filter === k}">${label} <span class="n">${n(k)}</span></button>`;
  return `<div class="wrap">
    <header class="phead with-tabs">
      <h1>Videos</h1>
      <p>Engineering courses and technical discussions in mechatronics. Each video has a page with its notes, code and project files.</p>
      <div class="tabs" role="group" aria-label="Filter videos">${tab("all", "All")}${tab("course", KINDS.course.plural)}${tab("disc", KINDS.disc.plural)}</div>
    </header>
    <ul class="index">${shown.map(Row).join("")}</ul>
  </div>`;
}

function VideoPage(v) {
  const i = VIDS.indexOf(v), newer = VIDS[i - 1], older = VIDS[i + 1];
  const player = CONFIG.useYouTubeMedia && v.youtubeId
    ? `<div class="player"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.youtubeId)}" title="${esc(v.title)}" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<a class="player" href="${esc(watch(v))}" target="_blank" rel="noopener" aria-label="Watch ${esc(v.title)} on YouTube"><span class="plate ${v.kind}"><span class="pb">${PLAY(22)}</span><span class="pt">Watch on YouTube</span></span></a>`;
  const notes = list(v, "notes").length ? `<section class="block prose"><h2>Notes</h2>${v.notes.map(p => `<p>${esc(p)}</p>`).join("")}</section>` : "";
  const points = list(v, "points").length ? `<section class="block"><h2>${KINDS[v.kind].points}</h2><ol class="points">${v.points.map(p => `<li>${esc(p)}</li>`).join("")}</ol></section>` : "";
  const secs = SECTIONS.filter(s => list(v, s.key).length).map(s => `
    <section class="block"><h2>${s.title}<span class="meta">${list(v, s.key).length}</span></h2>
      <ul class="files">${list(v, s.key).map(it => `<li><a href="${esc(it.href)}" target="_blank" rel="noopener">
        <span class="ft">${esc(ftype(it))}</span>
        <span><span class="fn">${esc(it.label)}</span><span class="fd">${esc(it.note ? it.note + " · " + host(it.href) : host(it.href))}</span></span>
        <span class="fa">${s.key === "documents" || s.key === "files" ? "Download" : "Open"} ↗</span>
      </a></li>`).join("")}</ul></section>`).join("");
  const pagerLink = (x, cls, lab) => x ? `<a class="${cls}" href="#videos-${esc(x.slug)}"><span class="meta">${lab}</span><strong>${esc(x.title)}</strong></a>` : "<span></span>";
  return `<div class="wrap">
    <nav class="crumb" aria-label="Breadcrumb"><a href="#home">Videos</a><span>/</span><span>${no(v)}</span></nav>
    <header class="vhead">
      <span class="type ${v.kind}">${KINDS[v.kind].label}</span>
      <h1>${esc(v.title)}</h1>
      <p class="lead">${esc(v.description)}</p>
    </header>
    <div class="vgrid">
      <div style="min-width:0">
        ${player}
        ${points}${notes}
        ${secs || `<section class="block"><h2>Resources</h2><p class="empty">No files have been published for this video yet.</p></section>`}
        <nav class="pager" aria-label="Other videos">${pagerLink(older, "", "← Previous")}${pagerLink(newer, "nx", "Next →")}</nav>
      </div>
      <aside class="side">
        <div>
          <h3>Details</h3>
          <dl>
            <div><dt>Number</dt><dd class="meta" style="color:var(--fg)">${no(v)}</dd></div>
            <div><dt>Type</dt><dd>${KINDS[v.kind].label}</dd></div>
            <div><dt>Published</dt><dd>${fmt(v.date)}</dd></div>
            <div><dt>Length</dt><dd>${esc(v.duration)}</dd></div>
            ${v.level ? `<div><dt>Level</dt><dd>${esc(v.level)}</dd></div>` : ""}
            ${list(v, "tools").length ? `<div><dt>Tools</dt><dd>${v.tools.map(esc).join("<br>")}</dd></div>` : ""}
          </dl>
        </div>
        <div style="display:grid;gap:8px">
          <a class="btn" href="${esc(watch(v))}" target="_blank" rel="noopener">Watch on YouTube</a>
          <button class="btn ghost" type="button" data-copy>Copy page link</button>
        </div>
        <div>
          <h3>Shared on</h3>
          <div class="plinks">${CONFIG.platforms.map(p => `<a href="${esc(p.url)}" target="_blank" rel="noopener"><span>${esc(p.name)}</span><span>↗</span></a>`).join("")}</div>
        </div>
      </aside>
    </div>
  </div>`;
}

function Resources() {
  const col = k => `<section class="${k}">
    <h2>${KINDS[k].plural}</h2>
    <p class="k">${KINDS[k].intro}</p>
    <ul>${VIDS.filter(v => v.kind === k).map(v => `<li><a href="#videos-${esc(v.slug)}"><span class="meta">${no(v)}</span><span class="t">${esc(v.title)}</span><span class="meta">${count(v) ? count(v) + (count(v) > 1 ? " files" : " file") : "—"}</span></a></li>`).join("")}</ul>
  </section>`;
  return `<div class="wrap">
    <header class="phead">
      <h1>Resources</h1>
      <p>Notes, source code, project files and references are published on each video's page. Choose a course or a discussion below.</p>
      <div class="platforms">${CONFIG.platforms.map(p => `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)} ↗</a>`).join("")}</div>
    </header>
    <div class="rx">${col("course")}${col("disc")}</div>
  </div>`;
}

const PAGES = {
  about: ["About", `
    <p>Workshop 01 is a video archive maintained by a mechatronics engineer. Videos are published on YouTube, and this site keeps each one together with its notes, code and project files.</p>
    <h2>Courses</h2><p>${KINDS.course.intro} Each course lists its objectives, the expected level and the tools used.</p>
    <h2>Discussions</h2><p>${KINDS.disc.intro} They follow practical questions as they come up in real work.</p>
    <h2>Resources</h2><p>Files are shared through GitHub, Google Drive and other platforms, and linked from the page of the video they belong to.</p>`],
  terms: ["Terms of Use", `
    <p class="note">Draft text. Review it before publishing the site.</p>
    <h2>Use of the content</h2><p>Videos, notes and files on Workshop 01 are provided for personal and educational use. They may not be republished as someone else's work.</p>
    <h2>Source code</h2><p>Code in the linked repositories is covered by the licence file in each repository.</p>
    <h2>No warranty</h2><p>Projects involve electricity, motors and tools. All material is provided as is, without warranty. You are responsible for working safely and verifying designs before building them.</p>
    <h2>External links</h2><p>This site links to YouTube, GitHub, Google Drive and other websites, whose own terms apply.</p>`],
  privacy: ["Privacy Policy", `
    <p class="note">Draft text. Review it before publishing the site.</p>
    <h2>Data collected</h2><p>Workshop 01 has no accounts, forms or newsletter, and does not collect personal data directly.</p>
    <h2>Embedded videos</h2><p>Videos are embedded from YouTube in privacy-enhanced mode. YouTube may set cookies when a video is played. Google's privacy policy applies.</p>
    <h2>Hosting</h2><p>The hosting provider may keep standard server logs, such as IP address and pages visited, for security and maintenance.</p>
    <h2>Contact</h2><p>Privacy questions can be sent through the YouTube channel.</p>`]
};

/* Router: #videos-name, #resources, #about, #terms, #privacy
   (on your own host: /videos/name, /resources, /about, /terms, /privacy). */
function route() {
  const h = location.hash.slice(1);
  let html, nav = "home";
  const v = h.startsWith("videos-") && VIDS.find(x => x.slug === h.slice(7));
  if (v) { html = VideoPage(v); document.title = v.title + " · Workshop 01"; }
  else if (h === "resources") { html = Resources(); nav = h; document.title = "Resources · Workshop 01"; }
  else if (PAGES[h]) { const [t, body] = PAGES[h]; html = `<div class="wrap"><header class="phead"><h1>${t}</h1></header><article class="doc">${body}</article></div>`; nav = h; document.title = t + " · Workshop 01"; }
  else { html = Home(); document.title = "Workshop 01"; }
  $("#app").innerHTML = html;
  document.querySelectorAll("[data-nav]").forEach(a => a.dataset.nav === nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  closeMenu();
  window.scrollTo(0, 0);
}

const top_ = $("#top"), burger = $("#burger");
function closeMenu() { top_.removeAttribute("data-open"); burger.setAttribute("aria-expanded", "false"); }
burger.addEventListener("click", () => { const o = !top_.hasAttribute("data-open"); top_.toggleAttribute("data-open", o); burger.setAttribute("aria-expanded", String(o)); });

$("#app").addEventListener("click", e => {
  const f = e.target.closest("[data-filter]");
  if (f) { filter = f.dataset.filter; $("#app").innerHTML = Home(); return; }
  const c = e.target.closest("[data-copy]");
  if (c) {
    const reset = () => setTimeout(() => c.textContent = "Copy page link", 1800);
    try { navigator.clipboard.writeText(location.href).then(() => { c.textContent = "Link copied"; reset(); }, () => { c.textContent = location.href; }); }
    catch { c.textContent = location.href; }
  }
});

$("#ext").innerHTML = CONFIG.platforms.filter(p => p.header).map(p => `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)} ↗</a>`).join("") +
  `<a href="${esc(CONFIG.youtube)}" target="_blank" rel="noopener">YouTube ↗</a>`;
$("#foot-ext").innerHTML = [{ name: "YouTube", url: CONFIG.youtube }, ...CONFIG.platforms].map(p => `<li><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)} ↗</a></li>`).join("");
$("#yr").textContent = new Date().getFullYear();

getVideos().then(v => { VIDS = v; window.addEventListener("hashchange", route); route(); });
