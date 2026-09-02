import { defineConfig } from 'vitepress'

const siteUrl = 'https://ai-knowledge-base.maaoding.icu'
const siteName = 'AI 综合知识库'
const socialImageUrl = `${siteUrl}/assets/home-hero.png`

function canonicalUrlFor(relativePath: string) {
  const normalizedPath = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  const route = normalizedPath === 'index' ? '' : normalizedPath.replace(/\/index$/, '')

  return route ? `${siteUrl}/${route}` : `${siteUrl}/`
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 综合知识库',
  description: '面向零基础用户的 AI 基础、LLM 理论、Prompt、工具与 AI 绘画知识库',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: siteUrl
  },
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) return []

    const canonicalUrl = canonicalUrlFor(pageData.relativePath)
    const isHome = pageData.relativePath === 'index.md'
    const structuredData = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: siteName,
          description,
          inLanguage: 'zh-CN'
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          '@id': `${canonicalUrl}#article`,
          url: canonicalUrl,
          headline: pageData.title,
          description,
          inLanguage: 'zh-CN',
          mainEntityOfPage: canonicalUrl,
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: siteName
          }
        }

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:site_name', content: siteName }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: socialImageUrl }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '760' }],
      ['meta', { property: 'og:image:alt', content: 'AI 综合知识库主视觉' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: socialImageUrl }],
      ['meta', { name: 'twitter:image:alt', content: 'AI 综合知识库主视觉' }],
      [
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(structuredData).replace(/</g, '\\u003c')
      ]
    ]
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }]
  ],
  themeConfig: {
    logo: '/assets/logo.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未能找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '显示详细列表',
            hideDetails: '隐藏详细列表',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    nav: [
      { text: '入门', link: '/guide/getting-started' },
      { text: 'AI 基础', link: '/ai/basics' },
      { text: 'LLM', link: '/llm/basics' },
      { text: 'AI 绘画', link: '/concepts/base-model' },
      { text: '工具', link: '/tools/common-tools' },
      { text: '资源', link: '/resources/websites' }
    ],
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '首页', link: '/' },
          { text: '入门路线', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'AI 基础',
        items: [
          { text: 'AI 基础概念', link: '/ai/basics' },
          { text: '机器学习入门', link: '/ai/machine-learning' },
          { text: '神经网络直觉', link: '/ai/neural-networks' }
        ]
      },
      {
        text: 'LLM 理论',
        items: [
          { text: '大模型入门', link: '/llm/basics' },
          { text: 'Tokenization 与 Embedding', link: '/llm/tokenization-embedding' },
          { text: 'Transformer 直觉', link: '/llm/transformer' },
          { text: '推理与解码', link: '/llm/inference-decoding' },
          { text: '训练、微调与对齐', link: '/llm/training-alignment' },
          { text: 'RAG 与 Agent', link: '/llm/rag-agent' }
        ]
      },
      {
        text: 'AI 绘画',
        items: [
          { text: '底模是什么', link: '/concepts/base-model' },
          { text: 'AI 绘画由哪些部分组成', link: '/concepts/components' },
          { text: '基本原理', link: '/concepts/how-it-works' },
          { text: '常见模型生态', link: '/models/ecosystems' },
          { text: 'LoRA 入门', link: '/lora/basics' }
        ]
      },
      {
        text: 'Prompt 与工作流',
        items: [
          { text: 'Prompt 入门', link: '/prompting/basics' },
          { text: '工作流和模板区别', link: '/workflows/workflow-vs-template' }
        ]
      },
      {
        text: '工具',
        items: [
          { text: '常用工具', link: '/tools/common-tools' }
        ]
      },
      {
        text: '资料',
        items: [
          { text: '常用网站', link: '/resources/websites' },
          { text: '精选教程', link: '/resources/tutorials' },
          { text: '术语表', link: '/glossary' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/maaoding/ai-knowledge-base' }
    ],
    footer: {
      message: '面向公开发布的 AI 入门资料。请遵守模型、素材、数据与平台许可。',
      copyright: 'Copyright © 2026'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新'
    },
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    notFound: {
      theme: '404',
      title: '页面不存在',
      quote: '你访问的地址可能已更改或从未存在，从首页重新出发吧。',
      linkText: '返回首页',
      link: '/'
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    skipToContentLabel: '跳转到内容'
  }
})
