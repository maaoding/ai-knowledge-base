---
layout: home

hero:
  name: AI 综合知识库
  text: 从基础理论到工具与实践
  tagline: 先分清概念，再理解模型，最后动手实践——不堆链接，不追热点，全部从零讲起
  image:
    src: /assets/home-hero.png
    alt: AI 知识库主视觉
  actions:
    - theme: brand
      text: 开始入门
      link: /guide/getting-started
    - theme: alt
      text: 查看术语表
      link: /glossary

features:
  - title: AI 基础与 LLM 理论
    icon:
      src: /assets/icon-concepts.png
      alt: AI 基础与大模型图标
      width: 48
      height: 48
    details: 分清 AI、机器学习、深度学习和模型，理解 Token、Embedding、Transformer、推理解码与训练对齐，对应“AI 基础”和“LLM 理论”两栏共 9 页。
  - title: Prompt、RAG 与 Agent
    icon:
      src: /assets/icon-tools.png
      alt: Prompt、RAG 与 Agent 图标
      width: 48
      height: 48
    details: 学会用角色、任务、上下文、格式、约束、示例六要素把任务写清楚，理解模型如何借助外部资料和工具补足能力，对应“Prompt 与工作流”和“工具”两栏共 3 页。
  - title: AI 绘画与工作流
    icon:
      src: /assets/icon-workflow.png
      alt: AI 绘画与工作流图标
      width: 48
      height: 48
    details: 认识底模、模型组成与生成原理，学会挑选模型生态、使用 LoRA，并区分工作流与模板，对应“AI 绘画”栏共 5 页。
---

## 这份知识库适合谁

面向刚接触 AI 的中文读者：你可能听过大语言模型、Token、Embedding、RAG、Agent、Stable Diffusion、ComfyUI、LoRA 这些词，但说不清它们之间是什么关系，也不知道该先学哪个。

本站的做法是先讲清概念，再进入工具和实践。每页都以一个明确的结论开头，配上前置知识、学习目标、对比表和自测问题，可以按顺序通读，也可以当查阅手册用。理解概念之后，再去看教程、选模型、写 Prompt、搭工作流会省很多时间。

如果你已经有一定基础，也可以直接进入对应板块：每页开头的结论和文中的对比表方便快速定位，术语拿不准时查[术语表](/glossary)。

## 建议阅读顺序

1. 从 [入门路线](/guide/getting-started) 开始，建立总览，并按自己的背景选择路径。
2. AI 基础：[AI 基础概念](/ai/basics) → [机器学习入门](/ai/machine-learning) → [神经网络直觉](/ai/neural-networks)。
3. LLM 理论：[大模型入门](/llm/basics) → [Tokenization 与 Embedding](/llm/tokenization-embedding) → [Transformer 直觉](/llm/transformer) → [推理与解码](/llm/inference-decoding) → [训练、微调与对齐](/llm/training-alignment) → [RAG 与 Agent](/llm/rag-agent)。
4. AI 绘画：[底模是什么](/concepts/base-model) → [AI 绘画由哪些部分组成](/concepts/components) → [基本原理](/concepts/how-it-works) → [常见模型生态](/models/ecosystems) → [LoRA 入门](/lora/basics)。
5. 实践：[Prompt 入门](/prompting/basics) → [工作流和模板区别](/workflows/workflow-vs-template) → [常用工具](/tools/common-tools)。
6. 资源：浏览 [常用网站](/resources/websites) 与 [精选教程](/resources/tutorials)，遇到陌生词随时查 [术语表](/glossary)。

只想深入某个主题（例如只用对话模型或只做 AI 绘画）的读者，可以在 [入门路线](/guide/getting-started) 中找到跳读建议。顺序不是硬性要求，但每个阶段的概念会在后续阶段被反复使用；跳步之前，建议先确认要跳过的概念确实已经理解。

## 内容边界

本站按公开发布口径编写：

- 不提供盗版模型、侵权素材、绕过平台规则或规避安全限制的方法。
- 不以成人内容、攻击性用途、违法采集数据或滥用自动化为教程主线。
- 使用模型、数据、素材和 API 时，优先查看许可证、模型卡、隐私条款和平台规则；本站不替代这些文件的约束。
- 页面中出现的具体产品只作为类别举例，不代表推荐；使用时以当时的官方说明为准。

本站之外的内容随时可能更新，遇到与本站描述不一致的地方，以对应项目和平台的最新官方文档为准。
