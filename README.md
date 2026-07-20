# Allen Space（私有）

个人知识库，基于 [vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)。

站点已加访问口令门禁，并建议将本仓库设为 **Private**，避免源码公开。

## 请你立刻做：把仓库设为私有

我这边的 token **没有权限**改可见性，需要你在网页上操作：

1. 打开 https://github.com/A11en4z/A11en4z.github.io/settings  
2. 拉到最下方 **Danger Zone**  
3. **Change repository visibility** → **Make private**

> 说明：GitHub Free 下，即便仓库 Private，Pages 网址仍可能被公网打开；因此站点另加了访问口令。若你有 GitHub Pro / Enterprise，还可在 Pages 设置里把站点可见性改为 Private。

## 本地开发

```bash
npm install
npm run dev
npm run build
```

## Obsidian 导入

```bash
export OBSIDIAN_K8S_DIR="$HOME/你的库/K8S"
npm run import:obsidian
```

## 部署

推送到 `main` 后 Actions 发布到 `gh-pages`。Pages Source 保持 **gh-pages** 即可。
