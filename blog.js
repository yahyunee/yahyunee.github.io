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
        attachLightbox();
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
    // "YYYY-MM-DD" parses as UTC midnight, so render in UTC to avoid an off-by-one day
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
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

// Lightbox: click any gallery image to open fullscreen viewer
function attachLightbox() {
    const galleries = document.querySelectorAll('.blog-post-gallery');
    galleries.forEach(gallery => {
        const imgs = Array.from(gallery.querySelectorAll('img'));
        const sources = imgs.map(i => ({ src: i.src, alt: i.alt }));
        imgs.forEach((img, idx) => {
            img.addEventListener('click', () => openLightbox(sources, idx));
        });
    });
}

let lightboxState = null;

function openLightbox(sources, index) {
    let box = document.getElementById('lightbox');
    if (!box) {
        box = document.createElement('div');
        box.id = 'lightbox';
        box.className = 'lightbox';
        box.innerHTML = `
            <button class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-btn lightbox-prev" aria-label="Previous">&#8249;</button>
            <img class="lightbox-img" alt="">
            <button class="lightbox-btn lightbox-next" aria-label="Next">&#8250;</button>
            <div class="lightbox-counter"></div>
        `;
        document.body.appendChild(box);

        box.addEventListener('click', (e) => {
            if (e.target === box || e.target.classList.contains('lightbox-close') || e.target.classList.contains('lightbox-img')) {
                closeLightbox();
            }
        });
        box.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
        box.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });
        document.addEventListener('keydown', (e) => {
            if (!lightboxState) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') stepLightbox(-1);
            else if (e.key === 'ArrowRight') stepLightbox(1);
        });
    }

    lightboxState = { sources, index };
    renderLightbox();
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function renderLightbox() {
    if (!lightboxState) return;
    const box = document.getElementById('lightbox');
    const { sources, index } = lightboxState;
    const img = box.querySelector('.lightbox-img');
    img.src = sources[index].src;
    img.alt = sources[index].alt;
    const multiple = sources.length > 1;
    box.querySelector('.lightbox-prev').style.display = multiple ? '' : 'none';
    box.querySelector('.lightbox-next').style.display = multiple ? '' : 'none';
    const counter = box.querySelector('.lightbox-counter');
    counter.textContent = multiple ? `${index + 1} / ${sources.length}` : '';
}

function stepLightbox(dir) {
    if (!lightboxState) return;
    const n = lightboxState.sources.length;
    lightboxState.index = (lightboxState.index + dir + n) % n;
    renderLightbox();
}

function closeLightbox() {
    const box = document.getElementById('lightbox');
    if (box) box.classList.remove('open');
    document.body.style.overflow = '';
    lightboxState = null;
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

// Mobile menu (shared behavior with index.html)
const navContainer = document.querySelector('.nav-container');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.createElement('button');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
hamburger.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: var(--white);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
`;
navContainer.appendChild(hamburger);

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
    } else {
        hamburger.style.display = 'none';
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

loadPosts();
