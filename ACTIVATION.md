# Dreamwall — Locked activation checklist

**Product:** Dreamwall  
**Beachhead:** Founders  
**Anonymous writes:** ON (monetize via credits / premieres / featured slots)  
**Daily AI cap:** $10 (America/Vancouver)  
**Expense envelope:** $1,000 max  
**Code branch:** `cursor/dreamwall-mvp-a3d1`  
**Local preview:** http://127.0.0.1:3000  

Status key: `[ ]` todo · `[~]` blocked/waiting · `[x]` done

---

## Phase A — Ship the site (this week)

| # | Status | Owner | Action |
|---|--------|-------|--------|
| A1 | [x] | Agent | MVP built (hero → write → share → wall + bots + spend cap) |
| A2 | [~] | You | Create empty GitHub repo named `dreamwall` (no README) |
| A3 | [~] | Agent | Push `cursor/dreamwall-mvp-a3d1` to that repo |
| A4 | [~] | Agent | Call Cursor **publish-app** proposal (`dreamwall` slug) — you confirm visibility |
| A5 | [ ] | You | Buy domain (prefer `dreamwall.app` or `dreamwall.co`) |
| A6 | [ ] | You | Point DNS to host after publish/Vercel |

**A2 how-to (2 minutes):**  
1. Open https://github.com/new  
2. Repository name: `dreamwall`  
3. Public · **add no README / .gitignore / license**  
4. Create → paste the URL back in chat (example: `https://github.com/YOURUSER/dreamwall`)

---

## Phase B — Accounts (real identity only — no temp logins)

| # | Status | Owner | Action | Est. $ |
|---|--------|-------|--------|--------|
| B1 | [ ] | You | Open $1,000 max expense card / prepaid | — |
| B2 | [ ] | You | Vercel (or Cursor publish host) — login with your email | 0 |
| B3 | [ ] | You | Buffer or Later — connect **one** brand TikTok + IG + YouTube | 0–15/mo |
| B4 | [ ] | You | Create brand socials named Dreamwall (one each) | 0 |
| B5 | [ ] | You | Cloudflare (optional DNS) | 0 |

---

## Phase C — Generation & monetization

| # | Status | Owner | Action | Est. $ |
|---|--------|-------|--------|--------|
| C1 | [ ] | You | Add video/LLM API key via **host secrets** (never in chat) | — |
| C2 | [ ] | Agent | Replace render stub with real video API under $10/day guard | metered |
| C3 | [ ] | Agent | Credits / “premiere tonight” checkout (Stripe) | Stripe fees |
| C4 | [ ] | Agent | Persist dreams to Postgres (survive deploys) | 0–host DB |

**Spend rule:** AI ≤ **$10/day**; pause generation at cap; remaining envelope for domain + light ads.

---

## Phase D — Activation (founders)

| # | Status | Owner | Action |
|---|--------|-------|--------|
| D1 | [ ] | You | Import `content-calendar.csv` into Buffer/Later |
| D2 | [ ] | You | Pin bio link → live Dreamwall write box |
| D3 | [ ] | You | Post Day 1–7 founder hooks from calendar |
| D4 | [ ] | You | Soft-boost only posts with write-link CTR (cap $5–10/day ads if testing) |
| D5 | [ ] | Both | Weekly review: writes, shares, $ spent vs $1,000 |

---

## Done definition (MVP live)

- [ ] Public URL live  
- [ ] Anonymous founder can write a dream and share a card  
- [ ] Live wall shows dreams  
- [ ] $10/day AI cap enforced  
- [ ] First 7 calendar posts published from your brand accounts  

---

## Explicit non-goals (locked)

- No fake/temp social accounts  
- No engagement bots / auto-comment farms  
- No passwords or card numbers in chat  
