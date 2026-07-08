# Focus Coach — Deployment Guide

This document is for the AI developer to execute the full deployment of Focus Coach to production.

## Project Overview

Focus Coach is an AI-powered brain training Web App built with:
- **Framework**: Next.js 14 (App Router) + TypeScript + TailwindCSS
- **Auth & DB**: Supabase (email/password auth + PostgreSQL)
- **AI**: OpenAI GPT-4 (weekly cognitive reports)
- **Payments**: Stripe (annual subscription $29.99/year)
- **Hosting**: Vercel

## Current State

- ✅ All source code complete (app/, components/, lib/, supabase/)
- ✅ Dependencies installed (node_modules/)
- ✅ Build successful (.next/ exists)
- ✅ Git initialized
- ⬜ Not yet deployed

## Deployment Steps

### Step 1: Push to GitHub

```bash
cd D:\work\code\focus-coach

# Make sure .env is in .gitignore (NOT .env.example)
# .gitignore should already exclude .env — verify this first

git add .
git commit -m "feat: complete MVP - AI brain training web app"
git remote add origin https://github.com/lincyang720/focus-coach.git
git push -u origin main
```

If the repo doesn't exist on GitHub, create it first:
- Go to https://github.com/new
- Name: `focus-coach`
- Private (recommended for now)
- Do NOT initialize with README (already have one)

### Step 2: Create Supabase Project

1. Go to https://supabase.com → Sign in → New Project
2. Project name: `focus-coach`
3. Set a strong database password (save it!)
4. Region: US East (closest to target market)
5. Wait for project to initialize (~2 min)

**Run the database schema:**
1. Go to SQL Editor in Supabase dashboard
2. Copy the entire content of `supabase/schema.sql` and run it
3. Verify tables created: `users`, `game_sessions`, `ai_reports`, `game_configs`

**Enable Supabase Auth:**
1. Go to Authentication → Providers
2. Make sure "Email" provider is enabled
3. Disable "Confirm email" for MVP (Authentication → Providers → Email → Confirm email toggle OFF)
   - This lets users login immediately without email verification

**Get credentials:**
1. Go to Project Settings → API
2. Copy these values:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public key` → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - `service_role key` → SUPABASE_SERVICE_ROLE_KEY (keep secret!)

### Step 3: Create Stripe Account & Products

1. Go to https://dashboard.stripe.com → Sign up (use test mode first)

**Create a product:**
1. Products → Add Product
2. Name: `Focus Coach Pro`
3. Price: $29.99 / year (recurring)
4. Copy the **Price ID** (starts with `price_`)

**Get API keys:**
1. Developers → API keys
2. Copy **Secret key** (starts with `sk_test_`)
3. Copy **Publishable key** (starts with `pk_test_`)

**Create webhook:**
1. Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://YOUR-VERCEL-URL.vercel.app/api/webhooks/stripe`
   (You'll get the actual URL after Vercel deployment, use placeholder for now)
3. Events to listen: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the **Signing secret** (starts with `whsec_`)

### Step 4: Deploy to Vercel

1. Go to https://vercel.com → Sign in (use GitHub)
2. "Add New Project" → Import `focus-coach` from GitHub
3. Framework Preset: Next.js (auto-detected)
4. Build settings (should auto-detect, verify):
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Environment Variables** — Add ALL of these:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | From Step 2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Step 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | From Step 2 |
| `OPENAI_API_KEY` | Your OpenAI API key (sk-xxx) |
| `OPENAI_MODEL` | `gpt-4` |
| `STRIPE_SECRET_KEY` | From Step 3 (sk_test_xxx) |
| `STRIPE_WEBHOOK_SECRET` | From Step 3 webhook (whsec_xxx) |
| `STRIPE_PRICE_ID` | From Step 3 product (price_xxx) |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL (e.g. https://focus-coach.vercel.app) |
| `FRONTEND_URL` | Same as NEXT_PUBLIC_APP_URL |

6. Click "Deploy" → Wait ~3 min

### Step 5: Post-Deployment Verification

After deployment, test these flows in order:

1. **Homepage** (`/`) — Should load, check SEO meta tags
2. **Register** (`/register`) — Create a test account
3. **Login** (`/login`) — Login with the test account
4. **Dashboard** (`/dashboard`) — Should show after login
5. **Play a game** (`/games/number-memory`) — Complete one round
6. **Pricing** (`/pricing`) — Click subscribe, verify Stripe checkout page loads
7. **robots.txt** (`/robots.txt`) — Should return valid sitemap rules
8. **sitemap.xml** (`/sitemap.xml`) — Should list all pages

### Step 6: Stripe Webhook (Update after deployment)

After Vercel deployment gives you the real URL:
1. Go back to Stripe → Webhooks
2. Update the endpoint URL to: `https://YOUR-VERCEL-URL.vercel.app/api/webhooks/stripe`
3. Test the webhook: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` (for local testing)
   Or use Stripe's "Send test webhook" feature in dashboard

### Step 7: Custom Domain (Optional but Recommended)

Suggested domains to check availability:
- `focuscoach.ai`
- `focus-coach.com`
- `tryfocuscoach.com`
- `getfocuscoach.com`

To add custom domain in Vercel:
1. Project Settings → Domains → Add
2. Update DNS records as instructed
3. SSL certificate auto-provisions

## Troubleshooting

### Build fails on Vercel
- Check if all env vars are set correctly
- Run `npm run build` locally first to catch errors
- Check Vercel build logs for specific error messages

### Supabase auth not working
- Verify Email provider is enabled
- Check "Confirm email" is disabled for MVP
- Verify SUPABASE_URL and keys are correct (no extra spaces)

### Stripe checkout not working
- Verify STRIPE_PRICE_ID is correct (not the product ID, but the price ID)
- Check webhook endpoint URL is correct
- Verify STRIPE_SECRET_KEY is from the same mode (test/live) as the price

### Demo mode fallback
If Supabase is not configured, the app gracefully falls back to demo mode:
- Login with `demo@focuscoach.local` / `password`
- All features work but data is not persisted
- This is by design for quick testing

## Environment Variables Checklist

Before going live, verify ALL env vars are set in Vercel:

- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] OPENAI_API_KEY
- [ ] OPENAI_MODEL (default: gpt-4)
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] STRIPE_PRICE_ID
- [ ] NEXT_PUBLIC_APP_URL
- [ ] FRONTEND_URL

## Go Live Checklist

Before sharing publicly:

- [ ] All env vars configured in Vercel
- [ ] Supabase project running with schema applied
- [ ] Stripe in live mode (switch from test to live keys)
- [ ] Stripe webhook endpoint updated to production URL
- [ ] Test full user flow: register → play games → subscribe → see AI report
- [ ] Custom domain configured (optional)
- [ ] PWA manifest working (check /manifest.webmanifest)
- [ ] robots.txt and sitemap.xml accessible
- [ ] OG image working (share a link on Twitter/Slack to verify)
