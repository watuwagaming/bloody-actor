# Bloody Actor — Portfolio Site

Brian Mbugua's personal portfolio site. **Pure static HTML** — no build step, no Node, no dependencies. Just open `index.html` in any browser.

---

## 📂 Project structure

```
bloody-actor/
├── index.html          ← The entire site lives here
├── assets/
│   └── images/         ← Drop your photos & screenshots here
│       ├── profile.jpg     (your headshot — about section)
│       ├── work1.jpg       (portfolio screenshot #1)
│       ├── work2.jpg       (portfolio screenshot #2)
│       ├── work3.jpg       (your YouTube / personal channel)
│       ├── work4.jpg       (portfolio screenshot #4)
│       ├── work5.jpg       (portfolio screenshot #5)
│       └── work6.jpg       (portfolio screenshot #6)
├── README.md           ← This file
└── DEPLOY.md           ← VPS deployment instructions
```

---

## ✏️ What to personalize

Open `index.html` and search (Ctrl+F) for the markers below.

| What to update | Search for | Notes |
|---|---|---|
| Logo | `assets/images/logo.png` | Drop a transparent PNG (~80px tall). Falls back to "BLOODY_ACTOR" text until added |
| Hero stats | `YRS_ON_CAMERA` | Update the four numbers (3+, 15+, 07+, 05+) to your real figures |
| Mission Control metrics | `Active Operations` | Pipeline names + percentages are illustrative — edit to taste |
| Headshot | `profile.jpg` | Already set. Swap the file in `assets/images/` to change |
| Hero portrait | `hero-portrait.jpg` | Already set. Swap the file in `assets/images/` to change |

Email is set to `bloodyactor@gmail.com` (contact form + email card). The portfolio
is a single-page site — no separate pricing, testimonial, or booking sections.

---

## 🖼️ How to swap a placeholder for a real image

Each work card currently has a gradient placeholder. To use a real screenshot:

**Find this** (inside a work card):
```html
<div class="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-pink-900/60 flex items-center justify-center">
  <div class="text-center p-6 text-gray-500">
    <div class="text-5xl mb-3">📷</div>
    <p class="text-sm">Add screenshot<br><code class="text-xs">assets/images/work1.jpg</code></p>
  </div>
</div>
```

**Replace it with:**
```html
<img src="assets/images/work1.jpg" alt="Client name — campaign" class="work-img">
```

That's it. The hover caption and tag chips still work over the image.

---

## 🚀 Deploying to your VPS

See `DEPLOY.md` for full instructions.

**Short version:** Copy the whole folder to your VPS (e.g. `/var/www/bloody-actor/`) and point an Nginx server block at it. No database, no Node, no anything. It's just files.
