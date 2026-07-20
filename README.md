# Allen Space

个人博客 / 知识库，基于 [vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)，风格对齐 [结构化笔记站（含 K8S 目录）](https://2290653824.github.io/other/#K8S)。

在线地址：https://a11en4z.github.io/

## 本地开发

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
```

## 目录结构（重点）

```text
docs/
  00.目录页/01.云原生.md          # 生成 /cloud/ 目录页，锚点 #K8S
  01.云原生/
    01.K8S/                       # ← 把 Obsidian K8S 笔记放这里
    02.Docker/
  _posts/                         # 碎片化博客文章
  index.md
```

访问示例：

- 云原生目录：`/cloud/`
- K8S 锚点：`/cloud/#K8S`（与参考站 `#K8S` 同类用法）

## 从 Obsidian 导入 K8S 笔记

```bash
export OBSIDIAN_K8S_DIR="$HOME/你的库/K8S"
npm run import:obsidian
```

详见站内文档：[从 Obsidian 导入 K8S 笔记](docs/_posts/从Obsidian导入K8S笔记.md)。

## 部署

推送到 `main` 后，GitHub Actions 构建并发布到 `gh-pages`。

请确认仓库 **Settings → Pages → Source** 为 **Deploy from a branch**，分支选 **gh-pages** / `/ (root)`。

> 原先 Hexo Next 的静态产物已移出源码树；本仓库改为 VuePress 源码 + Actions 部署。

## 参考

- 主题文档：https://doc.xugaoyi.com/
- 参考站：https://2290653824.github.io/other/#K8S
