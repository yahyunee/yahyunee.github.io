# Blog Posts

Blog posts are stored in `posts.json`. Each post is an object with this schema:

```json
{
  "id": "unique-slug",                   // unique identifier (kebab-case)
  "title": "Post title",
  "date": "YYYY-MM-DD",                  // used for sorting (newest first)
  "location": "Optional place",          // shown after the date (optional, omit if not applicable)
  "description": "Short paragraph...",   // 1-3 sentences
  "images": ["images/file1.jpg", "..."]  // paths relative to /posts/, can be empty []
}
```

## How to add a new post

1. Drop image files into `posts/images/`.
2. Add a new entry to the top of the array in `posts.json` (newest posts first; the page also sorts by `date` automatically).
3. Commit and push — GitHub Pages will redeploy.

Or just tell Claude: "Add a blog post about X at [location] on [date] with these pictures: ..." and Claude will handle everything.
