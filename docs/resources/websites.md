---
description: '按官方文档、模型平台、工具框架与学习资源分类整理常用 AI 网站，并说明验证时效和许可证的方法。'
---

# 常用网站

> **一句话结论：** 这份清单按用途分组：先用官方课程补概念，再用平台查模型与论文，最后按工具找官方文档。下载或引用任何资源前，先读模型卡、许可证和官方当前说明——外部资源随时可能更新，遇到冲突以官方为准。

本页链接与描述核对于 2026 年 9 月；网站与平台迭代较快，使用前请以官方页面为准。

## AI 与 LLM 官方学习

这组解决“概念从哪学”：官方出品的系统课程，负责在动手之前把基础概念补齐。

### Google Machine Learning

地址：[https://developers.google.com/machine-learning](https://developers.google.com/machine-learning)

用途：

- 学习机器学习基础、数据、模型和大语言模型概念。
- 通过短课程建立从 Token 到 Transformer 的基础认识。
- 适合在阅读框架文档前补齐通用概念。

### Hugging Face LLM Course

地址：[https://huggingface.co/learn/llm-course/chapter1/1](https://huggingface.co/learn/llm-course/chapter1/1)

用途：

- 系统学习 Transformer、Tokenizer、推理和微调。
- 配合 Hugging Face 模型与数据生态进行实践。
- 课程以英文和代码为主，适合掌握本站基础概念后继续学习。

### Hugging Face Agents Course

地址：[https://huggingface.co/learn/agents-course/en/unit0/introduction](https://huggingface.co/learn/agents-course/en/unit0/introduction)

用途：

- 学习 Agent、Tool Use、Function Calling 和 Agentic RAG。
- 了解常见框架和评估方式。
- 内容更新较快，使用时注意课程单元和依赖版本。

## 模型与数据平台

这组解决“模型从哪来、怎么读说明”：下载前在这里核对模型卡、许可证和推荐参数。

### Hugging Face

地址：[https://huggingface.co](https://huggingface.co)

用途：

- 查找模型、数据集、演示和官方文档。
- 查看模型卡、许可证、文件结构和推荐用法。
- 比较不同任务、框架和模型版本。

下载或调用模型前先核对发布者、许可证、所需文件、量化格式和用途限制。

### Civitai

地址：[https://civitai.com](https://civitai.com)

用途：

- 查找 AI 绘画 checkpoint、LoRA、VAE、工作流和示例图。
- 查看示例 Prompt、推荐参数和社区反馈。

这是社区平台，模型质量、来源、许可证和内容分级差异很大，公开使用前要逐项核对。

## 论文与研究进展

这组解决“新知识从哪追踪”：查找原始论文，判断一个说法有没有出处。

### arXiv

地址：[https://arxiv.org](https://arxiv.org)

用途：查找 AI、机器学习、自然语言处理和计算机视觉论文预印本。预印本不等于已经同行评审，结论需要结合正式论文、代码和后续研究判断。

### Hugging Face Papers

地址：[https://huggingface.co/papers](https://huggingface.co/papers)

用途：按日浏览 AI 论文与社区讨论，跟踪研究方向。原来的 Papers with Code 站点已停止服务并跳转至此；论文是否可靠，仍需结合正式发表版本、代码与后续研究判断。

## RAG、Agent 与本地模型

这组解决“应用框架与本地部署的文档在哪”：把本站原理页对应到具体框架的官方文档。

### LangChain 文档

地址：[https://docs.langchain.com](https://docs.langchain.com)

用途：了解模型调用、工具、检索和 Agent 应用结构。框架 API 变化较快，示例代码必须对应当前文档版本。

### LlamaIndex 文档

地址：[https://docs.llamaindex.ai](https://docs.llamaindex.ai)

用途：学习文档加载、索引、检索、RAG 和 Agent 数据流程。

### Ollama

地址：[https://ollama.com](https://ollama.com)

用途：查看本地模型运行工具、支持模型和使用文档。下载模型前仍需阅读原始模型许可证和硬件要求。

## AI 绘画工具与项目

这组解决“绘画工具与模型发布在哪看”：工具、底模与官方公告的第一手来源。

### ComfyUI

地址：[https://github.com/Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI)

用途：

- 获取节点式 AI 绘画工具和发布说明。
- 学习工作流、节点数据流和模型支持情况。
- 排查自定义节点和核心版本兼容问题。

### Stability AI

地址：[https://stability.ai](https://stability.ai)

用途：了解 Stable Diffusion 相关模型与项目公告。

### Black Forest Labs

地址：[https://bfl.ai](https://bfl.ai)

用途：了解 FLUX 系列模型与相关发布。

## 文档建设

这组解决“本站怎么搭”：想维护自己的知识库，从这里开始。

### VitePress

地址：[https://vitepress.dev](https://vitepress.dev)

用途：搭建静态文档站、个人知识库和项目教程。

## 精选教程入口

这组解决“先看哪个教程”：完整清单见 [精选教程](/resources/tutorials)，这里只留三个最推荐的入口：

- [Google LLM 入门课程](https://developers.google.com/machine-learning/crash-course/llm)：建立大模型基础概念。
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)：继续学习 Transformer 与模型实践。
- [ComfyUI 官方中文文档](https://docs.comfy.org/zh)：进入 AI 绘画工作流。

## 使用外部资源的原则

- 优先看官方文档、模型卡和官方示例，并检查更新时间。
- 下载模型、数据或代码前确认发布者、许可证和用途限制。
- 不把未知来源模型、数据、角色或素材直接用于公开或商业项目。
- 记录来源、版本、访问日期和关键配置，保证以后可以复查。
- 社区教程用于补充操作经验，涉及参数、下载和兼容性时回到官方资料核对。

## 下一步阅读

- 下一篇：[精选教程](/resources/tutorials)：从“知道网站”到“跟着练”，按类型挑选入门教程。
