// Load and render blog posts from posts/posts.json
async function loadPosts() {
    const container = document.getElementById('posts-container');
    const emptyState = document.getElementById('empty-state');

    try {
        const response = await fetch('posts/posts.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Could not load posts');
        const posts = await response.json();

        if (!posts || posts.length === 0) {
            emptyState.style.display = 'flex';
            return;
        }

        // Sort newest first
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        container.innerHTML = posts.map(renderPost).join('');
    } catch (err) {
        console.error(err);
        emptyState.style.display = 'flex';
    }
}

function renderPost(post) {
    const dateStr = formatDate(post.date);
    const meta = post.location ? `${dateStr} · ${post.location}` : dateStr;

    const imagesHtml = (post.images && post.images.length > 0)
        ? `<div class="blog-post-gallery ${galleryClass(post.images.length)}">
             ${post.images.map(img => `
               <div class="blog-post-image">
                 <img src="posts/${img}" alt="${escapeHtml(post.title)}" loading="lazy">
               </div>
             `).join('')}
           </div>`
        : '';

    return `
        <article class="blog-post" id="post-${escapeHtml(post.id)}">
            <header class="blog-post-header">
                <h2 class="blog-post-title">${escapeHtml(post.title)}</h2>
                <p class="blog-post-meta">${escapeHtml(meta)}</p>
            </header>
            ${imagesHtml}
            <p class="blog-post-description">${escapeHtml(post.description)}</p>
        </article>
    `;
}

function galleryClass(count) {
    if (count === 1) return 'gallery-1';
    if (count === 2) return 'gallery-2';
    return 'gallery-multi';
}

function formatDate(d) {
    const date = new Date(d);
    if (isNaN(date)) return d;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Navbar scroll shadow (shared behavior with index.html)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

loadPosts();
