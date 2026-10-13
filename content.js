/* Workshop 01 — site content.
   This is the only file you need to edit to add videos, resources and links. */

/* ============================================================
   SETTINGS — replace the placeholder links with your own.
   platforms: where resources are shared. header: true → shown in the menu bar.
   ============================================================ */
const CONFIG = {
  youtube: "https://www.youtube.com/@workshop01",   // placeholder
  platforms: [
    { name: "GitHub",       url: "https://github.com/workshop01", header: true },
    { name: "LinkedIn",     url: "https://www.linkedin.com/",     header: false },
    { name: "Google Drive", url: "https://drive.google.com/",     header: false },
    { name: "Printables",   url: "https://www.printables.com/",   header: false },
    { name: "GrabCAD",      url: "https://grabcad.com/library",   header: false }
  ],
  // Shows the real YouTube player and thumbnails for videos that have a youtubeId.
  useYouTubeMedia: true
};

/* The two kinds of video. Rename the label here only. */
const KINDS = {
  course: { label: "Course",     plural: "Courses",     points: "Objectives",       intro: "Structured lessons that cover one engineering subject step by step." },
  disc:   { label: "Discussion", plural: "Discussions", points: "Topics discussed", intro: "Open technical discussions on tools, components, methods and projects." }
};

/* ============================================================
   VIDEOS — the only list you need to edit.
   kind: "course" or "disc". points / level / tools / notes are optional.
   Resource lists (code, documents, files, links) are optional; empty ones are hidden.
   ============================================================ */
const VIDEOS = [
  {
    slug: "pid-control-dc-motor", kind: "course",
    title: "PID Control of a DC Motor",
    description: "Model a DC motor, design a PID speed controller in MATLAB, then test it on a real motor with an encoder.",
    date: "2026-10-02", duration: "24:18", youtubeId: "",
    level: "Intermediate", tools: ["MATLAB / Simulink", "Arduino Uno", "DC motor with encoder"],
    points: [
      "Write the electrical and mechanical equations of a DC motor",
      "Build the transfer function and simulate it in Simulink",
      "Tune the P, I and D gains and observe the effect of each",
      "Implement the controller on Arduino and compare with simulation"
    ],
    notes: ["The encoder gives 1 200 counts per revolution after quadrature decoding. Speed is computed every 10 ms."],
    code: [{ label: "workshop01/pid-dc-motor", href: "https://github.com/workshop01/pid-dc-motor", note: "Arduino firmware and MATLAB scripts" }],
    documents: [{ label: "Motor model and PID tuning.pdf", href: "https://drive.google.com/", note: "PDF, 8 pages" }],
    files: [{ label: "dc_motor_pid.slx", href: "https://github.com/workshop01/pid-dc-motor", note: "Simulink model" },
            { label: "wiring_diagram.png", href: "https://github.com/workshop01/pid-dc-motor", note: "Wiring diagram" }],
    links: [{ label: "Control Tutorials for MATLAB and Simulink: DC Motor Speed", href: "https://ctms.engin.umich.edu/CTMS/index.php?example=MotorSpeed&section=SystemModeling", note: "University of Michigan" }]
  },
  {
    slug: "esp32-vs-raspberry-pi", kind: "disc",
    title: "ESP32 or Raspberry Pi for a Mechatronics Project",
    description: "Real-time control, power, price and software. A practical comparison with two small test projects.",
    date: "2026-09-18", duration: "14:05", youtubeId: "",
    points: ["Microcontroller or single-board computer: what changes in practice", "Real-time behaviour when driving motors", "Measured power consumption on both boards", "Using both together in one system"],
    code: [{ label: "workshop01/esp32-rpi-tests", href: "https://github.com/workshop01/esp32-rpi-tests", note: "Both test projects" }]
  },
  {
    slug: "stepper-motors-explained", kind: "course",
    title: "Stepper Motors: Steps, Microstepping and Drivers",
    description: "How a stepper motor moves, what microstepping does to torque, and how to set the current limit on an A4988 driver.",
    date: "2026-09-04", duration: "19:40", youtubeId: "",
    level: "Beginner", tools: ["NEMA 17 motor", "A4988 driver", "Multimeter"],
    points: ["How the coils produce each step", "Full step, half step and microstepping", "Setting the driver current limit safely"],
    documents: [{ label: "Stepper motor course notes.pdf", href: "https://drive.google.com/", note: "PDF, 12 pages" }],
    files: [{ label: "current_limit_calculator.xlsx", href: "https://drive.google.com/", note: "Spreadsheet" }],
    links: [{ label: "A4988 product page and datasheet", href: "https://www.allegromicro.com/en/products/motor-drivers/brush-dc-motor-drivers/a4988", note: "Allegro MicroSystems" }]
  },
  {
    slug: "3d-printing-tolerances", kind: "disc",
    title: "3D Printing Tolerances for Mechanical Parts",
    description: "Press fits, sliding fits and bearing seats. A test print to find the right clearances for a given printer.",
    date: "2026-08-21", duration: "11:52", youtubeId: "",
    points: ["Why printed holes come out undersized", "Clearances that worked for press and sliding fits", "Calibrating for your own printer"],
    files: [{ label: "tolerance_test.step", href: "https://grabcad.com/library", note: "CAD model" },
            { label: "tolerance_test.stl", href: "https://www.printables.com/", note: "Print file" }]
  },
  {
    slug: "sensors-for-mechatronics", kind: "course",
    title: "Sensors in Mechatronics: An Overview",
    description: "Position, speed, force and temperature sensors: how each one works and how to read it with a microcontroller.",
    date: "2026-08-07", duration: "27:30", youtubeId: "",
    level: "Beginner",
    points: ["Analog and digital sensors", "Encoders, potentiometers and Hall-effect sensors", "Load cells and the HX711 amplifier", "Filtering noisy signals"]
  },
  {
    slug: "inside-a-servo-motor", kind: "disc",
    title: "Inside a Hobby Servo",
    description: "A teardown of the SG90 servo: gearbox, feedback potentiometer and control board, and the cause of its jitter.",
    date: "2026-07-24", duration: "09:14", youtubeId: "",
    documents: [{ label: "SG90 teardown photos.pdf", href: "https://drive.google.com/", note: "PDF, 4 pages" }]
  }
];

const SECTIONS = [
  { key: "code",      title: "Source code" },
  { key: "documents", title: "Documents and notes" },
  { key: "files",     title: "Project files" },
  { key: "links",     title: "References" }
];
