/* MoreBit — Independent Moroccan Skills Hub — site content. This is the only file you edit.

   kind: "course" (Courses), "topic" (General Topics) or "tips" (Tools & Tips)
   youtubeId: the part after watch?v= in the YouTube URL ("" = link to the channel)
   thumbnail: optional image path; otherwise the YouTube thumbnail is used
   description: optional, not shown on the cards (kept for later use)
   resources: optional list of { label, href, note }. Videos without resources
   don't appear on the Resources page. */

const LINKS = {
  youtube: "https://www.youtube.com/@morebit",   // placeholder: your channel
  github:  "https://github.com/morebit"          // placeholder: your GitHub
};

const KINDS = {
  course: "Courses",
  topic:  "General Topics",
  tips:   "Tools & Tips"
};

const VIDEOS = [
  {
    slug: "analog-electronics-101", kind: "course",
    title: "Analog Electronics: Full Overview and 9 Experiments",
    description: "From Ohm's law to op-amps, with nine breadboard experiments and a light-controlled motor at the end.",
    date: "2026-10-14", duration: "1:15:00", youtubeId: "",
    thumbnail: "assets/thumbs/analog-electronics-101.png",
    resources: [
      { label: "morebit/analog-electronics-101", href: "https://github.com/morebit/analog-electronics-101", note: "Course repository" },
      { label: "README.md", href: "https://github.com/morebit/analog-electronics-101#readme", note: "Course notes: theory and the 9 experiments" },
      { label: "bom.csv", href: "https://github.com/morebit/analog-electronics-101/blob/main/bom.csv", note: "Parts list" },
      { label: "spice", href: "https://github.com/morebit/analog-electronics-101/tree/main/spice", note: "LTspice simulations for experiments 2, 3, 4, 6 and 8" }
    ]
  },

  /* ── EXAMPLES: one per section, to show each section's color. Replace or delete. ── */
  {
    slug: "how-chips-read-the-world", kind: "topic",
    title: "How Chips Read the World: Sensors, ADCs and a Little Math",
    description: "Example entry — General Topics.",
    date: "2026-10-10", duration: "18:40", youtubeId: "",
    thumbnail: "assets/thumbs/how-chips-read-the-world.png",
    resources: [
      { label: "adc-notes.pdf", href: "https://github.com/morebit", note: "Example resource" }
    ]
  },
  {
    slug: "multimeter-basics", kind: "tips",
    title: "Multimeter Basics: 5 Measurements You'll Use Daily",
    description: "Example entry — Tools & Tips.",
    date: "2026-10-06", duration: "9:15", youtubeId: "",
    thumbnail: "assets/thumbs/multimeter-basics.png",
    resources: [
      { label: "multimeter-cheatsheet.pdf", href: "https://github.com/morebit", note: "Example resource" }
    ]
  }
];
