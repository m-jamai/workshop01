# MoreBit

Video archive: courses, general topics, tools and tips in mechatronics, with the files for each video.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

```
index.html        Header and footer
content.js        Links and videos  ← the only file you edit
assets/style.css  Design
assets/app.js     Content and Resources pages
favicon.svg       Tab icon
.nojekyll         Lets GitHub Pages serve the files as they are
```

## Deploy on GitHub Pages

1. Create a repository, for example `morebit`.
2. Upload every file in this folder to the root of the repository, including `.nojekyll` and the `assets` folder.
3. Open **Settings → Pages**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/morebit/`.

For your own domain, add it under **Settings → Pages → Custom domain**.

## Before publishing

In `content.js`, set your YouTube channel and GitHub links in `LINKS`, and each video's `youtubeId`. Videos with a `youtubeId` show their real YouTube thumbnail.

## Add a video

Add an entry at the top of `VIDEOS` in `content.js`:

```js
{
  slug: "my-new-video",            // used in the Resources link: #r-my-new-video
  kind: "course",                  // "course" = Courses, "topic" = General Topics, "tips" = Tools & Tips
  title: "My New Video",
  date: "2026-11-01",              // YYYY-MM-DD, newest first
  duration: "12:30",
  youtubeId: "dQw4w9WgXcQ",
  thumbnail: "assets/thumbs/my-new-video.png",   // optional; otherwise the YouTube thumbnail
  resources: [                     // optional
    { label: "morebit/my-repo", href: "https://github.com/morebit/my-repo", note: "Source code" },
    { label: "notes.pdf",       href: "https://github.com/morebit/my-repo", note: "6 pages" }
  ]
}
```

A file name ending in `.pdf`, `.step`, `.stl`, `.slx`… shows its type automatically. Videos without `resources` only appear on the Content page.
