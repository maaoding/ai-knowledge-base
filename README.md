# AI 综合知识库

面向零基础用户的 AI 综合知识库，使用 VitePress 编写，内容覆盖 AI 基础概念、LLM 理论、Prompt、工具、工作流和 AI 绘画专题。

公开站点定位为通用教程，不绑定私人本机路径，不提供盗版模型、侵权素材、规避平台规则或绕过安全限制的方法。

## 本地开发

```powershell
npm install
npm run docs:dev
```

默认本地预览地址：

```text
http://127.0.0.1:5173/
```

## 构建检查

```powershell
npm run docs:build
```

VitePress 构建产物位于：

```text
docs/.vitepress/dist
```

## 导出到 GitHub Pages 根目录

本仓库参考现有 GitHub Pages 项目，使用 `main` 分支根目录作为发布来源。

```powershell
npm run docs:export
```

该命令会：

- 构建 VitePress 文档。
- 把 `docs/.vitepress/dist` 的静态文件复制到仓库根目录。
- 写入 `.nojekyll` 和 `CNAME`。
- 生成 `.pages-manifest.json`，用于下次导出时清理旧产物。

部署前可运行：

```powershell
npm run deploy:check
```

## GitHub Pages

云端发布配置暂时保持现状，未随本次内容改名调整。

Pages 设置：

- Branch：`main`
- Folder：`/`
- Custom domain：`ai-drawing-guide.maaoding.icu`

DNS 记录应配置为：

```text
ai-drawing-guide.maaoding.icu CNAME maaoding.github.io
```

DNS 生效后，在 GitHub Pages 设置中启用 HTTPS。
