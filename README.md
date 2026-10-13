# MoreBit

A practical mechatronics learning lab: courses, experiments, tools and the files that go with each lesson.

## Design principles

- **Learn by building:** clear video-led lessons and practical project resources.
- **A confident lab identity:** deep workshop green, signal-lime accents, technical typography and editorial layouts.
- **Resources that stay manageable:** search, category filters, collapsible project groups, and Comfortable / Compact density modes.
- **Simple to maintain:** plain HTML, CSS and JavaScript. No build step, framework or dependencies.
- **Accessible and responsive:** keyboard focus styles, semantic controls, mobile layouts and reduced-motion support.

## Files

```
index.html        Header and footer
content.js        Links, categories, videos and resource links — edit this file
assets/style.css  Design system and responsive layouts
assets/app.js     Content and Resources pages, filtering and resource controls
favicon.svg       MoreBit mark
.nojekyll         Lets GitHub Pages serve files as-is
```

## Deploy on GitHub Pages

1. Create a repository, for example `morebit`.
2. Upload every file in this folder to the root of the repository, including `.nojekyll` and the `assets` folder.
3. Open **Settings → Pages**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/morebit/`.

For your own domain, add it under **Settings → Pages → Custom domain**.

## Before publishing

In `content.js`, set your real YouTube channel and GitHub links in `LINKS`, and add each video's `youtubeId`. Videos with a `youtubeId` show their real YouTube thumbnail and link to the video.

## Add a video or project

Add an entry near the top of `VIDEOS` in `content.js`:

```js
{
  slug: "my-new-project",
  kind: "course", // "course" | "topic" | "tips"
  title: "My new project",
  description: "What you will learn or build.",
  date: "2026-11-01", // YYYY-MM-DD, newest first
  duration: "12:30",
  youtubeId: "",
  thumbnail: "assets/thumbs/my-new-project.png", // optional
  resources: [
    { label: "source-code", href: "https://github.com/example/project", note: "Project repository" },
    { label: "bom.csv", href: "https://github.com/example/project/blob/main/bom.csv", note: "Bill of materials" }
  ]
}
```

A file name ending in `.pdf`, `.step`, `.stl`, `.slx`, and similar shows its type automatically. Videos without `resources` appear on the Content page, but not in the Resources library.

## Resource library controls

- **Search:** match project names, resource labels and notes.
- **Category filters:** show courses, general topics or tools and tips.
- **Comfort / Compact:** Comfortable shows file notes and open links. Compact hides secondary detail and fits more items per row on desktop.
- **Expand all / Collapse all:** open or close all currently filtered project groups.
- **Per-project disclosure:** use the chevron beside a project to show or hide its files.

All resource controls work locally in the browser; no account, API or build process is required.
