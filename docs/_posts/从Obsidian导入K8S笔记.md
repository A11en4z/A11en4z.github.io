---
title: 从 Obsidian 导入 K8S 笔记
date: 2026-07-20 09:20:00
permalink: /pages/obsidian-import/
categories:
  - 指南
tags:
  - Obsidian
  - 导入
article: true
sidebar: auto
---

# 从 Obsidian 导入 / 更新 K8S 笔记

当前 K8S 专栏已填入 [A11en4z/k8s-tutorials](https://github.com/A11en4z/k8s-tutorials) 的教程正文。若你还有 Obsidian 私有笔记，可继续叠加导入。

## 目录约定

```text
docs/01.云原生/01.K8S/
  00.K8S练习手册索引.md
  01.准备工作.md
  ...
```

访问：[云原生目录](/cloud/) · 锚点 [K8S](/cloud/#K8S)

## 一键导入 Obsidian

```bash
export OBSIDIAN_K8S_DIR="$HOME/Documents/Obsidian/你的库/K8S"
npm run import:obsidian
```

脚本会复制 `.md`、补 front matter，并简单转换 `[[双链]]`。导入后建议检查图片路径与标题序号。
