# Workshop 01

Video archive for engineering courses and technical discussions, with the files and resources for each video.

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.

## Files

```
index.html        Page skeleton (header, footer)
content.js        All the content: links, videos, resources  ← edit this one
assets/style.css  Design
assets/app.js     Pages, filters and navigation
favicon.svg       Logo icon
.nojekyll         Tells GitHub Pages to serve the files as they are
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub, for example `workshop01`.
2. Upload every file from this folder to the root of the repository, including `.nojekyll` and the `assets` folder.
   - On the website: **Add file → Upload files**, drag the files in, then **Commit changes**.
   - Or with git:
     ```
     git init
     git add .
     git commit -m "Workshop 01 website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/workshop01.git
     git push -u origin main
     ```
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
5. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/workshop01/`.

To use your own domain, add it under **Settings → Pages → Custom domain**.

## Before publishing

Open `content.js` and replace the placeholder links:

- `youtube`: your channel URL
- `platforms`: your GitHub, LinkedIn, Google Drive, Printables and GrabCAD links
- each video's `youtubeId` (the part after `watch?v=` in the YouTube URL)
- each resource `href`

Also review the draft Terms of Use and Privacy Policy texts at the bottom of `assets/app.js` (`PAGES`).

## Add a video

Copy one entry in the `VIDEOS` list in `content.js` and change the values:

```js
{
  slug: "my-new-video",           // used in the page address
  kind: "course",                 // "course" or "disc"
  title: "My New Video",
  description: "One or two sentences about the video.",
  date: "2026-11-01",             // YYYY-MM-DD, newest appears first
  duration: "18:30",
  youtubeId: "dQw4w9WgXcQ",
  level: "Beginner",              // optional
  tools: ["Arduino", "Multimeter"],  // optional
  points: ["First objective", "Second objective"],  // optional
  notes: ["A paragraph of notes."],                 // optional
  code:      [{ label: "user/repo",   href: "https://github.com/...", note: "What it contains" }],
  documents: [{ label: "Notes.pdf",   href: "https://drive.google.com/...", note: "PDF, 6 pages" }],
  files:     [{ label: "model.step",  href: "https://...", note: "CAD model" }],
  links:     [{ label: "Datasheet",   href: "https://...", note: "Manufacturer" }]
}
```

Every field marked optional, and every resource list, can be left out. Empty sections are not shown.

To rename the two kinds of video (for example "Discussion" to "Lab Notes"), change the labels in `KINDS` in `content.js`.

## Page addresses

- Home: `/`
- Video page: `/#videos-my-new-video`
- Resources: `/#resources`
- About, Terms, Privacy: `/#about`, `/#terms`, `/#privacy`
