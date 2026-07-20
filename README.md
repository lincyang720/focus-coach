# FocusCoach – ADHD-Friendly Attention Training

An ADHD-friendly productivity app with short attention exercises, adaptive difficulty, and weekly AI summaries. It is not a medical device.

## Overview

- **Positioning**: Productivity tool (NOT medical), focused on "improving focus + boosting work efficiency"
- **Pricing**: $29.99/year (transparent, no hidden weekly fees)
- **Target**: US market first
- **Tech Stack**: Next.js 14 + TypeScript + TailwindCSS + shadcn/ui + Supabase + PayPal + OpenAI-compatible AI API

## Key Files

- `MVP开发清单.md` — Product requirements, scope, timeline, and checklist (Chinese)
- `技术设计文档.md` — Complete technical spec: DB schema, game specs, API design, AI prompts, payment flow (Chinese with English code)

## MVP Scope

### 5 Core Games
1. **Number Memory** — Remember flashing number sequences
2. **Quick Match** — Tap matching colors/shapes quickly
3. **N-Back** — Classic cognitive psychology task
4. **Task Switch** — Switch between two rules quickly
5. **Stroop Test** — Select font color, ignore word meaning

### AI Features (Core Differentiator)
- Daily personalized game recommendations (3 games per day)
- Adaptive difficulty (auto-adjust based on accuracy)
- AI weekly report with natural language insights

### AI Provider
Weekly reports use an OpenAI-compatible chat completions API. For DeepSeek on Vercel, configure:

```env
AI_API_KEY=your_deepseek_api_key
AI_BASE_URL=https://api.deepseek.com
AI_MODEL=deepseek-v4-flash
```

Legacy `OPENAI_API_KEY` / `OPENAI_MODEL` settings are still supported.

### Pricing
- **Free**: 1 training session/day, basic stats
- **Pro ($29.99/year)**: Unlimited training + AI reports + detailed analytics

## Compliance
- NO medical claims (don't say "improve memory", say "improve focus")
- Transparent pricing
- GDPR/CCPA compliant

## Development Timeline
- Week 1: Core games + project setup
- Week 2: AI features + payment
- Week 3: Testing + launch

## Getting Started

```bash
npm install
npm run dev
```

## Search and analytics setup

The app generates `/sitemap.xml` and `/robots.txt`, and includes FAQPage, WebApplication, BlogPosting, and BreadcrumbList structured data. Add these production environment variables when the corresponding accounts are ready:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-verification-token
NEXT_PUBLIC_BING_SITE_VERIFICATION=bing-verification-token
```

After deployment:

1. Verify `https://www.focuscoach.dev` in Google Search Console and Bing Webmaster Tools.
2. Submit `https://www.focuscoach.dev/sitemap.xml` in both tools.
3. Request indexing for the homepage, `/blog`, and the first published guides.
4. Confirm GA4 receives a real-time page view before announcing the launch.

Directory submissions, backlink outreach, community posts, testimonials, and Search Console account actions intentionally remain manual because they require account ownership and genuine relationships.
