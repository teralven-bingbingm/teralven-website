# Teralven Capital 官网

Teralven Capital LLC 的官网。风格参考 Radical Ventures 与 a16z：地平线晨光的首屏，衬线大标题配斜体。配色有两种模式：夜间黑金（默认）和日间象牙白（见下方"配色与日夜模式"）。

## 技术栈

- Next.js 15（App Router）、React 19、TypeScript
- CSS Modules，无 UI 框架、无图标库
- 字体：Newsreader（标题与长文）、Geist（正文与界面）、Geist Mono（数字与标签），通过 `next/font` 加载
- 所有页面静态预渲染，只有 `/api/contact` 是服务端接口

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000。开发模式用的是 Turbopack，改文件后刷新更快也更稳定。

同时跑第二个服务（例如预览用的 `npm run dev:preview`，或者测试构建）时，要让它用自己的文件夹：`NEXT_DIST_DIR=.next-preview`。两个服务共用 `.next` 会互相覆盖编译结果，浏览器里就会出现 "Hydration failed" 或 "Could not find the module … in the React Client Manifest" 这类报错。遇到了就停掉服务、删掉 `.next`、重新 `npm run dev`，并强制刷新浏览器。

## 页面

| 路径 | 内容 |
|---|---|
| `/` | 首页，顺序为：地平线首屏 → 公司使命与原则 → 七大投资领域 → All investments（被投公司 logo 格子）→ 观点文章 → 创始人 CTA。首屏和 CTA 之间都在"阅读底色"上，所以双色方案只在首屏后、CTA 前各过渡一次 |
| `/portfolio` | All investments：a16z 式 logo 格子，点击打开右侧 Company Profile 抽屉（公司达到 8 家时自动出现领域筛选和搜索） |
| `/focus` | 七大投资领域，每个领域的投资逻辑、看重什么、组合公司 |
| `/team` | 团队 |
| `/perspectives` | 观点文章列表，`/perspectives/<slug>` 为文章页 |
| `/pitch` | 创始人投递项目：四部分申请表（你、公司、融资、项目故事）+ 我们看重什么、之后的流程。导航右上角的 "Pitch us" 按钮就是这里 |
| `/contact` | 通用联系：留言表单（媒体、LP、招聘等），创始人会被引导到 `/pitch`。网站暂时不公开任何邮箱 |
| `/legal/disclosures`、`/legal/privacy`、`/legal/terms` | 免责声明、隐私政策、使用条款 |

## 改内容：只需要改 `content/` 目录

所有文字和数据都在 `content/`，组件里没有写死的文案。

| 文件 | 内容 |
|---|---|
| `content/site.ts` | 公司名、网址、社交链接、导航 |
| `content/portfolio.ts` | 投资组合。加一家公司就加一条，首页和 `/portfolio` 的格子会自动出现 |
| `content/focus.ts` | 七大投资领域的文案 |
| `content/firm.ts` | 使命与原则 |
| `content/palettes.ts` | 日夜两种模式，`PALETTE` 是首次访问看到的模式 |
| `content/pitch.ts` | Pitch 页的文案，以及表单里的选项（阶段、融资状态、从哪里知道我们、留言主题） |
| `content/team.ts` | 团队成员 |
| `content/perspectives.ts` | 文章（段落、小标题、引用、列表） |
| `content/legal.ts` | 三个法律页面的正文 |

文案里的小规则：`*星号*` 包起来的文字显示为斜体（品牌强调），标题里的 `|` 表示换行。例如 `"Seven arenas.|*One standard.*"`。文案不使用破折号（—），用逗号、冒号或句号。

## Logo 与 favicon

原始文件是你放在 `public/` 里的 `Logo.png`（T 标志）、`Logo Word.png`（字标）和 `Word Logo.png`（带 "Discipline today. Brighter tomorrows." 标语的字标）。网站实际使用的是从它们裁好边的版本，放在 `public/brand/`：

| 文件 | 用途 |
|---|---|
| `mark.png`、`wordmark.png` | 导航栏：原色（藏青 + 金），用在浅色底上 |
| `mark-light.png`、`wordmark-light.png` | 导航栏：由原图把藏青换成米白、金色略提亮，用在深色底上 |
| `wordmark-tagline.png`、`wordmark-tagline-light.png` | 页脚：带标语的字标，同样两个版本 |
| `app/icon.png` | 浏览器标签页图标（favicon），就是 T 标志 |
| `app/apple-icon.png` | 手机"添加到主屏幕"的图标（象牙白底） |

导航左上角是"T 标志 + 字标"，页脚左侧是"T 标志 + 带标语字标"，都会根据下面区块的底色自动显示原色版或浅色版（`components/site/logo.tsx`）。换 logo 时，替换 `public/brand/` 里对应的文件即可。

## 配色与日夜模式

访客在导航栏右上角可以切换**夜间 / 日间**（太阳和月亮图标），选择会被记住。`content/palettes.ts` 里：

| id | 名称 | 说明 |
|---|---|---|
| `night` | 夜间 黑金 | 首屏、结尾、页脚、内页页头是纯黑 `#08090b`；阅读区是石墨灰 `#1a1c20`，文字稍微调柔，看久了不累眼；**首次访问默认** |
| `day` | 日间 象牙白 | 暖象牙白 + 香槟金光晕、交替光影、纸张颗粒、带阴影的卡片 |

- `PALETTE` 是首次访问看到的模式（night）。
- 按钮不用白色：深色底上是香槟金渐变，浅色底上是墨黑配香槟金字（悬停时变金）。

每种模式定义两种底色：A（首屏、结尾、页脚、内页页头）和 B（阅读区，包括 All investments）。两种底色相接的地方会自动做渐变过渡，长度由 `--fade` 控制。颜色都在 `app/globals.css` 顶部。

## 上线前需要替换的占位内容

- [ ] `content/site.ts`：填上 LinkedIn / X 链接（留空则不显示）。网站现在不列任何邮箱，有了公司邮箱再决定要不要公开
- [ ] `content/team.ts`：三位成员是占位（"Partner Name"），换成真实姓名、职位、简介、LinkedIn；头像放到 `public/team/`，填 `photo` 字段（没有头像时显示姓名首字母）
- [ ] `content/portfolio.ts`：Rim 的 `stage`（目前写的是 "Early stage"）、`invested`（目前是 2026）；如有创始人信息可填 `builders`
- [ ] `content/perspectives.ts`：文章的发布日期 `date`
- [ ] `content/legal.ts`：请律师审阅三个法律页面（特别是 Disclosures 和适用法律条款）
- [ ] 配置联系表单（见下）

## 表单（Pitch 与 Contact）

两个表单共用 `lib/inbox.ts`：`/pitch` 提交到 `app/api/pitch/route.ts`，`/contact` 提交到 `app/api/contact/route.ts`。投递方式二选一（都配置时优先 Resend）：

1. **Resend 邮件（推荐）**：设置 `RESEND_API_KEY`、`CONTACT_FROM_EMAIL`（发件域名需在 Resend 验证；还没有域名时可以先填 `Teralven Website <onboarding@resend.dev>`，但这样只能发到你注册 Resend 用的那个邮箱）、`CONTACT_TO_EMAIL`（留言收件人），可选 `PITCH_TO_EMAIL`（pitch 收件人，不填就发到 `CONTACT_TO_EMAIL`）。邮件标题形如 "Pitch: 公司名 (Seed, Media & Entertainment)"，回复地址就是对方的邮箱，直接点回复即可。
2. **Webhook**：设置 `CONTACT_WEBHOOK_URL`（Google Apps Script、Power Automate、Zapier 等）和 `CONTACT_SECRET`。每条数据带 `type: "pitch"` 或 `"message"`，可以进同一张表。

Pitch 表单必填：姓名、邮箱、职位、公司名、一句话介绍、领域、阶段、融资状态、项目介绍、隐私同意；其余（LinkedIn、官网、所在地、融资额、BP 链接、进展、来源、引荐人）选填。BP 用链接（DocSend / Google Drive / Dropbox），不做文件上传。

```bash
cp .env.example .env.local
```

两者都没配置时，表单会提示"尚未连接"。网站上没有列邮箱，访客就没有别的办法联系你们，所以上线前一定要配好其中一种。接口自带：字段校验（下拉选项只接受表单里的值）、邮箱校验、链接清洗、蜜罐防机器人、每个 IP 每分钟 5 次限流。

## 投资组合（All investments）

参考 a16z 的 portfolio：方形 logo 格子，格子底部是状态标签（New / Exit / IPO…），悬停微微上浮，点击从右侧滑出 **Company Profile** 抽屉。格子跟着配色走：深色底上是半透明玻璃卡，浅色底上是白色卡片。抽屉里有：领域、完整 logo、公司简介、官网按钮（Rim 是 rimuniverse.com）、里程碑（投资年份、投资时阶段、当前状态）、创始人、投资文章。

- 公司 8 家以内时，格子一行 4 个（更大），超过后一行 6 个。
- 每个公司的 profile 都有自己的链接：`/portfolio#rim` 会直接打开 Rim 的抽屉（Focus 页和文章页就是这样链接过去的）。

### 添加一家投资公司

1. 把 logo 放到 `public/portfolio/<slug>/`，最好两个版本都给：
   - `logo`：深色背景用的版本（透明底、浅色字）
   - `logoOnLight`：浅色背景用的版本（透明底、深色字）。Rim 的这个版本是从它的 logo 自动生成的（白色部分换成深石板色，蓝色保留）
   - `lockup`（可选）：抽屉里想用另一个版本时再填
   - `mark`（可选）：小图标，用在 Focus 页列表
2. 在 `content/portfolio.ts` 的 `COMPANIES` 里加一条，填上各图片的宽高。`focus` 填所属领域，公司会自动出现在 `/focus` 对应领域下。
3. 如果写了关于这笔投资的文章，把文章的 slug 填在 `article`，并在文章里填 `company`：抽屉会显示"Investment news"，文章末尾会显示公司卡片。

## 部署到 Vercel

导入仓库即可，默认 Next.js 设置可用。在 Project → Settings → Environment Variables 里填联系表单的变量，改完要重新部署一次才生效。网址（用于 sitemap、分享卡片等）会自动用 Vercel 给项目的正式域名，绑定自己的域名后也会自动换过去；部署在别的平台时，用环境变量 `SITE_URL` 指定，例如 `https://www.teralvencapital.com`。

注意：Vercel 免费的 Hobby 方案只允许非商业用途，公司官网按规定要用 Pro 方案。

## 设计说明

- **底色**：每个 section 用 `data-theme` 声明它用 A 底（`dark`）还是 B 底（`light`），实际颜色由配色方案决定；顶部导航会自动读取下方区块的底色并跟着变，logo 也随之切换版本。
- **地平线**（`components/ui/horizon.tsx`）：品牌主视觉，纯 CSS 渐变绘制，没有图片、没有模糊滤镜，任何尺寸都清晰。首页、内页页头、结尾 CTA、404 页用的是它的三个变体。
- **领域图形**（`components/ui/glyph.tsx`）：七个投资领域各一个线条图形，SVG 计算生成。
- **动效**：首屏晨光升起、标题逐行浮现、滚动渐显、星空闪烁；系统开启"减少动态效果"时全部关闭。
- **分享卡片**：`app/opengraph-image.tsx` 在构建时生成（黑底地平线 + logo + 首屏标语）。
- **图片**：图片建议和生图提示词见 [docs/image-brief.md](docs/image-brief.md)。
