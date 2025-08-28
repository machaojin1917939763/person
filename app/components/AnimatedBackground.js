'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedBackground() {
  const backgroundRef = useRef(null)
  const canvasRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const orbs = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!mounted) return

    const background = backgroundRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!background || !canvas || !ctx) return

    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 创建浮动光球系统 (替代粒子)
    class FloatingOrb {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.radius = Math.random() * 120 + 60
        this.opacity = Math.random() * 0.15 + 0.05
        this.speed = Math.random() * 0.3 + 0.1
        this.angle = Math.random() * Math.PI * 2
        this.offsetX = 0
        this.offsetY = 0
      }

      update() {
        // 缓慢的浮动动画
        this.angle += this.speed * 0.005
        this.offsetX = Math.sin(this.angle) * 30
        this.offsetY = Math.cos(this.angle * 0.7) * 20
        
        this.x = this.baseX + this.offsetX
        this.y = this.baseY + this.offsetY
      }

      draw(ctx, isDark) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        
        if (isDark) {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity * 0.8})`)
          gradient.addColorStop(0.4, `rgba(147, 51, 234, ${this.opacity * 0.4})`)
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity * 0.6})`)
          gradient.addColorStop(0.4, `rgba(147, 51, 234, ${this.opacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        }
        
        ctx.fillStyle = gradient
        ctx.fillRect(
          this.x - this.radius, 
          this.y - this.radius, 
          this.radius * 2, 
          this.radius * 2
        )
      }
    }

    // 创建光球
    orbs.current = Array.from({ length: 6 }, () => new FloatingOrb())

    // 鼠标跟踪
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 获取当前主题
      const isDark = document.documentElement.classList.contains('dark')
      
      // 绘制鼠标光晕效果（更大更柔和）
      const mouseGradient = ctx.createRadialGradient(
        mousePos.current.x, mousePos.current.y, 0,
        mousePos.current.x, mousePos.current.y, 300
      )
      
      if (isDark) {
        mouseGradient.addColorStop(0, 'rgba(59, 130, 246, 0.12)')
        mouseGradient.addColorStop(0.3, 'rgba(147, 51, 234, 0.06)')
        mouseGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
      } else {
        mouseGradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)')
        mouseGradient.addColorStop(0.3, 'rgba(147, 51, 234, 0.04)')
        mouseGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
      }
      
      ctx.fillStyle = mouseGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制浮动光球
      orbs.current.forEach(orb => {
        orb.update()
        orb.draw(ctx, isDark)
      })

      requestAnimationFrame(animate)
    }

    animate()

    // 滚动驱动的背景变化
    const sections = [
      { trigger: '.hero-section', colors: { light: '#ffffff', dark: '#000000' } },
      { trigger: '.about-section', colors: { light: '#f8fafc', dark: '#0f172a' } },
      { trigger: '.skills-section', colors: { light: '#f1f5f9', dark: '#1e293b' } },
      { trigger: '.projects-section', colors: { light: '#f8fafc', dark: '#0f172a' } },
      { trigger: '.contact-section', colors: { light: '#f1f5f9', dark: '#1e293b' } }
    ]

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section.trigger,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const isDark = document.documentElement.classList.contains('dark')
          const targetColor = isDark ? section.colors.dark : section.colors.light
          
          gsap.to(background, {
            backgroundColor: targetColor,
            duration: 1.5,
            ease: 'power2.out'
          })
        },
        onEnterBack: () => {
          const isDark = document.documentElement.classList.contains('dark')
          const targetColor = isDark ? section.colors.dark : section.colors.light
          
          gsap.to(background, {
            backgroundColor: targetColor,
            duration: 1.5,
            ease: 'power2.out'
          })
        }
      })
    })

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* 主背景 */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10 bg-white dark:bg-black transition-colors duration-1000"
      />
      
      {/* 浮动光球画布 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-5 pointer-events-none opacity-70"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* 静态渐变层 */}
      <div 
        className="fixed inset-0 -z-7 opacity-30"
        style={{
          background: `
            radial-gradient(600px circle at 20% 30%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(400px circle at 80% 70%, rgba(147, 51, 234, 0.1), transparent 50%),
            radial-gradient(800px circle at 40% 90%, rgba(59, 130, 246, 0.05), transparent 50%)
          `,
        }}
      />
      
      {/* 微妙的网格纹理 */}
      <div 
        className="fixed inset-0 -z-8 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  )
}