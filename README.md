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

`docs:build` 在构建之后会自动生成 RSS：`scripts/generate-rss.mjs` 读取 `docs/` 下的文章页（不含首页、学习地图、术语表与资源清单页）与各自最后一次 git 提交时间，取最近 20 篇写入 `docs/.vitepress/dist/rss.xml`（线上地址为 `/rss.xml`，页面 `<link rel="alternate">` 已指向它）。

## 部署检查

提交前可运行：

```powershell
npm run deploy:check
```

该命令等于「源校验 + 构建（含 RSS）+ 产物校验」：先由 `scripts/check-content.mjs` 校验 `docs/` 源文件，再跑一次 `docs:build`，最后由 `scripts/deploy-check.mjs` 只读校验 `docs/.vitepress/dist`。

`scripts/` 下三个脚本的分工：

- `check-content.mjs`：不构建，只校验 Markdown 源——文章必备模板块（description、一句话结论、前置知识、自测、带理由的关联阅读）、术语表回链与字母序、文字细节（全角空格、GB 单位空格、中文间单破折号连接号）；任一项不过就以非零状态退出。
- `generate-rss.mjs`：生成 `dist/rss.xml` 订阅源，由 `docs:build` 自动调用，不需要单独执行。
- `deploy-check.mjs`：不构建，只核对 `dist` 里的必需文件（`index.html`、`CNAME`、`.nojekyll`、`robots.txt`、`sitemap.xml`、`rss.xml`）、`CNAME` 域名、所有站内链接是否都有对应产物、站内链接的 `#锚点` 是否存在，以及 RSS 条目数量与链接可解析；任一项不过就以非零状态退出。

## GitHub Pages

GitHub 仓库与公开站点统一使用 AI 综合知识库名称。

推送到 `main` 后，[Pages 工作流](.github/workflows/pages.yml)会在 Node.js 24 环境中安装依赖、构建 VitePress，并且只把 `docs/.vitepress/dist` 上传为站点产物。

Pages 设置：

- Build source：GitHub Actions
- Repository：`maaoding/ai-knowledge-base`
- Custom domain：`ai-knowledge-base.maaoding.icu`

DNS 记录应配置为：

```text
ai-knowledge-base.maaoding.icu CNAME maaoding.github.io
```

DNS 生效后，在 GitHub Pages 设置中启用 HTTPS。
