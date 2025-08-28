# 🍎 Apple-Style Personal Portfolio

> A beautiful, minimalist personal portfolio website inspired by Apple's design philosophy, built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎨 **Design & UI**
- **Apple-inspired Minimalism** - Clean, spacious design with elegant typography
- **Responsive Layout** - Perfectly optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Glass-morphism Effects** - Modern frosted glass UI elements
- **Inter & SF Pro Fonts** - Premium typography matching Apple's design system

### 🌟 **Interactive Animations**
- **GSAP ScrollTrigger** - Smooth, performant scroll-driven animations
- **Floating Orb Background** - Dynamic, animated background with floating light orbs
- **Mouse Tracking** - Subtle cursor-following light effects
- **Gradient Text Animation** - Animated rainbow gradient for the name display
- **Parallax Effects** - Layered animations creating depth and engagement

### 🚀 **Technical Excellence**
- **Next.js 14** - Latest React framework with App Router
- **TypeScript Ready** - Type-safe development environment
- **SEO Optimized** - Complete meta tags, Open Graph, and structured data
- **Performance First** - Optimized images, lazy loading, and efficient animations
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support

### 📱 **Sections**
- **Hero Section** - Eye-catching introduction with animated call-to-action
- **About** - Personal story with floating profile image
- **Skills** - Interactive skill cards with hover effects
- **Projects** - Portfolio showcase with detailed project cards
- **Contact** - Professional contact information and social links

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 14, React 18, JavaScript ES6+ |
| **Styling** | Tailwind CSS, Custom CSS Animations |
| **Animations** | GSAP, ScrollTrigger |
| **Icons & Images** | Next.js Image Optimization, Emoji |
| **Theme** | Custom Theme Provider with localStorage |
| **SEO** | Next.js Metadata API, JSON-LD Structured Data |

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/machaojin1917939763/person.git
   cd person
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Customization Guide

### 📝 **Personal Information**
Edit the following files to customize your portfolio:

**`app/page.js`** - Update personal information:
```javascript
// Hero Section
<span className="text-gradient">Your Name</span>

// About Section  
const aboutText = "Your personal story here..."

// Skills
const skills = [
  { name: 'Your Skill', icon: '🚀' },
  // Add your skills
]

// Projects
const projects = [
  {
    title: 'Your Project',
    description: 'Project description...',
    // Add your projects
  }
]
```

**`app/structured-data.js`** - Update SEO data:
```javascript
export const structuredData = {
  "name": "Your Name",
  "jobTitle": "Your Job Title",
  "description": "Your description...",
  // Update all fields
}
```

**`app/layout.js`** - Update metadata:
```javascript
export const metadata = {
  title: 'Your Name - Your Title',
  description: 'Your description...',
  // Update metadata
}
```

### 🎨 **Styling Customization**

**Colors** - Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'your-brand': {
        50: '#...',
        500: '#...',
        // Add your brand colors
      }
    }
  }
}
```

**Fonts** - Update in `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'YourFont', system-ui, sans-serif;
}
```

### 🌟 **Background Animation**
Customize the animated background in `app/components/AnimatedBackground.js`:
```javascript
// Number of floating orbs
orbs.current = Array.from({ length: 6 }, () => new FloatingOrb())

// Orb colors and opacity
gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity * 0.8})`)
```

## 📦 Build & Deploy

### **Build for Production**
```bash
npm run build
npm start
```

### **Deploy to Vercel** (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Deploy automatically with every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/machaojin1917939763/person)

### **Deploy to Netlify**
1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)

### **Other Platforms**
- **GitHub Pages** - Static export support
- **Firebase Hosting** - Fast global CDN
- **AWS S3** - Scalable cloud hosting

## 🎨 Design Philosophy

This portfolio follows Apple's design principles:

- **Simplicity** - Clean, uncluttered interface
- **Functionality** - Every element serves a purpose  
- **Beauty** - Aesthetic appeal without sacrifice of usability
- **Innovation** - Modern web technologies and interactions
- **Human-Centered** - Intuitive navigation and accessibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple** - For the design inspiration
- **Next.js Team** - For the incredible React framework
- **GSAP** - For powerful animation capabilities
- **Tailwind CSS** - For utility-first CSS framework
- **Unsplash** - For beautiful placeholder images

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ and lots of ☕**

Made by [Alex Chen](https://github.com/machaojin1917939763) • 🤖 **Generated with [Claude Code](https://claude.ai/code)**

</div>