# Ahhyun Lucy Lee - Personal Website

A modern, minimalistic single-page portfolio website with winter dark aesthetics, showcasing research, projects, and activities.

## 🎨 Design Features

- **Winter Dark Color Palette**: Navy, burgundy, and black tones for elegant, professional look
- **Single-Page Layout**: Smooth scrolling navigation between sections
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern Animations**: Subtle fade-in effects and smooth transitions
- **Easy to Customize**: Clean, well-organized code structure

## 📁 Project Structure

```
WEBSITE/
├── index.html          # Main HTML file with all content
├── styles.css          # All styling with winter dark theme
├── script.js           # JavaScript for interactions
├── README.md           # This file
└── CV_Ahhyun_Lucy_Lee.pdf  # Your CV (optional to keep)
```

## 🚀 Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - Example: if your username is `yahyunee`, name it `yahyunee.github.io`
4. Choose **Public**
5. Do NOT initialize with README (we already have files)
6. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open Terminal and navigate to your website folder:

```bash
cd /Users/lucy/Desktop/2025Fall/WEBSITE
```

Initialize Git and push to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Personal website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `yourusername` with your actual GitHub username!**

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select `main` branch
5. Click "Save"

Your website will be live at: `https://yourusername.github.io` in a few minutes!

## ✏️ Customizing Your Website

### Adding Your Photo

Replace the placeholder in `index.html`:

```html
<!-- Find this section in index.html -->
<div class="image-placeholder">
    <p>Your Photo Here</p>
</div>

<!-- Replace with -->
<img src="your-photo.jpg" alt="Ahhyun Lucy Lee" style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover;">
```

Then add your photo file to the project folder and commit:

```bash
git add your-photo.jpg
git commit -m "Add profile photo"
git push
```

### Changing Colors

Edit the color variables in `styles.css`:

```css
:root {
    --navy-dark: #0a1628;      /* Main background */
    --navy-medium: #1a2c4e;    /* Section backgrounds */
    --burgundy: #6b1f3a;       /* Accent color */
    /* ... other colors */
}
```

### Adding New Sections

1. Add HTML section in `index.html`
2. Add navigation link in the navbar
3. Style it in `styles.css` if needed
4. Commit and push changes

### Updating Content

Simply edit `index.html` to:
- Add new research papers
- Update education/experience
- Add new projects
- Change contact information

After editing:

```bash
git add index.html
git commit -m "Update content"
git push
```

## 🎯 Optional Enhancements

### Enable Scroll Progress Bar

Uncomment this line in `script.js`:

```javascript
// Uncomment the line below to enable scroll progress indicator
createScrollProgress();
```

### Enable Typing Effect

Uncomment this section in `script.js`:

```javascript
// Uncomment to enable typing effect on page load
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    window.addEventListener('load', () => {
        typeWriter(heroTitle, originalText, 80);
    });
}
```

### Adding Google Analytics (Optional)

Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Adding Blog Section (Future)

The structure is ready for expansion. You can add a blog section by:
1. Creating a new section in HTML
2. Adding blog post cards similar to project cards
3. Linking to separate blog post pages

## 🌐 Using Custom Domain (Optional)

If you want to use a custom domain like `lucylee.com`:

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In your repository, create a file named `CNAME` with your domain:
   ```
   yourdomain.com
   ```
3. In your domain registrar's DNS settings, add:
   - Type: A
   - Host: @
   - Value: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - Type: CNAME
   - Host: www
   - Value: yourusername.github.io

## 📱 Testing Locally

To preview before pushing:

1. Open `index.html` in your browser
2. Or use a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons

## 📝 License

Feel free to use this template for your own website!

## 🤝 Support

If you need help:
- Check GitHub Pages documentation
- Open an issue in your repository
- Ask questions in coding communities

---

**Created by Ahhyun Lucy Lee** | Last Updated: January 2025
