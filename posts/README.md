# Blog Posts — Upload Workflow

Posts live in **`posts/posts.json`**. Images live in **`posts/images/`**.
`blog.html` fetches the JSON at runtime and renders posts **newest-first** (sorted by `date`).
Clicking any image opens a fullscreen lightbox (← / → / Esc).

---

## Where things live

```
WEBSITE/                                    ← git repo (yahyunee.github.io)
├── blog.html, blog.js, styles.css
└── posts/
    ├── posts.json                          ← edit this to add posts
    ├── images/                             ← put compressed photos here
    │   └── alcf-hackathon-2026-1.jpeg
    └── README.md                           ← you are here

Myself/previous_works/conferences/...       ← NOT in the git repo
└── 2604_ALCF_GPU_Hackathon/images/...      ← keep originals here
```

**Rule:** Originals (large camera files) stay in `Myself/previous_works/...`. Only **compressed copies** go into `posts/images/`. This keeps the repo small and the site fast.

---

## Post schema

Each post in `posts.json` is one object inside the top-level array:

```json
{
  "id": "unique-slug",                   // kebab-case, used for URL anchor #post-<id>
  "title": "Post title",                 // heading
  "date": "YYYY-MM-DD",                  // controls sort order (newest first)
  "location": "Optional place",          // shown after date; omit or "" if N/A
  "description": "1-4 sentence paragraph",
  "images": ["images/file1.jpg", ...]    // relative to /posts/, [] if none
}
```

Gallery layout adapts automatically: 1 → full width, 2 → side by side, 3+ → responsive grid.

---

## Workflow (the steps Claude follows)

### 1. Gather the source material

Find the event folder under `Myself/previous_works/conferences/` (or wherever the originals live). Skim any program PDFs or slides for accurate **dates, location, and team name** — don't guess.

### 2. Pick photos and compress them

Camera JPEGs are typically 4000+ px wide and 5-8 MB each. Resize to **max 1600 px wide at quality ~80** before committing. From `posts/images/`:

```bash
# resize in place (originals are safe in Myself/previous_works/)
sips --resampleWidth 1600 -s formatOptions 80 photo.jpeg --out photo.jpeg
```

Target: **under ~500 KB per image**. Use lowercase kebab-case filenames tied to the event, e.g. `alcf-hackathon-2026-1-group.jpeg`.

### 3. Add the entry to `posts.json`

Order in the file doesn't matter (sort is by `date` at render time), but newest-on-top is easier to read. Don't forget commas between entries.

### 4. Validate the JSON

```bash
python3 -c "import json, sys; data=json.load(open('posts/posts.json')); print('OK,', len(data), 'posts')"
```

### 5. Commit and push

From the `WEBSITE/` repo root:

```bash
git add posts/posts.json posts/images/
git commit -m "Add <event> blog post"
git push origin main
```

GitHub Pages redeploys in ~1 minute.

---

## Just ask Claude

> "Add a blog post for the ALCF GPU Hackathon — photos are in `Myself/previous_works/conferences/2604_ALCF_GPU_Hackathon/`."

Claude will:
1. Look up dates/location/team from the source folder
2. Pick photos, **compress them with `sips`**, copy into `posts/images/` with sensible filenames
3. Append the entry to `posts.json` and validate
4. Commit and push

---

## Editing or deleting a post

Open `posts.json` and edit/delete the object. Also delete unused images from `posts/images/`. Commit and push.

---

## Size and bandwidth limits (FYI)

| Limit | Threshold |
|---|---|
| Single file | 100 MB hard reject; 50 MB warning |
| Repo size | ~1 GB soft, 5 GB recommended ceiling |
| GitHub Pages site | 1 GB built |
| Pages bandwidth | 100 GB/month soft |

At ~400 KB per compressed photo, the 1 GB site limit ≈ 2,500 photos. Not a near-term concern as long as the compression step happens.
