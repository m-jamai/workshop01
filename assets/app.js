/* MoreBit — pages and navigation. No need to edit this file to add content. */

// Shows real YouTube thumbnails for videos that have a youtubeId.
const USE_YOUTUBE_THUMBS = true;

// Later: replace with the YouTube Data API or the channel RSS feed,
// then merge resources from VIDEOS by youtubeId or slug.
async function getVideos() { return VIDEOS.slice().sort((a, b) => b.date.localeCompare(a.date)); }

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const watch = v => v.youtubeId ? `https://www.youtube.com/watch?v=${encodeURIComponent(v.youtubeId)}` : LINKS.youtube;
const res = v => Array.isArray(v.resources) ? v.resources : [];
const host = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
function tag(r) {
  const m = r.label.match(/\.([a-z0-9]{1,5})$/i);
  if (m) return m[1].toUpperCase();
  if (/\/tree\//.test(r.href)) return "DIR";
  return host(r.href).includes("github") ? "REPO" : "LINK";
}
const PLAY = `<svg width="28" height="28" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11L13.5 8z" fill="currentColor"/></svg>`;

let VIDS = [], filter = "all";

function Bar() {
  const b = (k, label) => `<button type="button" data-filter="${k}" aria-pressed="${filter === k}">${k === "all" ? "" : `<span class="dot ${k}"></span>`}${esc(label)}</button>`;
  return `<div class="bar" role="group" aria-label="Filter">${b("all", "All")}${Object.keys(KINDS).map(k => b(k, KINDS[k])).join("")}</div>`;
}

function Card(v) {
  const media = v.thumbnail
    ? `<img src="${esc(v.thumbnail)}" alt="" loading="lazy">`
    : USE_YOUTUBE_THUMBS && v.youtubeId
    ? `<img src="https://i.ytimg.com/vi/${esc(v.youtubeId)}/hqdefault.jpg" alt="" loading="lazy">`
    : `<span class="ph ${v.kind}">${PLAY}</span>`;
  return `<article class="card">
    <a class="thumb" href="${esc(watch(v))}" target="_blank" rel="noopener" aria-label="Watch ${esc(v.title)} on YouTube">${media}<span class="dur num">${esc(v.duration)}</span></a>
    <h2><a href="${esc(watch(v))}" target="_blank" rel="noopener">${esc(v.title)}</a></h2>
    <div class="meta"><span class="dot ${v.kind}" title="${esc(KINDS[v.kind])}"></span><span>${esc(KINDS[v.kind])}</span><span class="sp"></span>${res(v).length ? `<a href="#r-${esc(v.slug)}">Files</a>` : ""}</div>
  </article>`;
}

function ContentPage() {
  const shown = VIDS.filter(v => filter === "all" || v.kind === filter);
  return `<div class="wrap">${Bar()}${shown.length ? `<div class="grid">${shown.map(Card).join("")}</div>` : `<p class="empty">No videos here yet.</p>`}</div>`;
}

function ResourcesPage() {
  const withRes = VIDS.filter(v => res(v).length);
  const shown = withRes.filter(v => filter === "all" || v.kind === filter);
  const group = v => `<section class="group" id="r-${esc(v.slug)}">
    <div class="g-head">
      <span class="k"><span class="dot ${v.kind}"></span>${esc(KINDS[v.kind])}</span>
      <h2>${esc(v.title)}</h2>
      <a href="${esc(watch(v))}" target="_blank" rel="noopener">Watch ↗</a>
    </div>
    <ul class="files">${res(v).map(r => `<li><a href="${esc(r.href)}" target="_blank" rel="noopener">
      <span class="tag">${esc(tag(r))}</span>
      <span><span class="fn">${esc(r.label)}</span><span class="fd">${esc(r.note || host(r.href))}</span></span>
      <span class="go">Open ↗</span>
    </a></li>`).join("")}</ul>
  </section>`;
  return `<div class="wrap">${Bar()}<div class="res">${shown.length ? shown.map(group).join("") : `<p class="empty">No resources yet.</p>`}</div></div>`;
}

function route() {
  const h = location.hash.slice(1);
  const onRes = h === "resources" || h.startsWith("r-");
  if (h.startsWith("r-")) filter = "all";
  $("#app").innerHTML = onRes ? ResourcesPage() : ContentPage();
  document.querySelectorAll("[data-nav]").forEach(a => (a.dataset.nav === (onRes ? "resources" : "content")) ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  document.title = onRes ? "Resources · MoreBit" : "MoreBit";
  const target = h.startsWith("r-") && document.getElementById(h);
  if (target) { target.scrollIntoView(); target.classList.add("flash"); }
  else window.scrollTo(0, 0);
}

$("#app").addEventListener("click", e => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  filter = b.dataset.filter;
  const onRes = location.hash.slice(1) === "resources" || location.hash.startsWith("#r-");
  $("#app").innerHTML = onRes ? ResourcesPage() : ContentPage();
});

document.querySelectorAll("[data-link]").forEach(a => { a.href = LINKS[a.dataset.link]; });
$("#yr").textContent = new Date().getFullYear();
getVideos().then(v => { VIDS = v; window.addEventListener("hashchange", route); route(); });
