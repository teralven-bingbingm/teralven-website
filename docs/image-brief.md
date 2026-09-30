# 图片方案与生图提示词

参考 Radical Ventures、a16z、Sequoia 这类网站：它们的"高级感"主要来自**少而精、风格统一**的图片，不是图片多。建议 Teralven 所有图片都遵守同一套美术方向，和 logo 的藏青 + 古金一致。

## 统一美术方向（每条提示词都带上）

- 色调：深藏青（#0b2340）为主，古金色（#b08a4a）的光作为唯一暖色
- 光线：清晨的第一缕光、低角度侧光、柔和的体积光，呼应首页的"地平线晨光"和品牌语 *Discipline today. Brighter tomorrows.*
- 构图：极简、大量留白（留给文字），一个主体
- 质感：电影感、写实或高级 3D 渲染；不要卡通、不要赛博霓虹
- 禁止：图中出现文字、logo、水印、人脸特写（团队照除外）

英文风格后缀（复制到每条提示词末尾）：

```
cinematic, minimal composition, generous negative space, deep navy blue (#0b2340) palette with a single warm antique-gold light (#b08a4a), soft volumetric dawn light, high-end editorial, photorealistic, no text, no logos, no watermark
```

## 建议补充的图片（按优先级）

### 1. 团队照片（最重要，请用真实照片，不要 AI 生成）

- 位置：Team 页（`public/team/`，在 `content/team.ts` 填 `photo`）
- 规格：竖版 4:5，至少 1200×1500
- 拍摄建议：统一深藏青或暖灰背景，侧面柔光，半身，衣着深色系；所有人同一场地同一灯光。网站会自动做黑白处理，悬停时恢复色彩。

### 2. 公司介绍区的大图（The firm）

- 位置：首页 "The firm" 使命文字旁边或下方，一张横幅
- 规格：16:9 或 21:9，2400×1350 以上

```
A quiet, monumental architectural interior at dawn: tall stone columns and a polished floor, a single beam of golden morning light entering from a high window, long shadows, stillness and discipline, [风格后缀]
```

备选（更有"远见"感）：

```
A lone observatory on a mountain ridge before sunrise, the first gold light touching the horizon under a deep navy sky, calm and vast, [风格后缀]
```

### 3. 首屏（可选，目前用的是代码绘制的地平线）

现在首屏的"行星边缘 + 晨光"是用代码画的，清晰、加载快。如果想要更写实，可以换成一张图或一段 5 秒循环视频：

```
Earth seen from low orbit at the exact moment of sunrise, a thin bright golden line along the curved horizon, deep navy space above with faint stars, the planet's night side dark below, ultra wide, [风格后缀] --ar 21:9
```

视频可用 Kling、Runway 或 Veo 从这张图生成："slow push-in, the sunlight slowly grows along the horizon, 5 seconds, seamless loop"。

### 4. 七个投资领域的配图（可选，替代或搭配现在的线条图形）

- 位置：Focus Areas 页每个领域的方形图版，以及首页领域列表右侧的图版
- 规格：1:1，2000×2000
- 要一组风格完全一致：同一深藏青背景、同一种古金色光、同一种材质（拉丝金属 + 磨砂玻璃）

提示词模板：

```
A single sculptural object representing [主题], made of brushed antique gold and frosted glass, floating on a seamless deep navy background, studio lighting with a soft gold rim light, museum product photography, [风格后缀] --ar 1:1
```

`[主题]` 依次替换：

| 领域 | 主题 |
|---|---|
| Artificial Intelligence | a lattice of interconnected glowing nodes, like a neural constellation |
| Media & Entertainment | a fan of translucent film frames with light passing through them |
| Enterprise & Infrastructure | a stack of precise, layered glass plates, like server architecture |
| Fintech | flowing ribbons of gold moving in parallel waves |
| Health & Life Sciences | an elegant double helix of gold beads |
| Consumer | overlapping glass rings forming a flower-of-life pattern |
| Frontier Technology | a small planet with golden orbital rings and a satellite |

### 5. 两篇观点文章的封面

- 位置：Perspectives（Rim 那篇已经用了你的官网截图）
- 规格：16:10，2400×1500

*The next studio will be software*：

```
An empty classic film studio soundstage at dawn, a single director's chair in a pool of golden light, dust in the air, vast dark navy space around it, [风格后缀] --ar 16:10
```

*Five principles for investing at the frontier*：

```
A narrow stone path leading toward a luminous gold horizon at first light, seen from low angle, deep navy sky, sense of patience and long journey, [风格后缀] --ar 16:10
```

## 交付规格

- 格式：导出 WebP 或 JPG（质量 85），单张尽量控制在 500KB 以内；网站会再自动压缩和适配尺寸
- 放在 `public/images/` 下，命名用小写英文和连字符，例如 `firm-dawn.webp`
- 生成好后告诉我放在哪里、用在哪一块，我来接进页面并调整裁切位置
