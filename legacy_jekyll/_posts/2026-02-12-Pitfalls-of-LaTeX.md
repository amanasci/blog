---
layout: posts
date: 2026-02-12
title: "Pitfalls of LaTeX"
categories:
    - technical
synopsis: A brief discussion on the pitfalls of using LaTeX and how to avoid them.
---

LaTeX is a powerful typesetting system that is widely used in academia for writing papers, theses, and books. However I recently learnt quite a few things about LaTeX and I thought it would be good to share them here. These are not some things that will affect general users like you and me but at scale they might really become nightmares. 

So, I was recently reading a blog post from Zerodha Tech about their tech stack to send daily trading reports to their clients. The size of these PDFs are quite varaible in nature. While someone's report might be of few pages, some can have few thousand pages. 

They were using puppeteer to generate PDFs using a headless chrome from HTML. Then they later switched to using LaTeX to generate PDFs. They got an obvious 10x improvement in speed (I mean who in theor right mind would use puppeteer to generate PDFs? ) but they also got some other benefits like better formatting and better control over the output. But they also got some pitfalls. pdfLaTeX is not really good at handling large documents. It can easily run out of memory and crash. Moreover, it can also produce some weird errors that are hard to debug. Why? This was also not clear to me before reading this but apparently pdflatex lacks support for dynamic memory allocation. 

I mean why would you even think about compliling thousands of pages using pdflatex? I don't know. But they had to do it and they had to find a solution to this problem. The solution they found was to use LuaLaTeX instead of pdfLaTeX. LuaLaTeX is a modern version of LaTeX that is built on top of the Lua scripting language. It has support for dynamic memory allocation and it can handle large documents without crashing. Moreover, it also has better support for Unicode and it can produce better output. So, if you are using LaTeX to generate PDFs, make sure you are using LuaLaTeX instead of pdfLaTeX. It will save you a lot of headaches in the long run. However, while rendering large tables, it sometimes broke and produced indecipherable stack traces which were very challenging to understand and debug. Moreover the docker container they used were also large due to the dependencies of LaTex, so making the cold start time quite high. 

Solution? Switching to Typst! Typst is a modern typesetting system that is built on top of Rust. It has support for dynamic memory allocation and it can handle large documents without crashing. Moreover, it also has better support for Unicode and it can produce better output. So, if you are using LaTeX to generate PDFs, make sure you are using Typst instead of LaTeX. It will save you a lot of headaches in the long run. So that's all for this post. I'll post something again if I find something fun and new. 

Also there are no batch PDF signing FOSS tools yet.  So this can also be a good project to work on.

<br> <br>
Signing out<br>
amanasci