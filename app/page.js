'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from './components/ThemeProvider'
import AnimatedBackground from './components/AnimatedBackground'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { structuredData } from './structured-data'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [imageLoadError, setImageLoadError] = useState({})
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  // Handle image load errors
  const handleImageError = useCallback((imageId) => {
    setImageLoadError(prev => ({ ...prev, [imageId]: true }))
  }, [])

  // Smooth scroll function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    // 只在客户端挂载后执行动画
    if (!mounted) return
    
    // Hero Section Animation - 英雄区动画
    const heroTl = gsap.timeline()
    heroTl
      .from('.hero-title', { 
        opacity: 0, 
        y: 50, 
        duration: 1.2, 
        ease: 'power3.out' 
      })
      .from('.hero-subtitle', { 
        opacity: 0, 
        y: 30, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, '-=0.6')
      .from('.hero-cta', { 
        opacity: 0, 
        y: 20, 
        duration: 0.6, 
        ease: 'power2.out' 
      }, '-=0.4')

    // About Section Animation - 关于区域滚动动画
    gsap.fromTo('.about-content', 
      { 
        opacity: 0, 
        y: 60 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Skills Section Animation - 技能区域动画
    gsap.fromTo('.skill-item', 
      { 
        opacity: 0, 
        scale: 0.8 
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Projects Section Animation - 项目区域动画
    gsap.fromTo('.project-card', 
      { 
        opacity: 0, 
        y: 40 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Contact Section Animation - 联系区域动画
    gsap.fromTo('.contact-content', 
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted])


  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* 动态背景 */}
      <AnimatedBackground />
      
    <div className="min-h-screen relative z-10 text-black dark:text-white">
      {/* Navigation - 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-sf-pro font-semibold">
              Portfolio
            </div>
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:text-blue-500"
              >
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                <span className="text-lg" role="img" aria-hidden="true">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - 英雄区域 */}
      <section ref={heroRef} className="hero-section min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="hero-title text-6xl md:text-8xl font-sf-pro font-bold mb-6 leading-tight">
            Hello, I'm{' '}
            <span className="text-gradient">Alex Chen</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            A passionate full-stack developer crafting beautiful digital experiences with modern technologies.
          </p>
          <div className="hero-cta">
            <button 
              onClick={() => scrollToSection('projects')}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
            >
              View My Work
            </button>
          </div>
        </div>
      </section>

      {/* About Section - 关于区域 */}
      <section id="about" ref={aboutRef} className="about-section py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="about-content">
              <h2 className="text-4xl md:text-5xl font-sf-pro font-bold mb-8">
                About Me
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                I'm a passionate developer with 5+ years of experience in creating innovative web solutions. 
                I specialize in React, Node.js, and modern web technologies, always striving to deliver 
                pixel-perfect designs and seamless user experiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                When I'm not coding, you'll find me exploring new design trends, contributing to open source projects, 
                or enjoying a good cup of coffee while reading about the latest tech innovations.
              </p>
            </div>
            <div className="about-content">
              <div className="relative">
                {!imageLoadError.profile ? (
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face"
                    alt="Alex Chen - Full Stack Developer"
                    width={500}
                    height={500}
                    className="rounded-3xl shadow-2xl animate-float"
                    priority
                    loading="eager"
                    onError={() => handleImageError('profile')}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLhA5OTknqTWv4bE"
                  />
                ) : (
                  <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl animate-float flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">👨‍💻</div>
                      <p className="text-lg">Alex Chen</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - 技能区域 */}
      <section id="skills" ref={skillsRef} className="skills-section py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-sf-pro font-bold mb-16">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Next.js', icon: '▲' },
              { name: 'Node.js', icon: '💚' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'Python', icon: '🐍' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'AWS', icon: '☁️' },
              { name: 'Docker', icon: '🐳' }
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="font-sf-pro font-semibold text-lg">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - 项目区域 */}
      <section id="projects" ref={projectsRef} className="projects-section py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-sf-pro font-bold text-center mb-16">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'A modern e-commerce solution built with Next.js, featuring real-time inventory management and secure payment processing.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
                tech: ['Next.js', 'Stripe', 'MongoDB'],
                link: '#'
              },
              {
                title: 'Task Management App',
                description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
                tech: ['React', 'Socket.io', 'Node.js'],
                link: '#'
              },
              {
                title: 'AI-Powered Analytics',
                description: 'A data visualization dashboard that uses machine learning to provide insights and predictions for business metrics.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                tech: ['Python', 'TensorFlow', 'React'],
                link: '#'
              },
              {
                title: 'Weather Forecast App',
                description: 'A beautiful weather application with location-based forecasts, interactive maps, and personalized weather alerts.',
                image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
                tech: ['React Native', 'OpenWeather API'],
                link: '#'
              }
            ].map((project, index) => (
              <div
                key={project.title}
                className="project-card bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 md:h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-sf-pro font-bold text-2xl mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - 联系区域 */}
      <section id="contact" ref={contactRef} className="contact-section py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="contact-content">
            <h2 className="text-4xl md:text-5xl font-sf-pro font-bold mb-8">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              Have a project in mind? I'd love to hear about it. 
              Let's create something amazing together.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:hello@alexchen.dev"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </a>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  GitHub
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 页脚 */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 Alex Chen. Designed with ❤️ and built with Next.js
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}