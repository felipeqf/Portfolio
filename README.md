# SvelteKit Portfolio Template

A modern, responsive, and customizable portfolio template built with SvelteKit, TypeScript, and Markdown. Features dynamic content loading, dark/light mode, and smooth animations.

## Features

- 🎨 Multiple theme options (Light, Dark, Forest, Ocean)  
- 📱 Fully responsive design
- ⚡ Fast page loads with SvelteKit
- 📝 Markdown-based content management
- 🔍 SEO friendly
- 🚀 Easy deployment to GitHub Pages
- 💻 Code syntax highlighting
- 🔄 Smooth page transitions
- 📊 Timeline-based sections

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Customizing Content

### Portfolio Data Configuration

All main content is configured in `src/content/data/portfolio-data.json`. This file contains:

- Personal information
- Theme settings
- Experience timeline
- Skills
- Education history
- Social links
- Publications
- Certifications

Example structure:
```json
{
    "basePath": "/portfolio",
    "theme": "light",
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "experience": [...],
    "skills": [...],
    "education": [...],
    "social": [...],
    "publications": [...],
    "certifications": [...]
}
```

### Projects and Blog Posts

Projects and blog posts are written in Markdown format and stored in:
- Projects: `src/content/projects/*.md`
- Blog posts: `src/content/blog_posts/*.md`

#### Markdown File Structure

Each markdown file must include frontmatter metadata:

```markdown
---
title: Your Title
date: YYYY/MM/DD
link: https://github.com/yourproject
tags: Tag1, Tag2, Tag3
display_order: 1 (optional)
---

## Your Content Here

Regular markdown content...
```

Required frontmatter fields:
- `title`: Project/post title
- `date`: Publication date
- `tags`: Comma-separated tags or array
- `link`: External link (optional)
- `display_order`: Numeric order for sorting (optional)

## Deployment to GitHub Pages

1. Update `portfolio-data.json`:
```json
{
    "basePath": "/your-repo-name"
}
```

2. Initialize Git and set up your repository:
```bash
# Initialize Git repository
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Stage all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select GitHub Actions as the source

4. The included GitHub Action workflow will automatically:
   - Build your site
   - Deploy to GitHub Pages
   - Make it available at `https://yourusername.github.io/your-repo-name`

Note: If you make changes later, you can redeploy using:
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

The deployment workflow is defined in `.github/workflows/deploy.yml`

## Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customizing Styles

Theme colors and styles can be modified in:
- `src/styles/global.css`: Global theme variables
- `src/styles/info-section.css`: Timeline and card styles
- `src/styles/slug-styles.css`: Project/blog post page styles

## License

MIT License - feel free to use this template for your portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.