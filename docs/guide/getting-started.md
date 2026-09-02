---
description: 'AI 综合知识库学习地图，按 AI 基础、大模型原理、应用实践、AI 绘画与资源五类主题查找内容，并提供按目标选读和一周入门建议。'
---

# 学习地图

> **一句话结论：** 本站是一份按主题查阅的手册；AI 基础提供共同概念，大模型原理、应用实践和 AI 绘画可以按目标选择，资源与术语表则适合在阅读过程中随时查阅。

## 前置知识

- 本页是全站地图，可以直接从这里开始，不要求先读任何其他页面。
- 不要求编程经验，也不要求数学基础；各页涉及的新术语都会先解释。
- 本页只帮助你找到入口和组合页面，具体概念以对应正文为准。

## 学习目标

读完后，你应该能够：

- 说出本站各主题分别回答什么问题。
- 根据当前目标选出最相关的几页，而不是被迫读完整站。
- 为零基础入门安排一周的可选练习，并留下可检查的产出。
- 遇到陌生概念时，知道该用搜索、术语表还是主题侧栏定位。

## 核心概念

### 知识库由哪些主题组成

本站的主题关系可以概括为：

```text
                    ┌─ 大模型原理 ──┐
共同基础（AI 基础） ├─ 应用实践      ├─ 按目标组合阅读
                    └─ AI 绘画 ─────┘
资源与术语表：阅读任何主题时都可以随时查阅
```

- **AI 基础。** [AI 基础概念](/ai/basics)、[机器学习入门](/ai/machine-learning)、[神经网络直觉](/ai/neural-networks)，用于理解模型、训练、参数、泛化和神经网络等共通知识。
- **大模型原理。** [大模型入门](/llm/basics)、[Tokenization 与 Embedding](/llm/tokenization-embedding)、[Transformer 直觉](/llm/transformer)、[推理与解码](/llm/inference-decoding)、[训练、微调与对齐](/llm/training-alignment)，用于理解文本怎样进入模型、回答怎样生成以及能力怎样形成。
- **应用实践。** [Prompt 入门](/prompting/basics)、[RAG 与 Agent](/llm/rag-agent)、[工作流和模板区别](/workflows/workflow-vs-template)、[常用工具](/tools/common-tools)，用于把模型能力组织成明确、可验证、可复用的任务流程。
- **AI 绘画。** [底模是什么](/concepts/base-model)、[AI 绘画由哪些部分组成](/concepts/components)、[基本原理](/concepts/how-it-works)、[常见模型生态](/models/ecosystems)、[LoRA 入门](/lora/basics)，用于理解图像生成系统及常见模型文件。
- **资源。** [常用网站](/resources/websites)、[精选教程](/resources/tutorials)、[术语表](/glossary)，用于查来源、找教程和确认词义，不需要单独“学完”。

### 如何选择入口

- 完全不确定从哪里开始：先读 [AI 基础概念](/ai/basics)，再用 [大模型入门](/llm/basics)了解当前主流生成式 AI 的整体图景。
- 已经有明确目标：直接从下面的“按目标选读”进入，对不熟悉的前置概念再回头补充。
- 只记得一个术语：优先用顶部搜索；仍不确定含义和关联时，再查[术语表](/glossary)。
- 正在使用某个产品：先在[常用工具](/tools/common-tools)判断它属于哪类，再去对应原理或实践页面。

### 每个主题读到什么程度就够用

- AI 基础：能区分 AI、机器学习、深度学习和模型，并解释过拟合与泛化。
- 大模型原理：能说清文本如何变成 Token、模型如何利用上下文、生成时采样参数改变了什么。
- 应用实践：能写出包含任务、上下文、输出格式和约束的 Prompt，并判断何时需要 RAG、工作流或 Agent。
- AI 绘画：能说出底模、VAE、采样器和 LoRA 的分工，并看懂最小文生图流程。
- 资源：知道怎样核对官方文档、版本和许可证，并保存可追溯的学习记录。

## 按目标选读

下面每一行都是独立入口；箭头只表示这条目标路线中的建议先后，不代表全站阅读顺序。

| 目标 | 建议组合 | 重点记住 |
| --- | --- | --- |
| 快速用上对话 AI | [AI 基础概念](/ai/basics) → [大模型入门](/llm/basics) → [Prompt 入门](/prompting/basics) → [常用工具](/tools/common-tools) | Token、上下文窗口、幻觉、结果验证 |
| 搞懂大模型原理 | [机器学习入门](/ai/machine-learning) → [神经网络直觉](/ai/neural-networks) → [大模型入门](/llm/basics) → [Tokenization 与 Embedding](/llm/tokenization-embedding) → [Transformer 直觉](/llm/transformer) → [推理与解码](/llm/inference-decoding) → [训练、微调与对齐](/llm/training-alignment) | 注意力、自回归生成、训练与推理 |
| 搭建 RAG 或 Agent | [大模型入门](/llm/basics) → [Tokenization 与 Embedding](/llm/tokenization-embedding) → [Prompt 入门](/prompting/basics) → [训练、微调与对齐](/llm/training-alignment) → [RAG 与 Agent](/llm/rag-agent) → [工作流和模板区别](/workflows/workflow-vs-template) | 检索质量、工具权限、失败路径 |
| 画 AI 插画 | [AI 基础概念](/ai/basics) → [底模是什么](/concepts/base-model) → [AI 绘画由哪些部分组成](/concepts/components) → [基本原理](/concepts/how-it-works) → [常见模型生态](/models/ecosystems) → [LoRA 入门](/lora/basics) | 底模、采样、生态兼容性、LoRA |
| 组织可复用任务 | [Prompt 入门](/prompting/basics) → [工作流和模板区别](/workflows/workflow-vs-template) → [RAG 与 Agent](/llm/rag-agent) → [常用工具](/tools/common-tools) | 输入输出、固定步骤、动态决策、审计 |

路线只是入口。读到不熟悉的概念时回到相关页面补充；已经掌握的内容可以跳过，不需要为了“完成进度”重复阅读。

## 动手试试：可选的一周入门

如果你还没有明确目标，可以用下面这条一周路线建立最小共同基础。它不是全站必修顺序，时间紧张时也可以整体拉长：

- **第 1-2 天**：读 [AI 基础概念](/ai/basics) 和 [机器学习入门](/ai/machine-learning)，用自己的话写 5 句话说明 AI、机器学习、深度学习、模型、训练和推理的关系。
- **第 3-4 天**：读 [大模型入门](/llm/basics)，用常见对话助手做三个小实验：解释熟悉概念、总结长文、回答较新的事实问题，并核对结果。
- **第 5 天**：读 [Prompt 入门](/prompting/basics)，把角色、任务、上下文、输出格式、约束和示例用在一个真实小任务上。
- **第 6 天**：选择一个方向：读 [RAG 与 Agent](/llm/rag-agent)、[底模是什么](/concepts/base-model)或[工作流和模板区别](/workflows/workflow-vs-template)。
- **第 7 天**：使用搜索和[术语表](/glossary)整理本周仍不清楚的词，并决定接下来深入哪个主题。

一周结束时应留下：一页概念笔记、三份实验记录、一条改进过的 Prompt，以及一份“仍需查清”的术语清单。判断是否有收获，看这些产出能否说明你的理解，而不是看读了多少页。

## 不同背景读者怎么选

| 读者背景 | 建议入口 | 暂时不必深入 | 当前目标 |
| --- | --- | --- | --- |
| 完全零基础 | [学习地图](/guide/getting-started) → [AI 基础概念](/ai/basics) → [大模型入门](/llm/basics)，然后选择一个主题 | 神经网络和 Transformer 的推演细节 | 建立概念图并找到主方向 |
| 有编程经验 | [大模型入门](/llm/basics)、[推理与解码](/llm/inference-decoding)、[训练、微调与对齐](/llm/training-alignment)、[RAG 与 Agent](/llm/rag-agent) | 已熟悉的机器学习直觉内容 | 理解模型的工程行为与成本 |
| 主要使用 AI 绘画 | [底模是什么](/concepts/base-model)、[AI 绘画由哪些部分组成](/concepts/components)、[基本原理](/concepts/how-it-works)、[常见模型生态](/models/ecosystems)、[LoRA 入门](/lora/basics) | 大模型原理的大部分页面 | 看懂工作流并定位出图问题 |
| 主要使用对话模型 | [大模型入门](/llm/basics)、[Prompt 入门](/prompting/basics)、[RAG 与 Agent](/llm/rag-agent)、[常用工具](/tools/common-tools) | AI 绘画专题 | 稳定地交付任务并验证结果 |

这些入口不是身份标签。需求变化时直接切换主题即可；不需要先把原来的方向全部读完。

## 常见误区

- **“必须从首页一路读到最后一页”**：不同目标需要的知识组合不同；只要补齐当前页面标出的前置概念，就可以直接进入相关主题。
- **“背会提示词模板就能用好 AI”**：Prompt 是任务说明而不是咒语；不理解模型、数据和工具之间的关系，换个任务就容易失效。
- **“演示或训练时的表现就是真实效果”**：真实效果要结合验证数据、测试数据和自己的任务来看。
- **“调高 Temperature、Top-p 模型就更聪明”**：采样参数只改变输出的选择方式，不会增加知识或推理能力。
- **“回答流畅就说明内容正确”**：流畅和正确是两回事，重要结论需要自行核对来源。
- **“接入 RAG 或 Agent 就会自动可靠”**：检索质量、权限控制和失败路径决定实际效果，接入不等于可靠。

## 自测问题

### 1. 为什么这份知识库不要求所有人采用同一条阅读路线？

<details>
<summary>查看答案</summary>

因为大模型原理、应用实践和 AI 绘画解决的问题不同，它们只共享一部分基础概念。按当前目标组合页面更容易形成完整认识，也能避免为了“完成顺序”阅读暂时用不到的内容。

</details>

### 2. 如果目标是 AI 绘画，应从哪些页面进入？为什么仍建议了解 AI 基础？

<details>
<summary>查看答案</summary>

可以从底模、模型组成、基本原理、模型生态和 LoRA 这组页面进入。绘画模型同样涉及模型、训练、推理和提示条件；先了解 AI 基础，会更容易理解这些共同概念，但不要求先学完大模型原理。

</details>

### 3. 一周入门结束时，怎样判断自己是否有收获？

<details>
<summary>查看答案</summary>

不看读了几页，而看能否用自己的话复述概念关系，并留下概念笔记、实验记录、改进过的 Prompt 和待查术语清单。能准确指出自己还不懂什么，也是一种有效产出。

</details>

## 关联阅读

- **返回总览：** [首页](/)介绍本站定位与全部主题入口。
- **共同基础：** [AI 基础概念](/ai/basics)适合不确定起点时先读。
- **随时查词：** [术语表](/glossary)汇总各主题中的常见术语。

## 官方或原始资料来源

以下资料适合在选定主题后继续深入，不必一次全部阅读：

- [Google：Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)：Google 官方机器学习速成课程，对应 AI 基础。
- [3Blue1Brown：Neural Networks](https://www.3blue1brown.com/topics/neural-networks)：可视化的神经网络系列视频，辅助建立基础直觉。
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)：Hugging Face 官方大模型课程，对应大模型原理。
- [Hugging Face：Diffusers 文档](https://huggingface.co/docs/diffusers/index)：扩散模型官方文档，对应 AI 绘画主题。
