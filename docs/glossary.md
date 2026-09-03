---
description: '汇总 AI、LLM、Prompt、RAG、Agent 与 AI 绘画常见术语，提供简明定义、关联概念和延伸阅读入口。'
---

# 术语表

术语按英文字母序排列，解释与本站正文口径一致，条目末尾附对应的正文页面；遇到生词时可以随时回查本页。

## Activation Function

激活函数。作用在神经元加权和上的非线性函数，使多层神经网络能够表示复杂关系。常见例子包括 ReLU、Sigmoid、Tanh，以及输出层常用的 Softmax。详见 [神经网络直觉](/ai/neural-networks)。

## Agent

围绕目标规划步骤并调用工具的 AI 应用形态。Agent 的执行能力来自模型、工具接口、权限和控制流程，不等于模型拥有独立意识。详见 [RAG 与 Agent](/llm/rag-agent)。

## Alignment

对齐。通过指令微调、偏好训练和安全约束等方法，让模型行为更符合人类目标、表达习惯和使用边界。对齐不能保证事实永远正确。详见 [训练、微调与对齐](/llm/training-alignment)。

## Attention

注意力机制。模型处理一个 Token 时，通过 Query、Key、Value 计算它与上下文中其他 Token 的相关性权重，再按权重加权汇总信息，形成结合上下文的新表示。详见 [Transformer 直觉](/llm/transformer)。

## Backpropagation

反向传播。从输出层向前高效计算损失对各参数的梯度，通常与梯度下降或其他优化器配合训练神经网络。反向传播负责计算梯度，不等同于参数更新算法。详见 [神经网络直觉](/ai/neural-networks)。

## Base Model

基础模型。在 LLM 中通常指尚未完成特定指令对齐的通用预训练模型；在 AI 绘画中也用于说明 checkpoint 或 LoRA 所属的模型生态。详见 [底模是什么](/concepts/base-model)。

## Benchmark

基准测试。公开的标准考试（如 MMLU、HumanEval、SWE-bench），用于横向比较模型的大致能力段位。分数不能直接预测具体任务的表现，可能存在数据污染与任务分布差异；最终应以自己的固定测试集验证。详见 [效果评估](/prompting/evaluation)。

## Bias

偏置。神经元在加权输入之外学习的平移参数，使激活门槛不必固定经过原点。这里的 Bias 是模型参数，不等同于数据偏差或算法公平性语境中的偏见。详见 [神经网络直觉](/ai/neural-networks)。

## Chain-of-Thought

思维链。让模型在给出最终答案前先生成中间思考步骤的做法；推理模型把这类思考作为生成输出的一部分。思考 Token 同样占用上下文窗口、产生成本，也会出错。详见 [推理与解码](/llm/inference-decoding)。

## CFG

CFG（Classifier-Free Guidance，无分类器引导）。AI 绘画中控制模型听提示词程度的参数：太低容易跑题，过高可能颜色过饱和、结构僵硬，应从模型卡推荐值起步。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Checkpoint

保存某一训练阶段模型权重和相关状态的文件。AI 绘画中常见扩展名包括 `.safetensors` 和 `.ckpt`，日常说“换底模”通常就是换一个 checkpoint 文件。详见 [底模是什么](/concepts/base-model)。

## Chunk

文档切分后的片段。RAG 通常先把长文档拆成 Chunk，再建立索引和检索。切分过细会丢失上下文，过大则可能降低检索精度。详见 [RAG 与 Agent](/llm/rag-agent)。

## CLIP

常见文本/图像编码模型。在 AI 绘画中经常负责把提示词编码成模型可用的信息。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Context Window

上下文窗口。模型单次推理可以处理的 Token 范围，通常包含系统指令、用户输入、历史消息、检索资料、工具结果和待生成内容。详见 [推理与解码](/llm/inference-decoding)。

## ControlNet

结构控制模块，可以用姿势、线稿、深度图等条件控制生成结果。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Cross-Attention

交叉注意力。注意力机制的一种形式，用在一边是图像、一边是文字的场景：AI 绘画中，去噪网络通过交叉注意力在每个去噪步骤参考提示词的条件向量，决定画面该往哪个方向清理。详见 [基本原理](/concepts/how-it-works)。

## Decoding

解码。LLM 根据每一步的 Logit 或概率分布选择下一个 Token 的过程。Greedy、Temperature、Top-k 和 Top-p 都会影响选择方式，但不会为模型增加新知识。详见 [推理与解码](/llm/inference-decoding)。

## Denoising Strength / 去噪强度

去噪强度（Denoising Strength，常简称 Denoise）。图生图和局部重绘中的常见参数：决定在原图噪声基础上改动多大，数值越高，改动越大。详见 [基本原理](/concepts/how-it-works)。

## DiT

DiT（Diffusion Transformer，扩散 Transformer）。用 Transformer 架构充当去噪网络的扩散模型结构。FLUX、Qwen-Image 等新一代绘画模型采用这类架构，与 U-Net 时代的插件和 LoRA 生态不直接通用。详见 [底模是什么](/concepts/base-model)。

## DPO

DPO（Direct Preference Optimization，直接偏好优化）。与 RLHF 使用同样人类偏好数据的对齐方法：跳过显式的奖励模型，直接用“好回答应当优于坏回答”的比较信号调整参数。流程更简单、训练更稳定。详见 [训练、微调与对齐](/llm/training-alignment)。

## Embedding

向量嵌入。把文本、图片或其他对象转换成可计算的向量表示，使语义相近的内容在向量空间中更接近。常用于搜索、推荐、聚类和 RAG。详见 [Tokenization 与 Embedding](/llm/tokenization-embedding)。

## Feature

特征。模型用于做预测的输入信息，例如邮件中的链接数量、图片像素或用户行为统计。特征是否与目标相关、能否在真实推理时获得，会直接影响模型质量。详见 [机器学习入门](/ai/machine-learning)。

## Fine-tuning

微调。在预训练模型基础上继续使用特定数据训练，以改变模型的任务能力、格式、语气或领域行为。需要更新知识时不一定适合用微调，常应先评估 RAG。详见 [训练、微调与对齐](/llm/training-alignment)。

## Function Calling

模型按约定结构生成函数名和参数，由应用程序验证后调用真实函数。模型提出调用意图，程序负责权限、执行、错误处理和结果回传。详见 [RAG 与 Agent](/llm/rag-agent)。

## GAN

GAN（Generative Adversarial Network，生成对抗网络）。由生成器与判别器互相博弈训练的生成模型，一步直接输出图像。与扩散模型的多步去噪思路不同，训练更难稳定；当前不少放大、修复工具内部仍在使用。详见 [基本原理](/concepts/how-it-works)。

## Generalization

泛化。模型把训练中学到的规律正确应用到未见数据的能力。训练集分数高不代表泛化好，需要使用独立验证集、测试集和真实场景检查。详见 [机器学习入门](/ai/machine-learning)。

## Gradient Descent

梯度下降。根据损失函数的梯度反方向逐步更新参数的优化方法。学习率控制每步更新幅度；实际训练常使用小批量梯度下降、Adam 等变体。详见 [神经网络直觉](/ai/neural-networks)。

## Hallucination

幻觉。模型生成了流畅、看似合理但缺少依据或事实错误的内容。检索、工具和 Prompt 可以降低风险，但仍需要来源与结果验证。详见 [大模型入门](/llm/basics)。

## Inference

推理。使用训练完成的模型处理输入并生成预测或内容的阶段。普通用户的大多数模型调用都属于推理。详见 [推理与解码](/llm/inference-decoding)。

## KV Cache

Key-Value Cache。自回归生成时保存过去 Token 在各 Transformer 层产生的 Key 和 Value，以减少后续 Token 的重复计算。它通常以更多显存或内存换取更快解码，不会扩大上下文窗口。详见 [推理与解码](/llm/inference-decoding)。

## Label

标签。监督学习样本中希望模型预测的目标答案，例如“垃圾邮件”、物体类别或房屋成交价。错误、泄漏或不一致的标签会直接限制模型质量。详见 [机器学习入门](/ai/machine-learning)。

## Latent

Latent（潜空间表示）。模型内部的压缩图像表示。主流绘画模型在潜空间里去噪，最后由 VAE 解码成像素图；潜空间尺寸也决定了出图的分辨率习惯。详见 [基本原理](/concepts/how-it-works)。

## LLM

Large Language Model，大语言模型。它根据上下文处理和生成 Token，可用于问答、写作、代码、信息抽取和工具调用，但不会自动保证事实正确。详见 [大模型入门](/llm/basics)。

## LLM-as-a-Judge

用模型给模型阅卷：把待评输出和评分量规交给一个模型，让它打分并说明理由，适合批量初筛。judge 存在位置偏差、长度偏好和自我偏好，重要决策仍需人工抽查校准。详见 [效果评估](/prompting/evaluation)。

## Logit

模型输出层产生的未归一化分数。Softmax 可以把一组 Logit 转换为概率分布；Logit 本身不是概率，也不代表现实事实为真的可能性。详见 [推理与解码](/llm/inference-decoding)。

## LoRA

Low-Rank Adaptation，低秩适配。通过训练少量附加参数调整模型行为。它既可用于 LLM 微调，也常用于给图像底模追加角色、画风、服装或概念。详见 [LoRA 入门](/lora/basics)。

## Loss Function

损失函数。把预测与训练目标之间的差距转换成可优化数值，为参数更新提供方向。训练损失较低不保证业务指标、事实性或泛化一定更好。详见 [神经网络直觉](/ai/neural-networks)。

## MCP

MCP（Model Context Protocol，模型上下文协议）。把 LLM 应用与外部工具、数据源的对接标准化的开放协议：工具方按协议暴露能力，兼容的宿主可通过 MCP 客户端发现和调用；具体功能、权限、认证与版本兼容仍取决于实现。它不取代 Function Calling，标准化的是工具的发现、描述与对接层。详见 [RAG 与 Agent](/llm/rag-agent)。

## Model Card

模型卡。记录模型用途、训练背景、评估、限制、许可证和推荐用法的说明文档。下载或部署模型前应优先阅读。详见 [常见模型生态](/models/ecosystems)。

## Multimodal

多模态。同一个模型能同时处理文字与图片、音频等多种形式的输入输出；本站为讲清原理把文字与图像分开讲解，真实产品正在走向融合。详见 [大模型入门](/llm/basics)。

## Negative Prompt

负向提示词。AI 绘画中单独填写“希望减少或避免的内容”的提示词，由工具以专门机制注入条件，比在 LLM Prompt 里写“不要 X”更有效，但同样不是万能修复器。详见 [Prompt 入门](/prompting/basics)。

## Neural Network

神经网络。把带有权重、偏置和激活函数的计算单元分层连接起来，通过前向计算产生预测，并在训练时利用损失、反向传播和优化器调整参数。详见 [神经网络直觉](/ai/neural-networks)。

## Overfitting

过拟合。模型过度适应训练数据中的细节与噪声，训练表现很好，但在验证集、测试集或真实新数据上表现变差。详见 [机器学习入门](/ai/machine-learning)。

## Pre-training

预训练。用海量文本等数据、以“预测下一个 Token”为目标训练出通用基座模型的阶段，决定模型的基础能力。预训练学到的是“语料里怎么写”，不是“什么是对的”。详见 [大模型入门](/llm/basics)。

## Prompt

提示或任务说明。LLM Prompt 通常包含角色、任务、上下文、输出格式、约束和示例；图像 Prompt 常描述主体、场景、风格和构图，并可能区分正向与负向提示词。详见 [Prompt 入门](/prompting/basics)。

## Prompt Injection

提示注入。把恶意指令藏进模型会读到的内容（网页、文档、检索片段、工具返回）里，诱导模型当成任务指令执行。RAG 与 Agent 会放大其后果，防护靠权限最小化、高危操作人工确认与调用审计。详见 [RAG 与 Agent](/llm/rag-agent)。

## Quantization

量化。把模型权重从高精度数字压缩成低精度存储与计算的方法，用少量质量损失换取更小的显存和内存占用，是本地工具运行开源模型的常用手段。详见 [常用工具](/tools/common-tools)。

## RAG

Retrieval-Augmented Generation，检索增强生成。先从外部资料中检索相关片段，再把资料放入上下文供模型回答。详见 [RAG 与 Agent](/llm/rag-agent)。

## Reasoning Model

推理模型。在给出最终答案前先生成中间思考 Token 的模型（这里的“推理”指 Reasoning 多步思考，注意与指 Inference 的“推理”区分），如 o1/o3、DeepSeek-R1、Qwen 思考系列。擅长可分步验证的任务；思考 Token 会增加延迟与成本。详见 [推理与解码](/llm/inference-decoding)。

## Reinforcement Learning

强化学习。智能体在环境中采取动作，并根据奖励或惩罚学习策略的机器学习方式。奖励可以延迟出现，因此重点是连续决策的长期结果。详见 [机器学习入门](/ai/machine-learning)。

## Reward Model

奖励模型。用人类偏好比较数据训练出的打分模型，把“哪个回答更好”变成可自动计算的分数，供 RLHF 等对齐方法在训练循环中使用。它替代的是训练阶段的人工打分，不是模型上线后的实时裁判。详见 [训练、微调与对齐](/llm/training-alignment)。

## RLHF

RLHF（Reinforcement Learning from Human Feedback，基于人类反馈的强化学习）。对齐方法：让模型对同一问题生成多个回答，人类比较好坏形成偏好数据，训练奖励模型打分，再用强化学习让主模型生成更高分的回答。详见 [训练、微调与对齐](/llm/training-alignment)。

## safetensors

safetensors。为安全设计的模型权重存储格式，不夹带可执行代码；旧的 `.ckpt` 格式理论上可被塞入恶意代码，来源不明的文件优先避开。同一扩展名下可能是 checkpoint、LoRA、VAE 等不同内容，按模型页说明判断。详见 [常见模型生态](/models/ecosystems)。

## Sampler

采样器。扩散模型中决定每一步去噪怎么走的算法，与调度器配合使用；换采样器改变细节与稳定感的表现方式，没有绝对好坏。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Scheduler

调度器，控制去噪过程中噪声强度的变化方式。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Seed

随机种子。固定 seed 可以复现相近结果，便于比较参数。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Self-Attention

自注意力。同一段输入内部的 Token 互相关注，从而形成包含上下文关系的新表示。详见 [Transformer 直觉](/llm/transformer)。

## SFT

SFT（Supervised Fine-Tuning，指令微调）。用成对的“指令-回答”示例继续训练预训练模型，让它学会按指令完成任务、遵守输出格式。它教的是“怎么用”预训练能力，不是往模型里塞新知识。详见 [训练、微调与对齐](/llm/training-alignment)。

## Supervised Learning

监督学习。使用带标签样本训练模型，让模型学习从特征到标签的映射，常用于分类和回归。详见 [机器学习入门](/ai/machine-learning)。

## Temperature

温度。解码时用大于 0 的数缩放 Logit：较低值使概率分布更尖锐，较高值使分布更平坦。它调节采样随机性，不会提升模型知识或事实准确性。详见 [推理与解码](/llm/inference-decoding)。

## Test Set

测试集。在模型和超参数基本确定后用于最终评估的独立数据。若反复根据测试结果调参，测试集会失去独立性。详见 [机器学习入门](/ai/machine-learning)。

## Test-time Compute

测试时计算。参数训练完成后固定不变，通过在推理阶段投入更多计算换取更好的结果，常见形式包括更长的思考预算、Best-of-N 采样和验证器筛选。代价是延迟与 Token 成本上升。详见 [推理与解码](/llm/inference-decoding)。

## Text Encoder

文本编码器，把提示词转换成模型可以理解的数字表示。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Textual Inversion

AI 绘画中的小型提示词嵌入，用少量学习到的向量触发特定概念或改善某类输出。它是 Embedding 的一种具体应用，不等同于通用语义 Embedding。详见 [Tokenization 与 Embedding](/llm/tokenization-embedding)。

## Token

模型处理文本的基本单位。Token 不一定等于一个汉字或英文单词，标点、空格和词片段也可能分别编码。详见 [Tokenization 与 Embedding](/llm/tokenization-embedding)。

## Tokenizer

分词器。把字符串按特定规范化与子词规则编码成 Token ID 序列，也负责把 Token 解码回文本。不同模型的 Tokenizer 和 Vocabulary 可能不同。详见 [Tokenization 与 Embedding](/llm/tokenization-embedding)。

## Top-k

解码采样方法。每一步只保留概率最高的 `k` 个候选 Token，再重新归一化并采样。候选数量固定，不会自动适应概率分布的集中程度。详见 [推理与解码](/llm/inference-decoding)。

## Top-p

也称 Nucleus Sampling。按概率从高到低保留累计概率首次达到阈值 `p` 的最小候选集合，再重新归一化并采样；候选数量会动态变化。详见 [推理与解码](/llm/inference-decoding)。

## Training Set

训练集。用于计算损失并调整模型参数的数据。模型在训练集上的表现不能单独证明它能处理未见数据。详见 [机器学习入门](/ai/machine-learning)。

## Transformer

现代 LLM 的核心神经网络架构，通过 Attention、前馈网络、位置机制和多层堆叠处理序列信息。详见 [Transformer 直觉](/llm/transformer)。

## Trigger Words

触发词。训练时绑定给某个概念的“开关词”：使用 LoRA 或 Textual Inversion 时写上触发词，模型才会调用对应概念，具体词表以模型页说明为准。详见 [LoRA 入门](/lora/basics)。

## U-Net

U-Net。以卷积为主的网络结构，SD1.5 与 SDXL 两代绘画模型用它充当去噪网络；在 DiT 类架构出现前，它是扩散模型去噪网络的主流选择。详见 [底模是什么](/concepts/base-model)。

## Unsupervised Learning

无监督学习。使用没有预先标签的数据寻找结构、相似性或低维表示，常见任务包括聚类和降维。模型发现的组仍需结合领域知识解释。详见 [机器学习入门](/ai/machine-learning)。

## VAE

变分自编码器。负责在 latent 和最终图片之间转换。详见 [AI 绘画由哪些部分组成](/concepts/components)。

## Validation Set

验证集。训练过程中用于比较方案、选择超参数、阈值或停止时机的数据，不应直接参与参数拟合。详见 [机器学习入门](/ai/machine-learning)。

## Vector Database

向量数据库。保存和检索 Embedding 的系统，常用于语义搜索和 RAG。它解决的是向量存储与相似度检索，不负责判断资料真假。详见 [RAG 与 Agent](/llm/rag-agent)。

## Vocabulary

词表。Tokenizer 可使用的 Token 与整数 ID 的映射集合，通常包含子词、符号、字节片段和特殊 Token。Vocabulary 不同会导致同一文本的切分结果不同。详见 [Tokenization 与 Embedding](/llm/tokenization-embedding)。

## WebUI

AI 绘画图形界面。常用于指 Stable Diffusion WebUI，也可以泛指浏览器里的本地绘图界面。详见 [常用工具](/tools/common-tools)。

## Weight

权重。神经网络中控制输入影响强度和方向的可训练参数。单个权重的绝对值不应脱离网络结构、缩放和上下文直接解释为“重要性”。详见 [神经网络直觉](/ai/neural-networks)。

## Workflow

工作流。把多个步骤按顺序组织起来、可包含条件分支和工具调用的执行流程；模板是它的可复用起点。在 ComfyUI 中通常表现为节点图。详见 [工作流和模板区别](/workflows/workflow-vs-template)。
