---
description: '解释大模型自回归生成、Logit、Temperature、Top-k、Top-p、上下文窗口、KV Cache 与推理成本。'
---

# 推理与解码

> **一句话结论：** 自回归 LLM 每次根据已有上下文计算下一个 Token 的 Logit，再按解码策略选出 Token 并重复；采样参数改变的是选择方式，不会给模型增加知识或推理能力。

## 前置知识

- 已阅读 [Tokenization 与 Embedding](/llm/tokenization-embedding)，知道文本会变成 Token ID 和向量。
- 已阅读 [Transformer 直觉](/llm/transformer)，知道 Attention 会利用上下文形成表示。
- 不要求安装模型；本页示例只用手工概率推演。

## 学习目标

读完后，你应该能够：

- 描述自回归生成从输入到停止的循环。
- 解释 Logit、Softmax 概率和“下一个 Token”的关系。
- 区分 Greedy、Temperature、Top-k 和 Top-p。
- 说明上下文窗口与 KV Cache 各自解决什么问题。
- 区分延迟、吞吐量和 Token 成本。
- 避免把采样参数当成事实性或能力开关。

## 核心概念

### 自回归生成

多数生成式 LLM 采用自回归（Autoregressive）方式生成文本：

1. Tokenizer 把输入编码成 Token ID。
2. 模型读取当前上下文，计算 Vocabulary 中每个候选 Token 的 Logit。
3. 解码策略选择一个下一个 Token。
4. 把新 Token 追加到上下文。
5. 重复计算，直到生成停止 Token、达到长度限制或触发其他停止条件。

模型一次通常只提交一个新 Token，但界面可能把多个 Token 合并后再显示，所以用户看到的流式文字不一定逐 Token 刷新。

### Logit、概率和下一个 Token

输出层会为 Vocabulary 中每个 Token 产生一个 **Logit**。Logit 是未归一化分数，可以是任意实数，不能直接当成概率。

Softmax 会把一组 Logit 转换为总和为 1 的概率分布。Logit 相对更高的 Token 会得到更高概率，但最终选谁取决于解码策略。

概率表达的是模型在当前参数和上下文下对候选 Token 的相对偏好，不是“这句话在现实中为真的概率”。

### Greedy、Temperature、Top-k 与 Top-p

#### Greedy Decoding

每一步都选择概率最高的 Token。结果通常确定、速度直接，但局部最优不保证整段文本最好，也可能产生重复或刻板输出。

#### Temperature

Temperature 在 Softmax 前缩放 Logit：

```text
调整后 Logit = 原 Logit / Temperature
```

- Temperature 小于 1：分布更尖锐，更偏向高分 Token。
- Temperature 等于 1：保持原分布。
- Temperature 大于 1：分布更平坦，低分 Token 更可能被抽到。

数学上 Temperature 应大于 0。某些界面用 `0` 表示近似确定性行为，这是实现约定；需要确定输出时，更准确的概念是关闭采样或使用 Greedy。

#### Top-k

只保留概率最高的 `k` 个 Token，再在其中重新归一化并采样。固定 `k` 不会根据当前分布的集中程度自动变化。

#### Top-p

也叫 Nucleus Sampling。按概率从高到低累加，保留累计概率首次达到阈值 `p` 的最小候选集合，再重新归一化并采样。分布集中时集合较小，分布分散时集合会扩大。

实现还可能包含重复惩罚、长度惩罚和最小概率等处理，具体执行顺序应以目标推理框架文档为准。

### 上下文窗口

上下文窗口是模型单次推理可处理的 Token 总量，通常需要容纳：

- 系统指令（System Prompt：平台或开发者预设的固定指令，用户看不到或不能改）与聊天模板。
- 用户输入和历史对话。
- RAG 检索片段与工具结果。
- 已生成内容以及预留的后续输出空间。

超过窗口时，框架可能报错、截断较早内容或使用滑动窗口。窗口更长会提高可容纳的信息量，也会增加内存和计算压力；但窗口大只说明装得多，不保证用得好——与任务无关的材料照样会拉低输出质量。

### KV Cache 的直觉

Transformer Attention 会为 Token 计算 Key 和 Value。自回归生成第 100 个 Token 时，前 99 个 Token 的很多中间结果已经计算过。

**KV Cache** 保存各层过去 Token 的 Key 和 Value，让下一步生成可以复用它们，而不必从头重复计算这些投影。它通常能明显加快逐 Token 解码，但代价是：

- 序列越长，缓存通常占用越多显存或内存。
- 批量越大，同时保存的缓存越多。
- KV Cache 不会扩大模型的上下文窗口。
- 它主要优化生成阶段的重复计算，首次处理整段输入的 Prefill（预填充，即把整段 Prompt 一次性算完前向的过程）仍需要计算输入 Token。

### 延迟、吞吐量和 Token 成本

- **首 Token 延迟（Time to First Token, TTFT）**：提交请求到看到第一个输出 Token 的时间，常受输入长度和 Prefill 影响。
- **逐 Token 延迟（Inter-token Latency）**：生成过程中相邻输出 Token 的等待时间。
- **吞吐量（Throughput）**：系统单位时间处理或生成多少 Token，批处理通常能提高总吞吐量，却可能增加单个请求等待。
- **Token 成本**：云服务可能分别计算输入、输出或缓存 Token；本地推理则对应计算、显存、内存和电力成本。

“更低延迟”和“更高吞吐量”不是同一个目标。面向单人实时对话时更关注首 Token 和逐 Token 延迟；批量离线任务更关注总吞吐量。

## 最小推演：三种候选 Token

假设模型对下一个 Token 给出三个 Logit：

| Token | Logit | Temperature = 1 时的概率 |
| --- | ---: | ---: |
| A | 2.0 | 66.5% |
| B | 1.0 | 24.5% |
| C | 0.0 | 9.0% |

Softmax 只关心相对差值。由此可以推演：

- **Greedy**：一定选择 A。
- **Temperature = 0.5**：概率约变为 A 86.7%、B 11.7%、C 1.6%，分布更尖。
- **Temperature = 2.0**：概率约变为 A 50.6%、B 30.7%、C 18.6%，分布更平。
- **Top-k = 2**：移除 C，再把 A、B 归一化为约 73.1% 和 26.9%。
- **Top-p = 0.8**：A 单独只有 66.5%，加入 B 后累计 91.0%，所以保留 A 与 B。
- **Top-p = 0.6**：A 已超过阈值，因此候选集合只剩 A。

这些操作只改变“从现有分布中怎样选”，不会修正错误知识。如果模型没有得到正确资料，调低 Temperature 可能只是让错误答案更稳定。

## 对比表

把本页的解码方法和相关概念放在一起对比：

| 方法或概念 | 主要作用 | 确定性 | 关键代价或风险 |
| --- | --- | --- | --- |
| Greedy | 每步选最高概率 Token | 高 | 可能重复、缺少多样性 |
| Temperature | 调整概率分布尖锐程度 | 取决于是否采样 | 过高会增加低概率输出 |
| Top-k | 限制为固定数量候选 | 通常采样 | 固定 k 不适应分布变化 |
| Top-p | 限制为动态累计概率集合 | 通常采样 | p 过高会保留长尾噪声 |
| 上下文窗口 | 限制一次可处理的 Token 总量 | 不适用 | 长上下文增加计算和内存 |
| KV Cache | 复用过去 Token 的 Key/Value | 不改变选择规则 | 以更多内存换取解码速度 |

## 常见误区

- **“Temperature 越低越准确”**：它只让分布更集中，不能增加事实依据。
- **“Top-p 和 Top-k 越大越聪明”**：它们只控制候选集合和随机性。
- **“Temperature = 0 是标准 Softmax”**：数学公式要求 Temperature 大于 0，`0` 往往是界面约定。
- **“KV Cache 会增加模型记忆长度”**：它优化重复计算，不改变上下文上限。
- **“上下文窗口全都可用于输出”**：输入、历史、工具结果和输出通常共同占用窗口。
- **“吞吐量高就代表每个用户更快”**：批处理可能提高总吞吐量，同时增加单请求排队时间。
- **“Token 数只影响账单”**：它也影响延迟、显存、内存和可容纳上下文。

## 自测问题

### 1. 模型把某个 Token 的概率设为 80%，是否表示包含该 Token 的事实有 80% 可能为真？

<details>
<summary>查看答案</summary>

不是。这个概率表示模型在当前上下文下对下一个 Token 的相对偏好，不是对现实事实真假的校准概率。

</details>

### 2. Top-k = 5 与 Top-p = 0.9 的候选数量有什么区别？

<details>
<summary>查看答案</summary>

Top-k 固定最多保留 5 个高概率候选；Top-p 保留累计概率达到 0.9 的最小集合，候选数量会随当前概率分布变化。

</details>

### 3. KV Cache 为什么能提速，又为什么会占用更多内存？

<details>
<summary>查看答案</summary>

它保存过去 Token 在各层计算出的 Key 和 Value，下一步生成可以复用，减少重复计算；这些缓存需要随序列、层数和批量保存在显存或内存中。

</details>

## 下一步阅读

- 上一篇：[Transformer 直觉](/llm/transformer)：先看 Attention 如何利用上下文，再看生成时如何逐 Token 选择。
- 下一篇：[训练、微调与对齐](/llm/training-alignment)：推理时参数固定；训练阶段正是把这些参数调整出来的过程。

## 官方或原始资料来源

- [Hugging Face Transformers：Generation strategies](https://huggingface.co/docs/transformers/generation_strategies)：解码策略（Greedy、采样、束搜索）的官方文档。
- [Hugging Face Transformers：Text generation API](https://huggingface.co/docs/transformers/main_classes/text_generation)：文本生成接口与参数的官方文档。
- [Hugging Face Transformers：Cache strategies](https://huggingface.co/docs/transformers/kv_cache)：KV Cache 等缓存机制的官方文档。
- [Hugging Face Transformers：LLM inference optimization](https://huggingface.co/docs/transformers/llm_optims)：推理优化与部署的官方指南。
- [Holtzman 等：The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)：提出 Top-p（Nucleus）采样的原始论文。
- [Vaswani 等：Attention Is All You Need](https://arxiv.org/abs/1706.03762)：Transformer 架构的原始论文。
