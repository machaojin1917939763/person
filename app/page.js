'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from './components/ThemeProvider'
import { 
  getHeroConfig, 
  getAboutConfig, 
  getEducationConfig,
  getSkillsConfig, 
  getExperienceConfig,
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
  const educationConfig = getEducationConfig()
  const skillsConfig = getSkillsConfig()
  const experienceConfig = getExperienceConfig()
  const projectsConfig = getProjectsConfig()
  const contactConfig = getContactConfig()
  const footerConfig = getFooterConfig()
  const personalInfo = getPersonalInfo()
  const structuredData = getStructuredData()
  
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const educationRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  // Handle image load errors
  const handleImageError = useCallback((imageId) => {
    setImageLoadError(prev => ({ ...prev, [imageId]: true }))
  }, [])

  // Smooth scroll function
  const scrollToSection = useCallback((sectionId) => {
    console.log('Scrolling to section:', sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log('Element found:', element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.error('Element not found for id:', sectionId)
    }
  }, [])

  useEffect(() => {
    // 只在客户端挂载后执行动画
    if (!mounted) return
    
    // 页面加载时的初始动画
    gsap.set('.hero-title, .hero-subtitle, .hero-cta', { opacity: 0, y: 50 })
    gsap.set('.about-content, .education-item, .skill-item, .experience-card, .project-card', { opacity: 0, y: 30 })
    
    // Hero Section Animation - 英雄区动画
    const heroTl = gsap.timeline()
    heroTl
      .from('.hero-title', { 
        opacity: 0, 
        y: 80, 
        duration: 1.4, 
        ease: 'power4.out' 
      })
      .from('.hero-subtitle', { 
        opacity: 0, 
        y: 40, 
        duration: 1.0, 
        ease: 'power3.out' 
      }, '-=0.8')
      .from('.hero-scroll-indicator', { 
        opacity: 0, 
        y: 30, 
        duration: 0.8, 
        ease: 'power2.out',
        scale: 0.9
      }, '-=0.6')

    // Hero Parallax Effect - 英雄区域视差效果
    gsap.to('.hero-title', {
      y: -50,
      opacity: 0.8,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to('.hero-subtitle', {
      y: -30,
      opacity: 0.6,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    // Mouse tracking effect - 鼠标跟踪效果 (仅在桌面设备上启用)
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
    
    const handleMouseMove = (e) => {
      if (isMobile) return // 移动设备上禁用鼠标跟踪
      
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (clientX - centerX) * 0.01
      const moveY = (clientY - centerY) * 0.01
      
      gsap.to('.hero-title', {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: 'power2.out'
      })
      
      gsap.to('.hero-subtitle', {
        x: moveX * 0.5,
        y: moveY * 0.5,
        duration: 0.7,
        ease: 'power2.out'
      })
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // About Section Animation - 关于区域滚动动画
    gsap.fromTo('.about-content', 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Education Section Animation - 教育背景区域动画
    gsap.fromTo('.education-item', 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.education-section',
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
        scale: 0.85,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Experience Section Animation - 工作经历区域动画
    gsap.fromTo('.experience-card', 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.4,
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Projects Section Animation - 项目区域动画
    gsap.fromTo('.project-card', 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95,
        rotationY: 5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Contact Section Animation - 联系区域动画
    gsap.fromTo('.contact-content', 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // 添加鼠标悬停效果
    gsap.utils.toArray('.skill-item, .project-card').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    // 工作经历卡片的特殊悬停效果
    gsap.utils.toArray('.experience-card').forEach((card, index) => {
      const companyName = card.querySelector('.company-name')
      const positionTitle = card.querySelector('.position-title')
      const periodBadge = card.querySelector('.period-badge')
      const achievementItems = card.querySelectorAll('.achievement-item')
      
      card.addEventListener('mouseenter', () => {
        // 公司名称发光效果
        gsap.to(companyName, {
          color: '#3b82f6',
          duration: 0.3,
          ease: 'power2.out'
        })
        
        // 职位标题渐变效果
        gsap.to(positionTitle, {
          color: '#3b82f6',
          duration: 0.3,
          ease: 'power2.out'
        })
        
        // 时间徽章缩放
        gsap.to(periodBadge, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        
        // 成就列表项依次出现
        gsap.to(achievementItems, {
          x: 8,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out'
        })
      })
      
      card.addEventListener('mouseleave', () => {
        // 恢复原始状态
        gsap.to(companyName, {
          color: '#374151',
          duration: 0.3,
          ease: 'power2.out'
        })
        
        // 根据当前主题恢复正确的颜色
        const isDark = document.documentElement.classList.contains('dark')
        gsap.to(positionTitle, {
          color: isDark ? '#f9fafb' : '#1f2937',
          duration: 0.3,
          ease: 'power2.out'
        })
        
        gsap.to(periodBadge, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        
        gsap.to(achievementItems, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    // 添加导航链接悬停效果
    gsap.utils.toArray('.nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mounted])

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen relative z-10 text-black dark:text-white">
        {/* Navigation - 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-sf-pro font-semibold">
                {personalInfo.name}
              </div>
              <div className="flex items-center space-x-3 md:space-x-6">
                <button 
                  onClick={() => {
                    console.log('About button clicked')
                    scrollToSection('about')
                  }}
                  className="nav-link focus:outline-none"
                >
                  关于我
                </button>
                <button 
                  onClick={() => scrollToSection('education')}
                  className="nav-link focus:outline-none"
                >
                  教育背景
                </button>
                <button 
                  onClick={() => scrollToSection('skills')}
                  className="nav-link focus:outline-none"
                >
                  技能专长
                </button>
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="nav-link focus:outline-none"
                >
                  工作经历
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="nav-link focus:outline-none"
                >
                  项目经历
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="nav-link focus:outline-none"
                >
                  联系我
                </button>
                <button
                  onClick={toggleTheme}
                  className="theme-toggle focus:outline-none"
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
        <section ref={heroRef} className="hero-section h-screen flex items-center justify-center px-6 relative">
          <div className="text-center max-w-4xl">
            <h1 className="hero-title text-6xl md:text-8xl font-sf-pro font-bold mb-6 leading-tight">
              {heroConfig.greeting}{' '}
              <span className="text-gradient">{heroConfig.name}</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroConfig.description}
            </p>
            <div className="hero-scroll-indicator">
              <div className="scroll-mouse" onClick={() => scrollToSection('about')}>
                <div className="mouse">
                  <div className="wheel"></div>
                </div>
                <div className="scroll-text">向下滑动</div>
              </div>
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

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Education Section - 教育背景区域 */}
        <section id="education" ref={educationRef} className="education-section py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sf-pro font-bold text-center mb-16">
              {educationConfig.title}
            </h2>
            <div className="space-y-8">
              {educationConfig.items.map((education, index) => (
                <div
                  key={index}
                  className="education-item bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0 flex-1">
                      <h3 className="font-sf-pro font-bold text-2xl mb-2 text-gray-900 dark:text-white">
                        {education.school}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-semibold text-lg">{education.degree}</span>
                        <span className="text-sm">•</span>
                        <span>{education.department}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                        {education.graduation}
                      </span>
                    </div>
                  </div>
                  {education.honors && education.honors.length > 0 && (
                    <div>
                      <h4 className="font-sf-pro font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                        荣誉奖项
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {education.honors.map((honor, honorIndex) => (
                          <div
                            key={honorIndex}
                            className="flex items-center text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-blue-500 mr-3">🏆</span>
                            <span>{honor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

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
                  className="skill-item card-hover bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
                >
                  <div className="skill-icon text-4xl mb-4">{skill.icon}</div>
                  <h3 className="font-sf-pro font-semibold text-lg mb-3">{skill.name}</h3>
                  {skill.level && (
                    <div className="skill-level-bar dark:bg-gray-700">
                      <div 
                        className="skill-level-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  )}
                  {skill.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Experience Section - 工作经历区域 */}
        <section id="experience" ref={experienceRef} className="experience-section py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sf-pro font-bold text-center mb-16">
              {experienceConfig.title}
            </h2>
            <div className="space-y-12">
              {experienceConfig.items.map((job, index) => (
                <div
                  key={index}
                  className="experience-card card-hover bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="position-title font-sf-pro font-bold text-2xl mb-2 text-gray-900 dark:text-white transition-all duration-300">
                        {job.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                        <span className="company-name font-semibold text-lg transition-all duration-300">{job.company}</span>
                        <span className="text-sm">•</span>
                        <span className="department-info transition-all duration-300">{job.department}</span>
                        <span className="text-sm">•</span>
                        <span className="department-info transition-all duration-300">{job.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="period-badge inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                        {job.period}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="achievement-item flex items-start">
                        <span className="text-blue-500 mr-3 mt-1 text-lg">•</span>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

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
                  className="project-card card-hover bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="project-overlay"></div>
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
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-with-arrow text-blue-500 hover:text-blue-600 font-medium"
                        >
                          查看演示
                        </a>
                      )}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-with-arrow text-gray-600 dark:text-gray-400 hover:text-blue-500 font-medium"
                        >
                          GitHub
                        </a>
                      )}
                      {project.achievements && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <details className="cursor-pointer">
                            <summary className="font-medium text-gray-600 dark:text-gray-300">
                              主要成果
                            </summary>
                            <ul className="mt-2 space-y-1 text-left">
                              {project.achievements.slice(0, 3).map((achievement, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-500 mr-2">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="section-separator"></div>

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
                  className="btn-primary magnetic-button hover-lift relative z-10 text-white font-semibold px-10 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {contactConfig.cta.text}
                </a>
                <div className="flex gap-4 flex-wrap justify-center">
                  {contactConfig.social.map((social) => (
                    social.name === "微信" ? (
                      <div 
                        key={social.name}
                        className="social-link text-gray-600 dark:text-gray-400 cursor-pointer"
                        title={`微信号: ${social.value}`}
                      >
                        {social.name}: {social.value}
                      </div>
                    ) : (
                      <a 
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link text-gray-600 dark:text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {social.name}
                      </a>
                    )
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