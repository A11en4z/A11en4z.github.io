---
title: 迁移说明：从 Hexo 到 Vdoing 知识库
date: 2026-07-20 09:30:00
permalink: /pages/migration-hexo-vdoing/
categories: 
  - 指南
tags: 
  - 迁移
sidebar: auto
---

# 迁移说明：从 Hexo 到 Vdoing 知识库

## 为什么换

原先 `a11en4z.github.io` 是 **Hexo + NexT** 生成的静态站，适合发博文，但缺少参考站那种「目录页 + 多级侧边栏」的知识库体验。

目标风格站点使用 **VuePress + vuepress-theme-vdoing**，因此本仓库改为同一技术栈：

- 自动按文件夹序号生成侧边栏
- 目录页支持 `#K8S` 这类锚点跳转
- Markdown 即 Obsidian 笔记，几乎零转换成本

## 你需要做的两件事

1. **导入笔记**：把 Obsidian 里 K8S 文件夹路径交给 `npm run import:obsidian`
2. **打开 Pages**：合并本 PR 到 `main` 后，在 GitHub 把 Pages 源改为 `gh-pages` 分支

旧 Hexo 文章若还要保留，可把对应 Markdown 源文件放进 `docs/_posts/`。
