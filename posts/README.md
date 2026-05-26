# Blog Posts — How to Upload

All blog posts live in **`posts/posts.json`**, and all images go in **`posts/images/`**.
The blog page (`blog.html`) fetches the JSON file at runtime and renders posts newest-first.

---

## Post schema

Each post in `posts.json` is one object inside the top-level array:

```json
{
  "id": "unique-slug",                   // unique identifier in kebab-case (used for the URL anchor #post-<id>)
  "title": "Post title",                 // shown as the heading
  "date": "YYYY-MM-DD",                  // used for sorting (newest first) and displayed under the title
  "location": "Optional place",          // shown after the date (omit or use "" if not applicable)
  "description": "Short paragraph...",   // 1–4 sentences, plain text (HTML is escaped for safety)
  "images": ["images/file1.jpg", ...]    // paths relative to /posts/, can be empty []
}
```

Image gallery layout adapts automatically:
- 1 image → full-width
- 2 images → side by side
- 3+ images → responsive grid (min 200px per cell)

---

## Step-by-step: add a new post

### 1. Drop your photos into `posts/images/`

Use lowercase, kebab-case filenames like `alcf-2026-1.jpg`. Compress large photos (~1500px max width is plenty).

```
posts/
├── images/
│   ├── alcf-2026-1.jpg     ← your new photos
│   └── alcf-2026-2.jpg
├── posts.json
└── README.md
```

### 2. Add an entry to `posts.json`

Open `posts/posts.json` and add a new object at the **top of the array** (order doesn't matter for display since posts are sorted by date, but newest-on-top is easier to read in the file).

```json
[
  {
    "id": "alcf-hackathon-2026",
    "title": "ALCF GPU Hackathon",
    "date": "2026-04-15",
    "location": "Argonne National Laboratory",
    "description": "Spent the week scaling up our foundation model training on Polaris GPUs. Learned a ton about distributed training and met amazing researchers from across the country.",
    "images": ["images/alcf-2026-1.jpg", "images/alcf-2026-2.jpg"]
  },
  {
    "id": "blog-opened",
    "title": "Blog section opened!",
    "...": "..."
  }
]
```

Don't forget the comma between entries. Validate with:

```bash
python3 -c "import json; json.load(open('posts/posts.json'))" && echo OK
```

### 3. Commit and push

```bash
git add posts/
git commit -m "Add ALCF hackathon post"
git push
```

GitHub Pages redeploys within ~1 minute. Refresh `blog.html` to see the post.

---

## Easiest way: just ask Claude

If editing JSON by hand is annoying, just tell Claude in chat:

> "Add a blog post titled 'ALCF GPU Hackathon', date 2026-04-15, location Argonne National Laboratory. Description: spent the week scaling foundation model training on Polaris GPUs. Here are the photos: \[attach images or give paths\]."

Claude will:
1. Save the images to `posts/images/` with sensible filenames
2. Append the entry to `posts.json`
3. Validate the JSON
4. Commit and push

---

## Removing or editing a post

Just open `posts.json` and edit/delete the relevant object. Delete its images from `posts/images/` too if you no longer need them. Commit and push.
