# FocusCoach 外链建设执行方案

> 基于当前代码库（`focus-coach` GitHub 仓库）修正后的可执行版本。

---

## 先讲三个关键判断

1. **站内基础已经打好了，不用等。**
   - 域名：`https://www.focuscoach.dev`
   - 首页定位："ADHD Focus Exercises for Adults"（`app/page.tsx:42`）
   - 60 秒测试**不需要注册**（`app/page.tsx:44`, FAQ 第五条）
   - 博客系统已上线 17 篇文章（`lib/articles.ts`）
   - `sitemap.xml`、`robots.txt`、JSON-LD FAQPage / WebApplication schema 已配置

2. **市场上几乎没有 ADHD/心理健康赛道的可买外链。**
   在挂牌资源里搜不到 DR 30-60、价格合理且主题相关的站。买一个 DR 60 的美食博客外链，锚文本写「ADHD focus exercises」——相关性信号为 0，对新站弊大于利。

3. **所以策略是：先做免费高相关外链，再内容驱动，最后才考虑买。**

---

## 阶段一：免费目录提交（第 1 周，$0）

### 提交资料包（直接复制使用）

```text
Name:               FocusCoach
Tagline:            ADHD-friendly focus training in 10 minutes a day
Short description:  Free 60-second attention check, five adaptive exercises, and weekly AI productivity insights for adults with ADHD.
Long description:   FocusCoach helps adults create a short, repeatable transition into focused work. Start with a free 60-second attention check in the browser, then use five exercises covering working memory, visual matching, updating, task switching, and inhibition. Adaptive difficulty keeps sessions approachable, while saved trends and weekly AI summaries turn results into plain-language next steps. FocusCoach is a productivity and training tool, not a medical device, and does not diagnose or treat ADHD.
Pricing:            Free focus check; Pro is $29.99/year.
Categories:         Productivity, Health & Wellness, ADHD, AI Tools, Brain Training
Tags:               ADHD, focus, productivity, brain training, cognitive training, attention, mental fitness, AI coaching, focus exercises, adult ADHD
Homepage:           https://www.focuscoach.dev/?utm_source={{platform}}&utm_medium=directory&utm_campaign=focuscoach_launch
```

### 目录清单与优先级

| 优先级 | 平台 | 域名 | 备注 |
|--------|------|------|------|
| P0 | Product Hunt | producthunt.com | 周二-周四 00:01 PT 发布，配合 maker comment |
| P0 | AlternativeTo | alternativeto.net | 找 "focus app" / "ADHD app" 作为替代品提交 |
| P0 | SaaSHub | saashub.com | Productivity / Health & Wellness 分类 |
| P0 | BetaList | betalist.com | 需要账号，提交 startup |
| P1 | Toolify.ai | toolify.ai | AI Health / Productivity 分类 |
| P1 | There's AI For That | theresanaiforthat.com | AI 工具目录 |
| P1 | FutureTools | futuretools.io | AI 工具目录 |
| P1 | SourceForge | sourceforge.net | 需要注册，提交项目 |
| P1 | Dev.to | dev.to | 发一篇 "I built an ADHD focus app..." |
| P1 | Indie Hackers | indiehackers.com | 发产品故事帖 |
| P2 | SaaSGenius | saasgenius.com | 泛 SaaS 目录 |
| P2 | Buildlist | buildlist.io | 新产品目录 |
| P2 | Capterra / GetApp | capterra.com | 留评类，慢但权重高 |

**本周目标：提交 P0 + P1 中的 8-10 个。**

---

## 阶段二：Reddit + Hacker News 社区推广（第 1-2 周）

### Reddit 发帖原则

- 不要直接丢链接；先发故事/价值，链接放文末或评论区。
- 每个 subreddit 用不同角度，不要复制粘贴。
- 真诚回应评论，不要争辩。
- 最佳时间：美东时间周二-周四 8-10 AM。

### r/ADHD 帖子

```text
Title: I have ADHD and built a free 60-second attention check because I was tired of guessing

Body:
Hey everyone,

I have inattentive ADHD and I’ve always had this loop:
- "My focus feels terrible today."
- "Is it actually worse, or am I just stressed?"
- "I have no data, so I’ll just spiral."

So I built FocusCoach: a free 60-second attention check that runs in the browser with no signup. It’s followed by five short exercises (Number Memory, N-Back, Quick Match, Task Switch, Stroop) and weekly AI summaries of accuracy, speed, and consistency.

What I’ve learned about myself so far:
- My selective attention is fine; my sustained attention crashes after bad sleep.
- Working memory is my weakest area, but also the most responsive to practice.
- A 60-second check before deep work actually helps me transition.

I’m not claiming this treats ADHD. It’s a productivity and attention-training tool, not a medical device. I’m sharing because I know a lot of us wonder "am I getting worse?" and having even a little signal helps me separate pattern from bad day.

If you want to try it: https://www.focuscoach.dev/?utm_source=reddit&utm_medium=post&utm_campaign=r_adhd

Has anyone else tried tracking attention or cognitive patterns? What tools did you use?
```

### r/productivity 帖子

```text
Title: I tracked my cognitive performance for 30 days — here’s what surprised me

Body:
I’ve been using a short cognitive-training routine before work for a month, tracking accuracy and response time across five exercise types.

What I expected: gradual improvement across everything.

What I found:
- Working memory improved fast in week 1, then plateaued hard.
- Processing speed kept climbing steadily.
- Attention control got WORSE in week 2 before recovering — correlated with a bad sleep week.
- The biggest gains came from days where I trained 2+ different types, not from grinding one exercise.

The real insight: I’m not "bad at focus." I’m uneven. Some attention systems are strong; others need more support.

I built FocusCoach to automate this tracking and generate weekly AI reports. But even without it, the lesson is clear: track specific abilities, not just "focus" in general.

If you want to try the free check: https://www.focuscoach.dev/?utm_source=reddit&utm_medium=post&utm_campaign=r_productivity

Anyone else experiment with cognitive training or pre-work routines? What worked?
```

### r/SideProject 帖子

```text
Title: I built an ADHD-friendly focus app with a free 60-second attention check — tired of timers that don’t help me start

Body:
Hey r/SideProject!

Most focus tools start with a timer. For me, the hardest part is making the transition into the task. So I built FocusCoach.

What it does:
- Free 60-second attention check in the browser, no signup.
- Five short exercises: Number Memory, Quick Match, N-Back, Task Switch, Stroop.
- Adaptive difficulty based on performance.
- Weekly AI summaries that turn scores into plain-language next steps.

Pricing: free to use; Pro is $29.99/year for saved trends and reports.

Tech stack: Next.js 14, Supabase, OpenAI-compatible API, PayPal, Vercel.

Live at: https://www.focuscoach.dev/?utm_source=reddit&utm_medium=post&utm_campaign=r_sideproject

Would love feedback on:
1. Does the homepage explain it quickly?
2. Does the 60-second check make starting work easier?
3. What result or recommendation would make you come back tomorrow?
```

### r/adhdwomen 帖子

```text
Title: I built a tiny attention check because my ADHD brain kept gaslighting me about "bad focus days"

Body:
Hi all,

I have inattentive ADHD and I built FocusCoach after months of "I can’t focus today" with zero way to tell if it was real or just anxiety.

It’s a free 60-second browser-based attention check, no signup. Then there are five short exercises and weekly AI summaries. Nothing medical — just a productivity tool that gives me a little objective signal before I decide the day is ruined.

I especially like using it right before deep work as a transition ritual.

Try it: https://www.focuscoach.dev/?utm_source=reddit&utm_medium=post&utm_campaign=r_adhdwomen

Curious if anyone else uses data/tracking to manage ADHD without turning it into another source of shame?
```

### Hacker News Show HN

```text
Title: Show HN: FocusCoach – Free ADHD focus exercises for adults

Body:
I built FocusCoach because most focus tools start with a timer, while the hardest part for me is making the transition into the task.

It’s a free browser-based attention check + five short cognitive exercises (N-Back, Stroop, etc.) with adaptive difficulty and weekly AI summaries. No signup required for the 60-second check.

I deliberately avoided medical claims — it’s a productivity/training tool, not a diagnostic or treatment product.

Would love feedback on the landing page and whether the check actually helps you begin a work block.

https://www.focuscoach.dev/?utm_source=hackernews&utm_medium=post&utm_campaign=show_hn
```

---

## 阶段三：竞品外链分析（第 2-4 周）

### 直接竞品清单

用以下搜索词在 Google 搜前十，记录域名：

```text
"adhd focus exercises adults"
"free adhd focus test"
"adhd attention training"
"brain training for adhd"
"adhd cognitive training"
"focus apps for adhd adults"
"10 minute focus exercises adhd"
"attention exercises for adults with adhd"
```

常见竞品：
- Lumosity.com
- CogniFit.com
- Focusmate.com
- Brain.fm
- Endel.app
- Freedom.to
- Forestapp.cc

### 分析步骤

1. 打开 Ahrefs 免费外链检查：`https://ahrefs.com/backlink-checker`
2. 输入竞品域名，查看前 100-200 条外链。
3. 记录：来源域名、DR、页面标题、锚文本、链接类型（dofollow/nofollow）、是否可模仿。
4. 优先模仿这些来源：
   - 心理健康/生产力博客的 "best apps" 列表
   - 播客 show notes
   - 论坛推荐帖
   - 教育资源页
   - Guest post 机会

### 可执行的 outreach 模板

```text
Subject: Resource suggestion for your [specific page]

Hi [name],

I found your guide on [specific topic] while researching practical focus resources. The section about [specific detail] was especially useful.

I run FocusCoach, a non-clinical, ADHD-friendly focus tool with a free 60-second attention check and five short exercises. If you think an interactive practice belongs in your [resource page/article], here is the page:

https://www.focuscoach.dev/?utm_source=outreach&utm_medium=email&utm_campaign=resource_suggestion

No pressure if it is not a fit. I can also contribute a concise, evidence-aware explanation of [relevant topic] without product promotion.

Thanks,
[your name]
```

---

## 阶段四：内容驱动外链（第 4-8 周）

### 利用现有博客文章做推广

代码库中已有高质量文章，重点推广这些「链接诱饵」：

| 文章 | _slug_ | 推广角度 |
|------|--------|----------|
| N-Back Training: What the Research Actually Says | `n-back-training-research` | 引用研究，可被学术/科普博客链接 |
| Brain Training for ADHD Adults: Does It Actually Work? | `brain-training-for-adhd-adults` | 驳斥夸大宣传，吸引记者/博主 |
| ADHD and Working Memory: What You Need to Know | `adhd-working-memory` | 心理健康/教育领域 |
| 60-Second Attention Span Test | `60-second-attention-span-test` | 工具页，最适合放在资源列表 |
| 10 Minute Focus Exercises for ADHD | `10-minute-focus-exercises-adhd` | 实用列表，Reddit/Twitter 传播 |

### 推广动作

1. **Twitter/X**：
   - 每篇文章拆成 3-5 条 thread
   - @ ADHD/心理健康领域的账号
   - 用 `#ADHD`、`#Productivity`、`#BrainTraining` 标签

2. **HARO / Help a B2B Writer**：
   - 注册 HARO 的 Health & Wellness、Lifestyle、Education 类别
   - 回复记者关于 ADHD、专注力、远程工作的问题
   - 签名带链接到 `/blog/60-second-attention-span-test`

3. **LinkedIn**：
   - 发文章到个人主页
   - 参与 ADHD 教练、心理治疗师的讨论

4. **Medium  republication**：
   - 将现有博客文章以摘要形式发到 Medium
   - 底部 canonical 指回原站

---

## 阶段五：预算允许的付费外链（第 8 周后）

### 什么时候可以买

- DR 已经达到 5-10
- 站内内容和转化基本稳定
- 有明确预算且只买相关站

### 怎么找 Guest Post 机会

```text
"adhd" "write for us" guest post
"mental health" "guest post" guidelines
"self improvement" "contribute" guest post
"psychology" "write for me" blog
"brain training" "submit a guest post"
"productivity" "write for us" blog
"adhd adults" "guest post"
```

### 评估标准

- 主题相关：ADHD、心理健康、生产力、自我提升、脑科学
- 流量正常：SimilarWeb 或 Ahrefs 显示自然搜索流量 >1K/月
- 不是链接农场：首页外链数不过万，内容真实
- DR 20-60 最佳，性价比最高
- 锚文本自然：用品牌名、裸链或长尾词，避免精确匹配 "best ADHD app"

---

## 执行检查清单

### 第 1 周

- [ ] Product Hunt 发布（周二-周四 00:01 PT）
- [ ] AlternativeTo 提交
- [ ] SaaSHub 提交
- [ ] BetaList 提交
- [ ] Toolify.ai 提交
- [ ] r/ADHD 发帖
- [ ] r/productivity 发帖
- [ ] r/SideProject 发帖
- [ ] r/adhdwomen 发帖
- [ ] HN Show HN 发帖
- [ ] GSC 提交首页索引
- [ ] 确认 UTM 参数使用正确

### 第 2-4 周

- [ ] 完成竞品外链分析（至少 5 个竞品）
- [ ] 发送 20-30 封 outreach 邮件
- [ ] Dev.to / Medium  republication 各 2 篇
- [ ] 在 Indie Hackers 发产品故事
- [ ] 注册 HARO 并开始回复记者请求

### 第 4-8 周

- [ ] 发布 2 篇新的「链接诱饵」长文
- [ ] 每篇长文在 Twitter 上拆成 thread
- [ ] 联系 10 个 ADHD/心理健康博主请求资源引用
- [ ] 查看 GSC 外链报告，确认新外链出现

### 第 8 周后

- [ ] 评估 DR 是否达到 5-10
- [ ] 只考虑 ADHD/心理健康/生产力相关站的 Guest Post
- [ ] 每月购买不超过 2-3 个外链，保持自然增长节奏

---

## UTM 参数规范

所有外部链接统一使用：

```
https://www.focuscoach.dev/?utm_source={{platform}}&utm_medium={{type}}&utm_campaign=focuscoach_launch
```

| Platform | UTM source 示例 | UTM medium 示例 |
|----------|----------------|-----------------|
| Product Hunt | `producthunt` | `launch` |
| AlternativeTo | `alternativeto` | `directory` |
| SaaSHub | `saashub` | `directory` |
| Reddit r/ADHD | `reddit` | `post` |
| Hacker News | `hackernews` | `post` |
| Dev.to | `devto` | `blog` |
| Outreach 邮件 | `outreach` | `email` |
| Twitter/X | `twitter` | `social` |
| Medium | `medium` | `blog` |

---

## 外链追踪表

复制以下表格到 Notion/Airtable/Google Sheets：

| 日期 | 平台/来源 | 类型 | URL | 锚文本 | Dofollow/Nofollow | 状态 | 备注 |
|------|-----------|------|-----|--------|-------------------|------|------|
| 2026-07-24 | Product Hunt | 目录 | https://www.producthunt.com/products/focuscoach | 品牌名 | dofollow | 已提交 | 周二 00:01 PT |
| 2026-07-24 | r/ADHD | 社区 | https://www.reddit.com/r/ADHD/comments/... | 裸链 | nofollow | 已发 | 美东 9 AM |
| 2026-07-25 | AlternativeTo | 目录 | ... | FocusCoach | dofollow | 待审核 | |

---

## 最重要的一句话

**先把 P0 目录和 Reddit/HN 这周发完。** 代码库已经 ready，不需要再等站内改造。外链建设的瓶颈从来都不是"没准备好"，而是"没开始发"。
