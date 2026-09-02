---
description: '解释文本如何经过 Tokenizer 变成 Token ID 与向量，并区分 Token Embedding、语义 Embedding 和 Textual Inversion。'
---

# Tokenization 与 Embedding

> **一句话结论：** Tokenizer 先把文本映射为 Vocabulary 中的 Token ID，模型再把 ID 查表变成向量；通用语义 Embedding 和 AI 绘画中的 Textual Inversion 是相关但不同的概念。

## 前置知识

- 已阅读 [大模型入门](/llm/basics)，知道 LLM 会根据上下文预测后续 Token。
- 知道 Embedding 的直觉是把对象表示成可计算的向量。
- 不要求使用任何在线模型或商业 API。

## 学习目标

读完后，你应该能够：

- 解释 Tokenizer、Token、Vocabulary 和 Token ID 的关系。
- 描述文本从字符串变成模型输入向量的基本流程。
- 区分 Token Embedding、位置表示和通用语义 Embedding。
- 说明 Textual Inversion 为什么不能与通用 Embedding 混为一谈。
- 理解中英文 Token 数量没有固定换算比例，并判断它对上下文、延迟和成本的影响。

## 核心概念

### Tokenizer 和 Vocabulary

**Tokenizer** 是把字符串编码成 Token 序列、也把 Token 序列解码回文本的组件。它通常包含规范化、预切分、子词算法和特殊 Token 处理等步骤。

**Vocabulary** 是 Token 与整数 ID 的映射表。Vocabulary 里可能包含：

- 完整词或常见汉字。
- 词根、前后缀和子词片段。
- 标点、空格模式或字节片段。
- `[BOS]`、`[EOS]`、`[PAD]` 等特殊 Token。

不同模型可能使用 BPE、WordPiece、Unigram、SentencePiece 或字节级方案。即使输入文本完全相同，只要 Tokenizer 或 Vocabulary 不同，切分和 Token 数量就可能不同。

### 文本如何变成 Token ID

以常见子词 Tokenizer 为例，流程可以粗略理解为：

1. 规范化文本，例如处理 Unicode 或大小写；具体规则取决于模型。
2. 做预切分，例如识别空格、标点或字节边界。
3. 根据已训练好的子词规则组合或拆分片段。
4. 在 Vocabulary 中查出每个 Token 的整数 ID。
5. 按模型要求加入起止、分隔等特殊 Token。

Token ID 只是索引，不包含可直接解释的语义距离。ID 为 `120` 的 Token 不会天然比 ID 为 `20` 的 Token “多 100 单位含义”。

### Token Embedding 与位置表示

神经网络不能直接处理字符串。模型内部有一张 Token Embedding 矩阵，每个 Token ID 对应其中一行向量：

```text
Token ID -> 查 Embedding 矩阵 -> 初始 Token 向量
```

初始 Token Embedding 表示“这是哪个 Token”，但序列还需要位置信息。不同架构可能：

- 把可学习或固定的位置向量与 Token Embedding 相加。
- 在 Attention 中使用旋转位置编码（RoPE，一种给 token 注入位置信息的方法）。
- 使用相对位置偏置或其他位置机制。

经过多层 Transformer 后，每个位置得到的是结合上下文的隐藏状态。同一个 Token 在“苹果很好吃”和“苹果发布新品”中的初始 Token Embedding 可以相同，但后续上下文表示会不同。

### 通用 Embedding 与语义相似度

通用 Embedding 通常把一句话、一段文档、图片或其他对象编码成一个固定长度向量。它常用于：

- 语义搜索和 RAG 检索。
- 推荐、聚类和去重。
- 使用余弦相似度（衡量两个向量方向是否相近的常用方法）比较对象是否相关。

它与 Token Embedding 的差别在于用途和输出粒度：Token Embedding 是语言模型内部每个 Token 的初始表示；通用 Embedding 往往是为整段内容和相似度任务训练或汇总出的表示。

“向量相近”表示模型在训练目标下认为内容相似，不自动代表事实相同、立场一致或可以互相替代。

### Token、Embedding 与 Textual Inversion

（这个小节提前用到了 AI 绘画章节的“触发词”“文本编码器”概念；还没读到那里时，只需记住：绘画里的 Embedding 与本文讲的文本向量是两回事。）

在 AI 绘画中，Textual Inversion 会学习一小组向量，并用一个触发词把这些向量送入文本编码器，以表达某个视觉概念。

它不是：

- 新的通用分词算法。
- 可直接用于文档语义搜索的通用 Embedding 模型。
- LLM Vocabulary 中天然存在的普通词义。

因此，本知识库把 **Embedding** 用作通用向量嵌入，把 AI 绘画中的小型提示词嵌入明确称为 **Textual Inversion**。

### 中英文 Token 数量和成本影响

“一个汉字等于一个 Token”或“一个英文单词固定等于 1.3 个 Token”都不是通用规则。

Token 数量受以下因素共同影响：

- 模型的 Tokenizer、Vocabulary 和训练语料。
- 文本语言、词频、空格、标点和 Unicode 形式。
- 专有名词、代码、数字、罕见字和混合语言。
- 聊天模板额外加入的角色标记与特殊 Token。

常见英文词可能是一个 Token，也可能被拆成多个子词；常见汉字或词组可能独立成 Token，罕见字符也可能退回到多个字节 Token。正确做法是使用目标模型对应的 Tokenizer 实测。

Token 数量会影响：

- 是否超出上下文窗口。
- 输入预处理和模型计算量。
- 生成延迟与 KV Cache 内存。
- 按输入/输出 Token 计费的服务成本。

本地模型没有 API 账单，但仍会消耗计算时间、显存、内存和电力。

## 最小推演：从文本到向量

下面使用一个人为构造的 Vocabulary，不代表任何真实模型：

| Token | ID | 二维 Token Embedding |
| --- | ---: | --- |
| `[BOS]` | 0 | `[0.0, 0.0]` |
| `我` | 1 | `[0.2, 0.7]` |
| `喜欢` | 2 | `[0.6, 0.4]` |
| `机器` | 3 | `[0.8, 0.1]` |
| `学习` | 4 | `[0.7, 0.2]` |
| `。` | 5 | `[0.0, 0.1]` |

文本：

```text
我喜欢机器学习。
```

在这个玩具 Tokenizer 中：

```text
Token:    [BOS]  我  喜欢  机器  学习  。
Token ID:    0   1    2     3     4    5
```

ID `3` 会查到向量 `[0.8, 0.1]`。若这个玩具模型采用“位置向量直接相加”，位置 3 的向量是 `[0.0, 0.3]`，则送入第一层的表示为：

```text
[0.8, 0.1] + [0.0, 0.3] = [0.8, 0.4]
```

真实模型的向量通常有数百到数千维，位置机制也未必采用直接相加。这个推演只说明数据流：**字符串 → Token → ID → 初始向量 → 加入位置信息 → 上下文表示**。

## 对比表

把本页出现的概念放在一起对比：

| 概念 | 输入 | 输出 | 主要用途 | 语义相似度 |
| --- | --- | --- | --- | --- |
| Tokenizer | 字符串 | Token 或 Token ID 序列 | 文本编码与解码 | 否 |
| Token ID | 一个 Token | 整数索引 | 查表和序列表示 | 否 |
| Token Embedding | Token ID | 每个 Token 的初始向量 | 语言模型内部计算 | 非直接用途 |
| 位置表示 | 序列位置 | 位置相关信号 | 让模型区分顺序 | 否 |
| 通用 Embedding | 句子、文档、图片等 | 固定长度向量 | 搜索、聚类、RAG | 通常用于 |
| Textual Inversion | 训练图片与触发词 | 学到的提示词向量 | 触发图像生成概念 | 否 |

## 常见误区

- **“Token 就是字或单词”**：Token 由具体 Tokenizer 决定，可能是子词、标点或字节片段。
- **“Token ID 大小表示语义强弱”**：ID 只是 Vocabulary 索引。
- **“Embedding 就是一种固定算法”**：它是一类向量表示，模型、训练目标和粒度都可能不同。
- **“同一个词的向量永远相同”**：初始 Token Embedding 可以相同，但 Transformer 产生的上下文表示会随语境变化。
- **“中英文有固定 Token 换算比”**：必须用目标模型的 Tokenizer 对实际文本测量。
- **“Textual Inversion 可以直接做 RAG”**：它面向图像生成提示条件，不是通用文档检索模型。

## 自测问题

### 1. 为什么 Token ID 不能直接拿来计算语义距离？

<details>
<summary>查看答案</summary>

因为 Token ID 只是 Vocabulary 中的离散索引，编号差值没有语义含义。语义关系需要通过训练得到的向量表示及相应相似度方法衡量。

</details>

### 2. 同一段文本在两个模型里 Token 数量不同，是否一定有一个模型分错了？

<details>
<summary>查看答案</summary>

不一定。两个模型可能使用不同的规范化规则、子词算法和 Vocabulary，因此可以产生不同但各自有效的切分。

</details>

### 3. Token Embedding 和通用语义 Embedding 的主要区别是什么？

<details>
<summary>查看答案</summary>

Token Embedding 通常是语言模型内部每个 Token 的初始向量；通用语义 Embedding 通常把整句、文档或其他对象编码为适合相似度比较的固定长度向量。

</details>

## 下一步阅读

- 上一篇：[大模型入门](/llm/basics)：先知道 LLM 在预测什么，再看文本如何被切成 Token。
- 下一篇：[Transformer 直觉](/llm/transformer)：看 Token 向量进入模型后如何结合上下文形成表示。

## 官方或原始资料来源

- [Hugging Face LLM Course：Tokenizer](https://huggingface.co/learn/llm-course/chapter2/4)：官方课程中讲解 Tokenizer 的章节。
- [Hugging Face Tokenizers：Quicktour](https://huggingface.co/docs/tokenizers/quicktour)：Tokenizers 库的官方快速上手文档。
- [Sennrich 等：Neural Machine Translation of Rare Words with Subword Units](https://aclanthology.org/P16-1162/)：BPE 子词切分方法的原始论文。
- [Vaswani 等：Attention Is All You Need](https://arxiv.org/abs/1706.03762)：Transformer 架构的原始论文。
- [Mikolov 等：Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)：word2vec 词向量方法的原始论文。
- [OpenAI：tiktoken 开源 Tokenizer](https://github.com/openai/tiktoken)：OpenAI 的开源分词器仓库，可实测文本切分。
