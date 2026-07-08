# Focus Coach SEO Strategy

> Target: US market | Product: AI Cognitive Coach Web App
> Date: 2026-07-08

---

## 一、关键词分层策略

### Tier 1 — 核心词（放在Title、H1、Meta Description）

| Keyword | Est. Monthly Volume | Competition | Our Page |
|---------|-------------------|-------------|----------|
| brain training | 110K+ | Very High | Homepage |
| brain training games | 74K+ | Very High | /games |
| cognitive training | 33K+ | High | Homepage |
| focus training | 22K+ | High | /dashboard |
| brain games | 165K+ | Very High | /games |

**策略**：核心词竞争极大（Lumosity、Elevate、CogniFit等10年老站霸占），MVP阶段不要指望排首页。放在Title和Meta里拿长尾流量的语义关联。

---

### Tier 2 — 中腰词（ Landing Page + Blog 主攻）

| Keyword | Est. Monthly Volume | Competition | Our Page |
|---------|-------------------|-------------|----------|
| brain training games online free | 12K+ | Medium | /games |
| cognitive training exercises | 8K+ | Medium | /games |
| focus improvement app | 3-5K | Medium-Low | Homepage |
| attention training games | 2-4K | Medium | /games |
| n-back training online | 1-3K | Low | /train/n_back |
| stroop test online | 5-8K | Low-Medium | /train/stroop |
| working memory training | 4-6K | Medium | /train/number-memory |
| brain training for adults | 6-10K | Medium | /blog/brain-training-for-adultts |
| daily focus exercises | 1-2K | Low | /dashboard |
| mental fitness training | 2-3K | Low-Medium | Homepage |

**策略**：这是MVP阶段的主力战场。竞争适中，搜索意图明确，转化率高于泛词。

---

### Tier 3 — 长尾词（Blog Content 主打，低竞争高转化）

| Keyword | Search Intent | Blog Post Title |
|---------|--------------|-----------------|
| how to improve focus at work | Informational | "10 Science-Backed Ways to Improve Focus at Work" |
| free n-back task online | Transactional | "Free Dual N-Back Training: Boost Working Memory in 10 Min/Day" |
| stroop effect test online | Informational | "Take the Free Stroop Test: Measure Your Selective Attention" |
| best brain training games 2026 | Commercial | "7 Best Free Brain Training Games for Adults in 2026" |
| cognitive exercises for focus and attention | Informational | "5 Cognitive Exercises That Actually Improve Your Focus" |
| brain training vs meditation | Informational | "Brain Training vs Meditation: Which Boosts Focus More?" |
| how to train working memory | Informational | "How to Train Your Working Memory (Backed by Cognitive Science)" |
| free attention test online | Transactional | "Free Attention Test: Check Your Focus Level in 5 Minutes" |
| brain training for ADHD adults | Informational | "Brain Training Games for Adults with ADHD: What Works" |
| AI cognitive coach | Informational | "What Is an AI Cognitive Coach? Your Personal Brain Trainer" |
| task switching exercises | Informational | "Task Switching Exercises: Train Your Cognitive Flexibility" |
| number memory test | Transactional | "Free Number Memory Test: How Many Digits Can You Remember?" |
| brain training without subscription | Commercial | "Brain Training Without a $50/Month Subscription" |
| improve concentration in 2 weeks | Informational | "Can You Improve Concentration in 2 Weeks? A Realistic Guide" |
| focus training for productivity | Informational | "Focus Training for Productivity: 10 Min/Day to Sharper Work" |

---

## 二、页面SEO结构

### 2.1 URL结构
```
focuscoach.app/                          → brain training, cognitive training
focuscoach.app/games                     → brain training games, cognitive exercises
focuscoach.app/games/n-back              → n-back training, working memory game
focuscoach.app/games/stroop              → stroop test, stroop effect
focuscoach.app/games/number-memory       → number memory test, digit span
focuscoach.app/games/quick-match         → reaction time game, speed match
focuscoach.app/games/task-switch         → task switching, cognitive flexibility
focuscoach.app/reports                   → AI cognitive report, brain training progress
focuscoach.app/pricing                   → brain training subscription, affordable brain training
focuscoach.app/blog                      → blog hub
focuscoach.app/blog/how-to-improve-focus-at-work
focuscoach.app/blog/best-brain-training-games-2026
focuscoach.app/blog/free-n-back-training
```

### 2.2 Title Tag模板
```
Homepage:    Focus Coach — AI Brain Training & Focus Improvement | Free to Start
/games:      Free Brain Training Games Online | 5 Cognitive Exercises — Focus Coach
/games/n-back:    Free N-Back Training | Working Memory Game — Focus Coach
/games/stroop:    Free Stroop Test Online | Measure Your Focus — Focus Coach
/pricing:    Brain Training Plans — $29.99/Year, No Hidden Fees | Focus Coach
/blog/xxx:   [Post Title] — Focus Coach
```

### 2.3 Meta Description模板
```
Homepage: "Train your focus with 5 science-based brain games. AI-powered coaching adapts to your level. Free daily training. No subscription traps — $29.99/year for unlimited access."

/games: "Play 5 free brain training games online: Number Memory, N-Back, Stroop Test, Quick Match, and Task Switch. Track your progress with AI-powered insights."

/pricing: "Focus Coach: $29.99/year for unlimited brain training, AI weekly reports, and detailed analytics. Compare: Lumosity charges $80/year, we charge $30."
```

---

## 三、技术SEO实现

### 3.1 Next.js SEO配置
```typescript
// app/layout.tsx — Metadata
export const metadata = {
  title: {
    default: 'Focus Coach — AI Brain Training & Focus Improvement',
    template: '%s | Focus Coach',
  },
  description: 'Train your focus with 5 science-based brain games. AI-powered coaching adapts to your level. Free daily training.',
  keywords: ['brain training', 'cognitive training', 'focus improvement', 'brain games', 'n-back', 'stroop test', 'working memory', 'attention training'],
  openGraph: {
    type: 'website',
    siteName: 'Focus Coach',
    title: 'Focus Coach — AI Brain Training',
    description: '5 science-based brain games + AI coaching. Free to start.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Coach — AI Brain Training',
    description: '5 science-based brain games + AI coaching. Free to start.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
```

### 3.2 结构化数据 (JSON-LD)
```json
// Homepage
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Focus Coach",
  "description": "AI-powered cognitive training web app with 5 brain games and personalized coaching",
  "url": "https://focuscoach.app",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free daily training session"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "100"
  }
}

// Individual game pages
{
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "N-Back Training",
  "description": "Free online N-Back task for working memory training",
  "url": "https://focuscoach.app/games/n-back",
  "genre": "Cognitive Training"
}
```

### 3.3 Sitemap & Robots
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const baseUrl = 'https://focuscoach.app';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/games`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/games/n-back`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/games/stroop`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/games/number-memory`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/games/quick-match`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/games/task-switch`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    // ... blog posts
  ];
}

// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://focuscoach.app/sitemap.xml',
  };
}
```

### 3.4 性能优化（Core Web Vitals）
- **LCP < 2.5s**: 首屏用SSR，图片用next/image + WebP
- **FID < 100ms**: 游戏交互用Client Component，静态内容SSG
- **CLS < 0.1**: 所有图片/视频设固定尺寸，字体用next/font
- **Bundle < 200KB**: 游戏用Canvas而非重型动画库

---

## 四、内容营销策略

### 4.1 Blog发布节奏（Week 2-3启动）

| Week | Post Title | Target Keywords | Goal |
|------|-----------|----------------|------|
| W2 | "Free N-Back Training: Boost Working Memory in 10 Min/Day" | n-back training, working memory game | 直接导流到游戏页 |
| W2 | "Take the Free Stroop Test: Measure Your Focus Level" | stroop test online, attention test | 导流到Stroop游戏 |
| W3 | "7 Best Free Brain Training Games for Adults in 2026" | brain training games, best brain games | 对比文章，自然植入 |
| W3 | "What Is an AI Cognitive Coach?" | AI cognitive coach, brain training AI | 差异化定位 |
| W4 | "Brain Training Without a $50/Month Subscription" | brain training subscription, affordable | 直接打竞品定价 |
| W4 | "How to Improve Focus at Work: 10 Science-Backed Methods" | improve focus at work, focus productivity | 泛流量入口 |
| W5 | "Number Memory Test: How Many Digits Can You Hold?" | number memory test, digit span | 导流到游戏 |
| W5 | "Brain Training for Adults with ADHD: What Actually Works" | ADHD brain training, focus ADHD | 垂直人群 |

### 4.2 内容SEO规范
- 每篇1500-2500字
- H1包含主关键词
- 前100字自然出现主关键词
- 每篇至少3个内链（指向游戏页/其他blog）
- 每篇至少1个CTA（"Try the free N-Back game →"）
- 图片用alt描述，包含相关关键词

### 4.3 外链策略
- **Product Hunt Launch**: 首发日获取HN/PH外链
- **Reddit**: 在r/braintraining, r/ADHD, r/productivity自然分享
- **Hacker News**: "Show HN: I built a $30/year alternative to Lumosity"
- **Medium**: 同步发布技术文章（canonical URL指向自己站）
- **GitHub**: 开源游戏逻辑代码，README指向产品

---

## 五、竞品SEO对比

| Competitor | Domain Rating | Main Keywords | Weakness |
|-----------|--------------|---------------|----------|
| Lumosity | 70+ | brain training, brain games | $80/year, no AI coaching |
| Elevate | 65+ | brain training app, mental workout | App-only, $60/year |
| Peak | 55+ | brain training, mind games | App-only, no web version |
| CogniFit | 60+ | cognitive training, brain test | Clinical positioning, expensive |
| FreeFocusGames | 20+ | free brain games, n-back online | No AI, no progress tracking |

**我们的差异化SEO切入点**：
1. "AI brain training" — 新概念，竞品还没占
2. "affordable brain training" / "cheap brain training" — 打价格差
3. "free [game name] online" — 每个游戏独立页面，抢免费搜索流量
4. "brain training for productivity" — 定位生产力工具，不打健康医疗

---

## 六、快速执行清单

### Week 1（开发时顺手做）
- [ ] Next.js metadata配置（Title/Description/OG）
- [ ] 每个游戏页独立SEO metadata
- [ ] JSON-LD结构化数据
- [ ] Sitemap + Robots.txt
- [ ] 页面H1/H2包含关键词
- [ ] 图片alt标签
- [ ] URL结构符合规划

### Week 2（上线前）
- [ ] 发布第一篇blog: "Free N-Back Training"
- [ ] 发布第二篇blog: "Free Stroop Test"
- [ ] 提交Google Search Console
- [ ] 提交Bing Webmaster Tools
- [ ] 准备Product Hunt发布文案

### Week 3（上线后）
- [ ] Product Hunt + Hacker News发布
- [ ] Reddit自然分享（3-5个subreddit）
- [ ] 发布第三篇blog: "Best Free Brain Training Games 2026"
- [ ] 监控Search Console数据，调整关键词

### Ongoing（每月）
- [ ] 发布2-4篇blog文章
- [ ] 检查Search Console排名变化
- [ ] 更新表现差的页面
- [ ] 监控竞品关键词变化

---

*This SEO strategy is designed for MVP stage. Update quarterly based on Search Console data.*
