'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from './components/ThemeProvider'
import AnimatedBackground from './components/AnimatedBackground'
import { 
  getHeroConfig, 
  getAboutConfig, 
  getSkillsConfig, 
  getProjectsConfig, 
  getContactConfig, 
  getFooterConfig,
  getPersonalInfo,
  getStructuredData 
} from '../lib/config'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [imageLoadError, setImageLoadError] = useState({})
  
  // 获取配置数据
  const heroConfig = getHeroConfig()
  const aboutConfig = getAboutConfig()
  const skillsConfig = getSkillsConfig()
  const projectsConfig = getProjectsConfig()
  const contactConfig = getContactConfig()
  const footerConfig = getFooterConfig()
  const personalInfo = getPersonalInfo()
  const structuredData = getStructuredData()
  
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
                {personalInfo.name}
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
              {heroConfig.greeting}{' '}
              <span className="text-gradient">{heroConfig.name}</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroConfig.description}
            </p>
            <div className="hero-cta">
              <button 
                onClick={() => scrollToSection('projects')}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
              >
                {heroConfig.cta.text}
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
                  {aboutConfig.title}
                </h2>
                {aboutConfig.description.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="about-content">
                <div className="relative">
                  {!imageLoadError.profile ? (
                    <Image
                      src={personalInfo.avatar}
                      alt={`${personalInfo.name} - ${personalInfo.title}`}
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
                        <p className="text-lg">{personalInfo.name}</p>
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
              {skillsConfig.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {skillsConfig.categories.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="font-sf-pro font-semibold text-lg mb-2">{skill.name}</h3>
                  {skill.level && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section - 项目区域 */}
        <section id="projects" ref={projectsRef} className="projects-section py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sf-pro font-bold text-center mb-16">
              {projectsConfig.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {projectsConfig.items.filter(project => project.featured).map((project) => (
                <div
                  key={project.id}
                  className="project-card bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 md:h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(`project-${project.id}`)}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-sf-pro font-bold text-2xl mb-4">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
                        >
                          View Demo →
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 font-medium transition-colors duration-200"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
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
                {contactConfig.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                {contactConfig.description}
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  {contactConfig.cta.text}
                </a>
                <div className="flex space-x-6">
                  {contactConfig.social.map((social) => (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - 页脚 */}
        <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {footerConfig.copyright}
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}