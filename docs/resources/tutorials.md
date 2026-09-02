---
description: '精选 AI 基础、LLM、Prompt、ComfyUI 与 LoRA 教程，按官方优先、版本匹配和可验证原则筛选学习资料。'
---

# 精选教程

> **一句话结论：** 优先跟官方文档、官方示例和长期维护的课程；社区教程只作补充，遇到版本差异以官方资料为准——挑对教程只是开始，把教程跟完并变成自己的练习才算学会。

本页链接与描述核对于 2026 年 9 月；教程与版本更新较快，使用前请以官方页面为准。

## 前置知识

- 已阅读 [常用网站](/resources/websites)，知道官方课程、模型平台和官方文档各解决什么问题。
- 不要求已安装 ComfyUI、WebUI 或任何编程环境；本页讲怎么挑教程、怎么跟教程，不替代教程本身。
- 先接受一个边界：教程与版本更新很快，本页条目以官方稳定来源为主，遇到描述与实际页面不一致时，以官方当前页面为准。

## 学习目标

读完后，你应该能够：

- 按自己的目标（补概念、学工具、学训练）选出对应类型的教程。
- 用发布时间、版本标注和来源可信度判断一篇教程是否还值得跟。
- 按“先跑通最小流程、再逐步加环节”的顺序安排 AI 绘画的学习路径。
- 把跟完的教程转化为可复查的笔记与练习产出。
- 在社区教程与官方资料说法冲突时，判断以哪边为准。

## 核心概念

### 如何按教程类型选

教程大体分三类：**概念课程**补理论，**工具实操**练上手，**模型与训练**进阶。零基础先从概念课程或官方入门文档起步，不要一上来就照抄进阶训练脚本。下面按类型列出精选条目。

#### LLM 理论与实践

- **Google LLM 入门课程**（地址：[https://developers.google.com/machine-learning/crash-course/llm](https://developers.google.com/machine-learning/crash-course/llm)）
  - 从 Token、上下文和 Transformer 开始理解大语言模型，适合读完本站 [AI 基础概念](/ai/basics) 后继续学习。
  - 官方课程会持续更新，概念和示例以当前页面为准。

- **Hugging Face LLM Course**（地址：[https://huggingface.co/learn/llm-course/chapter1/1](https://huggingface.co/learn/llm-course/chapter1/1)）
  - 系统学习 Transformer、Tokenizer、推理、微调和模型使用，配合 Hugging Face 模型、数据集和代码示例进行实践。
  - 课程以英文和 Python 为主，适合已经理解 [大模型入门](/llm/basics) 的读者。

- **Hugging Face Agents Course**（地址：[https://huggingface.co/learn/agents-course/en/unit0/introduction](https://huggingface.co/learn/agents-course/en/unit0/introduction)）
  - 学习 Agent、工具调用、Agentic RAG 和评估，配合本站 [RAG 与 Agent](/llm/rag-agent) 理解实践流程。
  - 框架和课程依赖变化较快，运行代码前确认当前单元版本。

#### ComfyUI 入门

- **ComfyUI 官方中文文档**（地址：[https://docs.comfy.org/zh](https://docs.comfy.org/zh)）
  - 了解 ComfyUI 的界面、节点和基础概念，查找官方维护的中文教程入口。
  - 遇到社区教程说法不一致时，用官方文档做基准。

- **文生图教程**（地址：[https://docs.comfy.org/zh/tutorials/basic/text-to-image](https://docs.comfy.org/zh/tutorials/basic/text-to-image)）
  - 跑通最基础的 text-to-image 流程，理解 checkpoint、prompt、采样器和输出节点之间的关系。
  - 适合第一次接触 ComfyUI 的用户。

- **工作流模板**（地址：[https://docs.comfy.org/zh/interface/features/template](https://docs.comfy.org/zh/interface/features/template)）
  - 学习如何复用模板，区分模板、工作流和单个节点设置。
  - 适合已经能打开 ComfyUI、但还不会管理流程的人。

#### ComfyUI 工作流

- **LoRA 教程**（地址：[https://docs.comfy.org/zh/tutorials/basic/lora](https://docs.comfy.org/zh/tutorials/basic/lora)）
  - 学习在 ComfyUI 中加载 LoRA，理解 LoRA 权重和基础模型的关系。
  - 排查 LoRA 不生效、风格过强或模型不匹配的问题。

- **ControlNet 教程**（地址：[https://docs.comfy.org/zh/tutorials/controlnet/controlnet](https://docs.comfy.org/zh/tutorials/controlnet/controlnet)）
  - 学习用参考图控制姿势、结构或边缘，理解 ControlNet 不是单纯提示词增强，而是图像条件控制。
  - 适合开始做可控构图和图生图流程时阅读。

- **ComfyUI 官方示例工作流**（地址：[https://comfyanonymous.github.io/ComfyUI_examples/](https://comfyanonymous.github.io/ComfyUI_examples/)）
  - 查看可直接参考的官方示例流程，学习不同任务需要哪些节点组合。
  - 对照自己的工作流排查节点缺失或连接错误。

#### WebUI / A1111

- **AUTOMATIC1111 官方 Wiki**（地址：[https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki)）
  - 查找 Stable Diffusion WebUI 的官方说明，理解 WebUI 的功能入口、扩展和参数。
  - 适合使用 A1111 而不是 ComfyUI 的用户。

- **功能说明**（地址：[https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features)）
  - 查看 WebUI 主要功能列表，对照界面理解 txt2img、img2img、inpaint、extras 等模块。
  - 学习参数含义时作为索引使用。

#### 模型与训练

- **Hugging Face Model Cards**（地址：[https://huggingface.co/docs/hub/en/model-cards](https://huggingface.co/docs/hub/en/model-cards)）
  - 学习如何阅读模型卡，核对许可证、用途限制、训练数据说明和推荐用法。
  - 下载模型前先看这一类信息。

- **Diffusers LoRA 训练**（地址：[https://huggingface.co/docs/diffusers/en/training/lora](https://huggingface.co/docs/diffusers/en/training/lora)）
  - 理解 LoRA 训练的官方技术路线，了解训练脚本、数据集、显存和参数之间的关系。
  - 适合有一定 Python 和命令行基础后再看。

- **kohya-ss/sd-scripts**（地址：[https://github.com/kohya-ss/sd-scripts](https://github.com/kohya-ss/sd-scripts)）
  - 查看常见 LoRA 训练脚本和参数说明，学习训练前的数据准备、模型选择和输出格式。
  - 适合进阶用户，不建议在没理解模型卡和许可证前直接照抄训练流程。

#### 中文补充

- **ComfyUI Wiki 中文基础教程（社区资料）**（地址：[https://comfyui-wiki.com/zh/tutorial/basic](https://comfyui-wiki.com/zh/tutorial/basic)）
  - 用中文快速了解 ComfyUI 基础流程，作为官方文档之外的补充阅读。
  - 遇到版本差异时，以 ComfyUI 官方文档和实际节点为准。

#### 进阶与版本敏感资料

- **ComfyUI FLUX.1 文生图**（地址：[https://docs.comfy.org/zh/tutorials/flux/flux-1-text-to-image](https://docs.comfy.org/zh/tutorials/flux/flux-1-text-to-image)）
  - 学习 FLUX.1 在 ComfyUI 中的基础文生图流程，了解新模型对文件、节点和显存的要求。
  - 适合已经跑通过 SDXL 或基础 ComfyUI 流程后再看。

- **ComfyUI FLUX.2 Klein 指南**（地址：[https://docs.comfy.org/zh/tutorials/flux/flux-2-klein](https://docs.comfy.org/zh/tutorials/flux/flux-2-klein)）
  - 了解 FLUX.2 Klein 的 ComfyUI 使用方式，对比新模型与传统 Stable Diffusion 工作流的差别。
  - 这类教程版本变化快，使用前要确认模型文件和节点版本。

如果刚开始学 AI 绘画，建议按这个顺序看：先用 ComfyUI 官方教程跑通文生图；再学习 LoRA、ControlNet 和工作流示例；最后再看模型卡、许可证和训练资料。教程更新很快，阅读时注意教程发布时间、工具版本、模型版本、节点版本和下载来源。

### 怎么判断教程质量

挑教程时用这几条原则过一遍，能滤掉大半过时和低质资料：

- 优先看官方文档和官方示例。
- 优先选择写清楚模型版本、工具版本、节点版本和参数的教程。
- 下载模型前先读模型卡和许可证。
- 不把未知来源模型、素材或训练数据用于公开或商业项目。
- 视频教程可以用来熟悉操作，但具体参数和链接要回到官方资料核对。

### 怎么把教程变成自己的练习

看懂不等于会做，把教程变成练习有三个动作：

- **跟一遍，再改一遍**：先严格照教程跑通，再把示例换成自己的素材或任务重做一次，差异就是理解缺口。
- **记录版本与参数**：把教程标题、链接、访问日期、工具与模型版本、关键参数记进笔记，以后排查问题先查这份记录。
- **一次只改一个变量**：教程跑通后固定其他条件，单独调一个参数看结果变化，把“教程结论”验证成“自己的结论”。

## 动手试试：跟完一个教程的正确姿势

1. 选定一个与当前目标匹配的教程，先通读一遍，确认教程版本与自己的环境对得上。
2. 建立记录：把教程标题、链接、访问日期、工具与模型版本写进笔记。
3. 严格照做第一遍，只跑通最小流程，不中途加戏。
4. 跑通后固定其他条件，一次只改一个变量做对照，并记录结果。
5. 把成功配置与失败报错都存档，各写一句“这个教程教会我什么”。
6. 隔一段时间回查官方文档，确认教程结论没有过时。

## 对比表

三种常见教程载体各有分工，按阶段配合使用：

| 维度 | 视频教程 | 图文教程 | 官方文档 |
| --- | --- | --- | --- |
| 上手方式 | 跟着画面操作，最直观 | 按步骤照做，可回查 | 系统读完，偏参考 |
| 信息密度 | 低，节奏由视频决定 | 中，可跳读可检索 | 高，覆盖参数最全 |
| 版本时效 | 最易过期，注意发布时间 | 看更新记录与评论 | 随版本更新，最可靠 |
| 适合阶段 | 熟悉界面与操作流程 | 第一次跑通完整流程 | 核对参数与排查问题 |
| 主要风险 | 截图与当前版本对不上 | 转载版可能被改动 | 对零基础偏枯燥 |

常见配合：先用视频或图文跑通流程，再回官方文档核对参数、补齐原理。

## 常见误区

- **“收藏了教程、倍速看完就等于学会了”**：收藏和倍速都只是完成了“看过”，能复述、能动手做出产出才算学会。
- **“最新教程一定最好”**：新教程常配套新模型、新节点，与你的环境和已有资料未必匹配，先看版本再决定；社区教程与官方文档说法冲突时，参数与兼容性以官方为准，社区经验用来补充操作细节。
- **“照抄训练脚本就能练出好 LoRA”**：数据准备、标注和版本配套比脚本本身更关键，进阶训练前先懂模型卡和许可证。
- **“下载来源无所谓，能出图就行”**：来源不明的模型与素材有安全与许可风险，下载前先看模型卡和许可证。

## 自测问题

### 1. 你想学 LoRA 训练，面前有社区视频教程、ComfyUI 官方文档和 kohya-ss 的 GitHub 仓库，先看哪个？为什么？

<details>
<summary>查看答案</summary>

先看官方资料定基准：官方文档讲清 LoRA 加载与参数含义，kohya-ss 仓库提供训练脚本与参数说明；社区视频只作操作演示的补充。训练类教程版本敏感，参数以官方说明为准，来源不明或版本不符的照抄容易翻车。

</details>

### 2. 一篇图文教程跑不通，应该按什么顺序排查？

<details>
<summary>查看答案</summary>

先看报错信息指出缺什么；再核对教程发布时间与你的工具、模型、节点版本是否一致；然后确认模型文件、VAE 等配套件是否齐全、下载来源是否正确；最后回到官方文档核对参数。仍不通时，换官方示例工作流做基准，再定位差异。

</details>

### 3. 怎么判断一篇教程讲的是不是你手上这个版本？

<details>
<summary>查看答案</summary>

看三点：教程是否写明工具版本、模型版本和节点版本；发布或更新时间距今多久；界面截图、参数名与你手上的版本是否对得上。对不上就以官方当前文档为准，不要硬套教程参数。

</details>

## 关联阅读

- **核对来源：** [常用网站](/resources/websites)汇总官方站点、模型平台与研究入口。
- **选择工具：** [常用工具](/tools/common-tools)帮助判断教程使用的工具是否适合当前任务。
- **随时查词：** [术语表](/glossary)解释 checkpoint、CFG、触发词等常见术语。

## 官方或原始资料来源

- [Google LLM 入门课程](https://developers.google.com/machine-learning/crash-course/llm)：Google 官方机器学习速成课程中的 LLM 单元。
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)：Hugging Face 官方 LLM 系统课程。
- [ComfyUI 官方中文文档](https://docs.comfy.org/zh)：ComfyUI 官方维护的中文文档与教程入口。
- [Hugging Face Model Cards 文档](https://huggingface.co/docs/hub/en/model-cards)：模型卡阅读与撰写的官方文档。
- [Hugging Face Diffusers LoRA 训练文档](https://huggingface.co/docs/diffusers/en/training/lora)：LoRA 训练的官方实践文档。
- [ComfyUI 官方示例工作流](https://comfyanonymous.github.io/ComfyUI_examples/)：ComfyUI 作者维护的官方示例集。
