# 🔧 Configuration Guide

This portfolio uses a JSON-based configuration system that makes it easy to customize all content without touching the code. All personal information, projects, skills, and styling can be modified through the `config/portfolio.json` file.

## 📁 Configuration File Structure

### 🧑‍💻 Personal Information
```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Job Title",
    "subtitle": "Your tagline or brief description",
    "email": "your@email.com",
    "location": "Your City, Country",
    "avatar": "path/to/your/image.jpg",
    "resume": "/path/to/resume.pdf"
  }
}
```

### 🎯 Hero Section
```json
{
  "hero": {
    "greeting": "Hello, I'm",
    "name": "Your Name",
    "description": "Your compelling description",
    "cta": {
      "text": "View My Work",
      "action": "scrollToProjects"
    }
  }
}
```

### 📖 About Section
```json
{
  "about": {
    "title": "About Me",
    "description": [
      "First paragraph of your story...",
      "Second paragraph continuing your narrative..."
    ]
  }
}
```

### 💪 Skills Section
```json
{
  "skills": {
    "title": "Skills & Expertise",
    "categories": [
      {
        "name": "React",
        "icon": "⚛️",
        "level": 95
      }
    ]
  }
}
```

**Available Icons**: You can use any emoji or icon. Popular choices:
- `⚛️` React
- `▲` Next.js  
- `💚` Node.js
- `📘` TypeScript
- `🐍` Python
- `🍃` MongoDB
- `☁️` AWS
- `🐳` Docker

### 🚀 Projects Section
```json
{
  "projects": {
    "title": "Featured Projects",
    "items": [
      {
        "id": 1,
        "title": "Project Name",
        "description": "Project description...",
        "image": "https://your-image-url.jpg",
        "technologies": ["React", "Node.js", "MongoDB"],
        "links": {
          "demo": "https://your-demo.com",
          "github": "https://github.com/you/repo",
          "case_study": "/case-studies/project"
        },
        "featured": true
      }
    ]
  }
}
```

**Image Requirements**:
- Recommended size: 600x400px
- Format: JPG, PNG, or WebP
- Host on: Unsplash, your domain, or GitHub

### 📧 Contact Section
```json
{
  "contact": {
    "title": "Let's Work Together",
    "description": "Your call-to-action message",
    "cta": {
      "text": "Get In Touch",
      "action": "email"
    },
    "social": [
      {
        "name": "GitHub",
        "url": "https://github.com/yourusername",
        "icon": "github"
      }
    ]
  }
}
```

### 🎨 SEO Configuration
```json
{
  "seo": {
    "title": "Your SEO Title",
    "description": "Your SEO description (150-160 chars)",
    "keywords": "keyword1, keyword2, keyword3",
    "author": "Your Name",
    "siteUrl": "https://yourdomain.com",
    "image": "/og-image.png",
    "twitterHandle": "@yourusername"
  }
}
```

### 🎨 Theme Customization
```json
{
  "theme": {
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#8b5cf6",
      "accent": "#ef4444"
    },
    "fonts": {
      "primary": "Inter",
      "secondary": "SF Pro Display"
    }
  }
}
```

## 🚀 Quick Setup Steps

### 1. **Update Personal Info**
```bash
# Edit the config file
nano config/portfolio.json

# Update these key sections:
- personal.name
- personal.title  
- personal.email
- personal.avatar
```

### 2. **Add Your Projects**
```json
{
  "projects": {
    "items": [
      {
        "id": 1,
        "title": "My Awesome Project",
        "description": "What this project does and why it's cool",
        "image": "https://your-screenshot.jpg",
        "technologies": ["React", "TypeScript", "Tailwind"],
        "links": {
          "demo": "https://my-project.com",
          "github": "https://github.com/me/my-project"
        },
        "featured": true
      }
    ]
  }
}
```

### 3. **Customize Skills**
```json
{
  "skills": {
    "categories": [
      {
        "name": "Your Top Skill",
        "icon": "🚀",
        "level": 90
      }
    ]
  }
}
```

### 4. **Update Social Links**
```json
{
  "contact": {
    "social": [
      {
        "name": "GitHub",
        "url": "https://github.com/yourusername"
      },
      {
        "name": "LinkedIn", 
        "url": "https://linkedin.com/in/yourusername"
      }
    ]
  }
}
```

## 🎨 Styling Tips

### Colors
- **Primary**: Main brand color (buttons, links)
- **Secondary**: Accent color (gradients, highlights)  
- **Accent**: Warning/error color

### Images
- **Avatar**: 500x500px, professional headshot
- **Projects**: 600x400px, high-quality screenshots
- **OG Image**: 1200x630px for social sharing

### Content Tips
- **Hero Description**: 1-2 sentences, compelling hook
- **About Paragraphs**: 2-3 paragraphs, tell your story
- **Project Descriptions**: Focus on impact, not just features
- **Skills**: List your top 6-8 skills with realistic levels

## 🔧 Advanced Configuration

### Custom Fonts
Add Google Fonts to `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

### Custom Colors
Update Tailwind config for brand colors:
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'brand': {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a'
      }
    }
  }
}
```

### Animation Timing
Adjust animation durations in the theme config:
```json
{
  "theme": {
    "animations": {
      "duration": {
        "fast": "0.3s",
        "normal": "0.6s", 
        "slow": "1.2s"
      }
    }
  }
}
```

## 🎯 Best Practices

1. **Keep it Simple**: Don't overcrowd with too many skills/projects
2. **Quality Images**: Use high-resolution, professional images
3. **Consistent Tone**: Maintain the same voice throughout
4. **Performance**: Optimize images before uploading
5. **Testing**: Test on mobile devices and different browsers
6. **SEO**: Use descriptive titles and meta descriptions

## 🔄 Making Changes

After updating the configuration:

1. **Save the file**: `config/portfolio.json`
2. **Restart dev server**: `npm run dev`
3. **Check the changes**: Visit `http://localhost:3000`
4. **Build for production**: `npm run build`

## ❓ Need Help?

- **Emoji Reference**: [Emojipedia](https://emojipedia.org/)
- **Color Picker**: [Coolors](https://coolors.co/)
- **Image Sources**: [Unsplash](https://unsplash.com/)
- **Icon Resources**: [Heroicons](https://heroicons.com/)

---

**🎉 Happy Customizing!** Your portfolio should reflect your unique personality and skills. Don't be afraid to experiment with different configurations until it feels perfect.