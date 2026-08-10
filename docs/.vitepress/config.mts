import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 综合知识库',
  description: '面向零基础用户的 AI 基础、LLM 理论、Prompt、工具与 AI 绘画知识库',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }]
  ],
  themeConfig: {
    logo: '/assets/logo.png',
    search: {
      provider: 'local'
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
          { text: 'AI 基础概念', link: '/ai/basics' }
        ]
      },
      {
        text: 'LLM 理论',
        items: [
          { text: '大模型入门', link: '/llm/basics' },
          { text: 'Transformer 直觉', link: '/llm/transformer' },
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
      label: '本页目录'
    }
  }
})
