# Dreamwall

**Make the company visible before the logo exists.**

Public wall where founders write one dream sentence; Dreamwall turns it into a shareable visual for everyone to see. Anonymous writes are on — monetization still works via credits, premieres, and featured slots (identity optional).

| Setting | Value |
|--------|--------|
| Beachhead | Founders |
| Anonymous | Yes |
| Daily AI cap | **$10** (America/Vancouver day) |
| Stack | Next.js 15 · file-backed store (swap to Supabase later) |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built-in bots (legitimate, on your stack)

| Bot | Role | Endpoint / module |
|-----|------|-------------------|
| `intake-bot` | Validate + accept dreams | `src/lib/bots.ts` → `POST /api/dreams` |
| `render-bot` | Generate visual (stub → real video API) | `renderBot()` |
| `notify-bot` | Share-card payload | returned from POST |
| `mod-bot` | Light abuse filter | before intake |
| `calendar-bot` | Daily founder caption/prompt | `GET /api/calendar` |
| spend guard | Hard $10/day reserve | `GET /api/spend` |

No social-platform fake accounts. Posting stays on **your** Buffer/Later + brand logins.

## Content calendar

See `content-calendar.csv` (30-day founder-weighted schedule).

## Monetization with anonymous

- Free: write + basic visual + public wall  
- Paid (no name required): cinematic upgrade, “premiere tonight”, gift a film  
- Brand theme nights fund free premium slots  

## Next activations

1. Buy domain → point to Vercel  
2. Add real video/LLM API keys via host secrets  
3. Replace `data/*.json` with Supabase  
4. Connect Buffer to your TikTok / Reels / Shorts  
5. Run calendar; boost only winners within remaining budget  

## Scripts

- `npm run dev` — local  
- `npm run build` — production build  
- `npm run start` — serve build  
- `npm run lint` — ESLint  
