# Focus Coach - AI Cognitive Coach

An AI-powered cognitive training web app focused on improving focus and productivity.

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
Refer to `MVP开发清单.md` and `技术设计文档.md` for detailed implementation guidance.
