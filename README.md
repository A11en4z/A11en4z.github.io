# Allen Space

个人博客 / 知识库，基于 [vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)，风格对齐 [结构化笔记站（含 K8S 目录）](https://2290653824.github.io/other/#K8S)。

在线地址（合并并切换 Pages 后）：https://a11en4z.github.io/  
K8S 目录：https://a11en4z.github.io/cloud/#K8S

## 已完成

- 从 Hexo 静态站迁移为 VuePress Vdoing 源码站
- 导入 [A11en4z/k8s-tutorials](https://github.com/A11en4z/k8s-tutorials) 全套笔记到 `docs/01.云原生/01.K8S/`
- GitHub Actions：推送后构建并发布到 `gh-pages`

## 本地开发

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
```

## 叠加 Obsidian 笔记（可选）

```bash
export OBSIDIAN_K8S_DIR="$HOME/你的库/K8S"
npm run import:obsidian
```

## 部署注意

仓库 **Settings → Pages → Source** 需设为 **gh-pages** 分支（根目录）。当前若仍指向 `main`，合并本分支并等待 Actions 成功后切换即可。
