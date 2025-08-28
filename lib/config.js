import portfolioConfig from '../config/portfolio.json'

/**
 * 获取组合配置
 * @returns {Object} 完整的portfolio配置对象
 */
export function getPortfolioConfig() {
  return portfolioConfig
}

/**
 * 获取个人信息
 * @returns {Object} 个人信息配置
 */
export function getPersonalInfo() {
  return portfolioConfig.personal
}

/**
 * 获取Hero区域配置
 * @returns {Object} Hero区域配置
 */
export function getHeroConfig() {
  return portfolioConfig.hero
}

/**
 * 获取关于我的配置
 * @returns {Object} About区域配置
 */
export function getAboutConfig() {
  return portfolioConfig.about
}

/**
 * 获取技能配置
 * @returns {Object} 技能区域配置
 */
export function getSkillsConfig() {
  return portfolioConfig.skills
}

/**
 * 获取项目配置
 * @returns {Object} 项目区域配置
 */
export function getProjectsConfig() {
  return portfolioConfig.projects
}

/**
 * 获取联系方式配置
 * @returns {Object} 联系区域配置
 */
export function getContactConfig() {
  return portfolioConfig.contact
}

/**
 * 获取SEO配置
 * @returns {Object} SEO元数据配置
 */
export function getSEOConfig() {
  return portfolioConfig.seo
}

/**
 * 获取主题配置
 * @returns {Object} 主题相关配置
 */
export function getThemeConfig() {
  return portfolioConfig.theme
}

/**
 * 获取页脚配置
 * @returns {Object} 页脚配置
 */
export function getFooterConfig() {
  return portfolioConfig.footer
}

/**
 * 获取精选项目
 * @returns {Array} 标记为featured的项目列表
 */
export function getFeaturedProjects() {
  return portfolioConfig.projects.items.filter(project => project.featured)
}

/**
 * 根据ID获取单个项目
 * @param {number} id - 项目ID
 * @returns {Object|null} 项目对象或null
 */
export function getProjectById(id) {
  return portfolioConfig.projects.items.find(project => project.id === id) || null
}

/**
 * 获取社交媒体链接
 * @returns {Array} 社交媒体链接数组
 */
export function getSocialLinks() {
  return portfolioConfig.contact.social
}

/**
 * 生成结构化数据
 * @returns {Object} JSON-LD格式的结构化数据
 */
export function getStructuredData() {
  const { personal, skills, contact } = portfolioConfig
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personal.name,
    "jobTitle": personal.title,
    "description": personal.subtitle,
    "url": portfolioConfig.seo.siteUrl,
    "sameAs": contact.social.map(social => social.url),
    "knowsAbout": skills.categories.map(skill => skill.name),
    "worksFor": {
      "@type": "Organization",
      "name": "Freelancer"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personal.location
    },
    "email": personal.email
  }
}