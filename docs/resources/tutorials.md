# 精选教程

一句话：优先看官方文档、官方示例和长期维护资料；社区教程只作补充，遇到版本差异以官方为准。

## LLM 理论与实践

### Google LLM 入门课程

地址：[https://developers.google.com/machine-learning/crash-course/llm](https://developers.google.com/machine-learning/crash-course/llm)

用途：

- 从 Token、上下文和 Transformer 开始理解大语言模型。
- 适合读完本站 [AI 基础概念](/ai/basics) 后继续学习。
- 官方课程会持续更新，概念和示例以当前页面为准。

### Hugging Face LLM Course

地址：[https://huggingface.co/learn/llm-course/en/chapter1/1](https://huggingface.co/learn/llm-course/en/chapter1/1)

用途：

- 系统学习 Transformer、Tokenizer、推理、微调和模型使用。
- 配合 Hugging Face 模型、数据集和代码示例进行实践。
- 课程以英文和 Python 为主，适合已经理解 [大模型入门](/llm/basics) 的读者。

### Hugging Face Agents Course

地址：[https://huggingface.co/learn/agents-course/en/unit0/introduction](https://huggingface.co/learn/agents-course/en/unit0/introduction)

用途：

- 学习 Agent、工具调用、Agentic RAG 和评估。
- 配合本站 [RAG 与 Agent](/llm/rag-agent) 理解实践流程。
- 框架和课程依赖变化较快，运行代码前确认当前单元版本。

## AI 绘画先看什么

如果刚开始学 AI 绘画，建议按这个顺序看：

1. 先用 ComfyUI 官方教程跑通文生图。
2. 再学习 LoRA、ControlNet 和工作流示例。
3. 最后再看模型卡、许可证和训练资料。

教程更新很快。阅读时要注意教程发布时间、工具版本、模型版本、节点版本和下载来源。

## ComfyUI 入门

### ComfyUI 官方中文文档

地址：[https://docs.comfy.org/zh](https://docs.comfy.org/zh)

用途：

- 了解 ComfyUI 的界面、节点和基础概念。
- 查找官方维护的中文教程入口。
- 遇到社区教程说法不一致时，用官方文档做基准。

### 文生图教程

地址：[https://docs.comfy.org/zh/tutorials/basic/text-to-image](https://docs.comfy.org/zh/tutorials/basic/text-to-image)

用途：

- 跑通最基础的 text-to-image 流程。
- 理解 checkpoint、prompt、采样器和输出节点之间的关系。
- 适合第一次接触 ComfyUI 的用户。

### 工作流模板

地址：[https://docs.comfy.org/zh/interface/features/template](https://docs.comfy.org/zh/interface/features/template)

用途：

- 学习如何复用模板。
- 区分模板、工作流和单个节点设置。
- 适合已经能打开 ComfyUI、但还不会管理流程的人。

## ComfyUI 工作流

### LoRA 教程

地址：[https://docs.comfy.org/zh/tutorials/basic/lora](https://docs.comfy.org/zh/tutorials/basic/lora)

用途：

- 学习在 ComfyUI 中加载 LoRA。
- 理解 LoRA 权重和基础模型的关系。
- 排查 LoRA 不生效、风格过强或模型不匹配的问题。

### ControlNet 教程

地址：[https://docs.comfy.org/zh/tutorials/controlnet/controlnet](https://docs.comfy.org/zh/tutorials/controlnet/controlnet)

用途：

- 学习用参考图控制姿势、结构或边缘。
- 理解 ControlNet 不是单纯提示词增强，而是图像条件控制。
- 适合开始做可控构图和图生图流程时阅读。

### ComfyUI 官方示例工作流

地址：[https://comfyanonymous.github.io/ComfyUI_examples/](https://comfyanonymous.github.io/ComfyUI_examples/)

用途：

- 查看可直接参考的官方示例流程。
- 学习不同任务需要哪些节点组合。
- 对照自己的工作流排查节点缺失或连接错误。

## WebUI / A1111

### AUTOMATIC1111 官方 Wiki

地址：[https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)

用途：

- 查找 Stable Diffusion WebUI 的官方说明。
- 理解 WebUI 的功能入口、扩展和参数。
- 适合使用 A1111 而不是 ComfyUI 的用户。

### 功能说明

地址：[https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features)

用途：

- 查看 WebUI 主要功能列表。
- 对照界面理解 txt2img、img2img、inpaint、extras 等模块。
- 学习参数含义时作为索引使用。

## 模型与训练

### Hugging Face Model Cards

地址：[https://huggingface.co/docs/hub/en/model-cards](https://huggingface.co/docs/hub/en/model-cards)

用途：

- 学习如何阅读模型卡。
- 核对许可证、用途限制、训练数据说明和推荐用法。
- 下载模型前先看这一类信息。

### Diffusers LoRA 训练

地址：[https://huggingface.co/docs/diffusers/en/training/lora](https://huggingface.co/docs/diffusers/en/training/lora)

用途：

- 理解 LoRA 训练的官方技术路线。
- 了解训练脚本、数据集、显存和参数之间的关系。
- 适合有一定 Python 和命令行基础后再看。

### kohya-ss/sd-scripts

地址：[https://github.com/kohya-ss/sd-scripts](https://github.com/kohya-ss/sd-scripts)

用途：

- 查看常见 LoRA 训练脚本和参数说明。
- 学习训练前的数据准备、模型选择和输出格式。
- 适合进阶用户，不建议在没理解模型卡和许可证前直接照抄训练流程。

## 中文补充

### ComfyUI Wiki 中文基础教程（社区资料）

地址：[https://comfyui-wiki.com/zh/tutorial/basic](https://comfyui-wiki.com/zh/tutorial/basic)

用途：

- 用中文快速了解 ComfyUI 基础流程。
- 作为官方文档之外的补充阅读。
- 遇到版本差异时，以 ComfyUI 官方文档和实际节点为准。

## 进阶与版本敏感资料

### ComfyUI FLUX.1 文生图

地址：[https://docs.comfy.org/zh/tutorials/flux/flux-1-text-to-image](https://docs.comfy.org/zh/tutorials/flux/flux-1-text-to-image)

用途：

- 学习 FLUX.1 在 ComfyUI 中的基础文生图流程。
- 了解新模型对文件、节点和显存的要求。
- 适合已经跑通过 SDXL 或基础 ComfyUI 流程后再看。

### ComfyUI FLUX.2 Klein 指南

地址：[https://docs.comfy.org/zh/tutorials/flux/flux-2-klein](https://docs.comfy.org/zh/tutorials/flux/flux-2-klein)

用途：

- 了解 FLUX.2 Klein 的 ComfyUI 使用方式。
- 对比新模型与传统 Stable Diffusion 工作流的差别。
- 这类教程版本变化快，使用前要确认模型文件和节点版本。

## 选择教程的原则

- 优先看官方文档和官方示例。
- 优先选择写清楚模型版本、工具版本、节点版本和参数的教程。
- 下载模型前先读模型卡和许可证。
- 不把未知来源模型、素材或训练数据用于公开或商业项目。
- 视频教程可以用来熟悉操作，但具体参数和链接要回到官方资料核对。
