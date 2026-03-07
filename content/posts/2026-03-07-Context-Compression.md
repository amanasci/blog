---
layout: posts
date: 2026-03-07
title: "Context Compression"
categories:
    - technical
synopsis: A detailed/brief description of context compression and techniques used in LLM era. 
---

Today we were talking about context compression and I just thought I should revisit the topic and read what has been happening in the field while also writing about it. This also helps me to process things better and this post will also be a good reference for me (and others) in the future. 

## What is Context Compression?

Context compression is formally defined as the algorithmic transformation of an extended input sequence into a shorter, highly optimized representation that preserves the functional utility and semantic integrity of the original text for downstream LLM processing. The primary objective is to navigate the efficiency-performance trade-off: minimizing the token footprint to reduce latency, lower KV cache memory requirements, and cut API costs, while strictly maintaining the model's ability to reason accurately over the compressed data.

Is that very technical? Yes, it is. But let's break it down.

In simple terms, context compression is the process of taking a long piece of text and making it shorter while still keeping the important information intact. This is especially useful when working with large language models (LLMs) that have a limited context window, meaning they can only process a certain number of tokens at a time. By compressing the context, we can fit more information into the model's context window, allowing it to reason over a larger amount of data without losing important details. 

Why not use models that have larger context windows? Well, models with larger context windows are typically more expensive to run and may not be as efficient. Context compression allows us to use smaller models while still being able to process large amounts of information effectively. Also such modles also suffer from acute attention decay, a phenomenon documented as "lost in the middle." Models disproportionately attend to information situated at the extreme beginning and end of a prompt, while failing to retrieve or process critical information buried in the center. In multi-turn agent interactions, this manifests as "loss-in-middle-turns," where intermediate tool outputs and file reads are effectively ignored by the model. 

## Techniques for Context Compression

So how do we perform context compression? There are several techniques that can be used, including:

1. **Summarization**: The most prevalent, albeit rudimentary, form of context compression leverages an LLM to distill verbose information into concise, abstractive summaries. When an interaction history or tool output exceeds a defined threshold, a secondary inference call generates a summary that subsequently replaces the raw text in the context array. While effective for condensing conversational dialogue, unstructured summarization frequently fails in the domain of software engineering. Technical precision requires the exact preservation of highly specific variables, file paths, syntax structures, and hex codes. Generic summarization algorithms inherently discard these elements as extraneous detail, leading to the irreversible loss of the agent's "artifact trail".

2. **Semantic Filtering and Self-Information Pruning**: To systematically eliminate redundancy without relying on opaque, generative summarization, researchers have developed semantic filtering techniques, most notably "Selective Context" and the "LLMLingua" framework. These methodologies conceptualize context through the lens of information theory, utilizing the metric of self-information (or surprisal) to evaluate the relative utility of individual tokens or lexical units. 

    The self-information $I(x)$ of a token is defined mathematically as its negative log-likelihood given the preceding context:
    $I(x) = -\log_2 P(x_t | x_0, x_1, \dots, x_{t-1})$. 

    In this theoretical framework, rare or highly specific tokens (such as a unique function name) carry high self-information, whereas predictable, repetitive tokens (such as syntactic boilerplate or conversational filler) carry low self-information. Systems employing this technique utilize a highly efficient, smaller base language model (e.g., LLaMA-7B or a compact GPT variant) to calculate the perplexity of the input prompt.  To prevent the generation of semantically fractured text, tokens are first merged into larger lexical units (such as noun phrases via SpaCy or complete sentences via NLTK). The system then applies percentile-based thresholding; lexical units with self-information values falling below a specific percentile are deemed redundant and pruned from the prompt. LLMLingua extends this paradigm by introducing a budget controller that applies varying compression rates to different segments of the prompt—for instance, aggressively compressing few-shot examples while strictly preserving system instructions. This rigorous pruning can achieve up to a 20x compression ratio with negligible performance degradation, reducing inference memory usage by approximately 36%. 
3. **Embedding-Based Retrieval and Soft Tokens**: A more advanced frontier in compression involves implicit, embedding-based architectures. Rather than extracting a subset of explicit text tokens, these methods encode long documents into a condensed sequence of dense vector embeddings, frequently referred to as "soft tokens" or "memory slots". Architectures such as AutoCompressor or Dynamic Allocation of Soft Tokens (DAST) process context chunks and map them into a latent space. The target LLM is then conditioned to attend directly to these dense vectors. This paradigm allows the model to theoretically ingest entire repositories or extensive documentation by converting them into a fixed-length latent context, bypassing the traditional text-token bottleneck entirely.

4. **Retrieval-Augmented Memory and Paging**: Drawing inspiration from operating system design, advanced agentic frameworks like MemGPT implement virtual context management. In this architecture, the LLM is granted explicit control over its own memory tiers. The system maintains distinct memory types: an "episodic memory" (raw historical interactions) and a "semantic memory" (structured facts and knowledge), both stored outside the active context window in a vector or relational database. The active context window functions analogously to RAM. When the agent recognizes a knowledge deficit, it utilizes explicit tool calls to page data in from long-term storage into the context window. Conversely, it can write synthesized learnings out to disk before the context window fills up. This dynamic swapping creates the illusion of an unbounded context length, enabling an AI coding assistant to maintain project state across weeks of development without overwhelming the immediate token budget.

    | Memory Tier | Storage Mechanism | Function in Agent Workflow|
    |-------------|-------------------|---------------------------|
    | Working Memory | Active context window (RAM) | Immediate execution, current user prompt, active file contents. |
    | Episodic Memory | Vector database or relational database | Chronological logs of past tool executions, failed attempts, and interactions. |
    | Semantic Memory | Knowledge Graph / DB | Extracted facts, architectural rules, environment configurations. |
    | Procedural Memory | System Prompts / Rulesets | Instructions detailing how to execute tasks and utilize tools. |
    | | | |

In summary, context compression is a critical area of research in the era of large language models, as it allows us to maximize the utility of limited context windows while maintaining performance. The techniques range from simple summarization to sophisticated embedding-based architectures and dynamic memory management systems. As LLMs continue to evolve, we can expect further innovations in context compression that will enable even more powerful and efficient AI agents.