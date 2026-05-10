# gwak.gg

**Trade. Watch. Grow.**

gwak.gg is a TikTok-style vertical-scroll feed that aggregates three rails of degen attention onto a single screen with one-tap stakes — $5, $10, $20, or $50. Pick a card. Pick an amount. Tap. The trade settles on Solana. Keep scrolling.

All execution is on **Solana mainnet**. Auth and signing are handled by a **Privy embedded Solana wallet** — users never touch a seed phrase, never install a wallet extension, and (with the gasless flag on) never hold SOL.

---

## The three rails

| Rail | What it is | Execution venue |
| --- | --- | --- |
| **Meme** | Buy a hot Solana SPL token surfaced by trending boosts | Jupiter Swap |
| **Prediction** | YES / NO on a Jupiter Prediction market (Polymarket + Kalshi liquidity) | Jupiter Prediction |
| **Whale** | Tail or Fade a leveraged perp position spotted on Hyperliquid | Flash Trade (Crypto.1 pool: SOL / BTC / ETH) |

The whale rail's **signal source** is Hyperliquid (curated wallet list, polled via REST), but **execution** is Solana-native through Flash Trade so the user never leaves the chain.

Each card on the feed is a `Signal` produced by a cron-driven pipeline (more on that below) and ranked by a per-rail `heatScore`.

---

## Tech stack

- **Framework:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind v4
- **Auth & signing:** Privy (`@privy-io/react-auth`, `@privy-io/server-auth`) — embedded Solana wallet
- **Database:** Neon Postgres via Vercel Marketplace + Drizzle ORM (HTTP driver, not pool — fits serverless)
- **Solana:** `@solana/web3.js` v1 + `@solana/kit` (only for Privy RPC subs)
- **Trading integrations:**
  - Jupiter Swap (`lite-api.jup.ag`) for memes
  - Jupiter Prediction (`api.jup.ag/prediction/v1`) for prediction markets
  - Flash Trade (`flash-sdk`) for perps
  - DexScreener + Hyperliquid REST for signal sourcing
- **Cron:** Vercel Cron declared in [vercel.json](vercel.json)
- **RPC:** Helius mainnet (used by both client and server)
- **Analytics:** PostHog, Vercel Analytics, Vercel Speed Insights

---

## Repo layout

```
app/
  page.tsx                 # Redirects to /feed (waitlist landing kept in components/landing)
  layout.tsx               # PrivyClientProvider wrap, manifest/metadata
  feed/page.tsx            # Server component, hydrates with top 50 signals
  deposit/page.tsx         # First-time funding (USDC address + QR)
  portfolio/page.tsx       # Open + closed positions
  api/
    feed/route.ts          # GET signals ordered by heatScore desc
    portfolio/route.ts     # GET positions with live PnL quotes
    users/me/route.ts      # POST upsert Privy <-> Solana mapping
    withdraw/route.ts      # POST sign-ready USDC transfer (with consolidate phase)
    bet/{meme,prediction,perp}/
      route.ts             # POST open
      confirm/route.ts     # POST mark open tx confirmed (or failed)
      close/route.ts       # POST build close tx
      close/confirm/route.ts  # POST mark close tx confirmed
    cron/refresh-{memes,predictions,whales}/route.ts
components/
  feed/                    # FeedContainer + per-rail card + StakeButtons
  portfolio/               # PositionRow, CloseButton, WithdrawButton
  shell/                   # BalancePill (top), BottomNav
  auth/                    # AuthGate (login wall), UserEnsure (syncs DB row)
  providers/               # PrivyClientProvider, PostHogProvider
lib/
  db/                      # schema, queries, drizzle client
  privy/                   # server auth verify, client wallet hook
  auth/cron.ts             # checkCronAuth (Bearer CRON_SECRET)
  users/ensure.ts          # upsert by privyId, sync solanaPubkey
  signals/                 # heat-* scoring + refresh-* pipelines + sparkline
  jupiter/                 # swap.ts (builds raw or gasless tx), constants
  jupiter-prediction/      # client for prediction markets
  flash-trade/             # perp open/close via swapAndOpen / closeAndSwap
  hyperliquid/             # client + CURATED_WHALES watchlist
  dexscreener/             # boosts/trending API client
  solana/                  # balance helpers + use-usdc-balance hook
  usd/consolidate.ts       # jupUSD -> USDC bridge for the bet flow
  bets/post-with-consolidation.ts  # client helper that wraps the consolidate dance
  wallets/                 # gas + treasury wallet helpers (gasless mode)
  types.ts                 # Signal, MemeSignal, PredictionSignal, WhaleSignal, ...
scripts/                   # local cron runners + ad-hoc test mjs
docs/superpowers/          # plans + specs
```

---

## Getting started

### Prerequisites

- Node 20+
- A Neon Postgres database (via Vercel Marketplace is fine)
- A Privy app (App ID + secret)
- A Helius mainnet RPC URL
- For gasless mode: a funded Solana keypair for the Gas Wallet and a Treasury pubkey

### Install

```bash
npm install
cp .env.example .env.local
# fill in DATABASE_URL, NEXT_PUBLIC_PRIVY_APP_ID, PRIVY_APP_SECRET,
# NEXT_PUBLIC_HELIUS_RPC_URL, CRON_SECRET, FEATURE_GASLESS_BETS,
# GAS_WALLET_PRIVATE_KEY, TREASURY_PUBKEY
npm run db:push        # apply Drizzle schema to your DB
npm run db:seed        # optional: populate signals from lib/mock-data.ts
npm run dev            # http://localhost:3000
```

### Commands

```bash
npm run dev              # Next.js dev server
npm run build            # production build
npm run start            # run built app
npm run lint             # next lint
npm run typecheck        # tsc --noEmit

# Database
npm run db:push          # drizzle-kit push - apply schema
npm run db:studio        # drizzle-kit studio - visual browser
npm run db:seed          # seed signals from mock-data.ts

# Local cron simulators (hit real APIs, write to DB via .env.local)
npm run refresh:memes
npm run refresh:predictions
npm run refresh:whales

# Ops
npm run refuel:gas       # Treasury USDC -> SOL -> Gas Wallet (requires TREASURY_PRIVATE_KEY at invocation)
```

There is no test runner configured. Verification = `npm run typecheck && npm run lint` plus exercising the flow in the browser.

### Environment variables

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy app (client-visible) |
| `PRIVY_APP_SECRET` | Privy app secret (server) |
| `NEXT_PUBLIC_HELIUS_RPC_URL` | Helius mainnet RPC, used by client and server |
| `CRON_SECRET` | `/api/cron/*` rejects requests without `Authorization: Bearer ${CRON_SECRET}` |
| `FEATURE_GASLESS_BETS` | `"true"` flips every bet/close/withdraw onto the gasless path |
| `GAS_WALLET_PRIVATE_KEY` | base58 secret for the Gas Wallet (required when gasless is on) |
| `TREASURY_PUBKEY` | Treasury Wallet pubkey, receives USDC platform fees |

`drizzle.config.ts` reads `.env.local` directly (via `dotenv`), so `db:push` / `db:studio` work outside Next.

---

## Architecture

### Signal pipeline

```
Vercel Cron (every 1-2 min)
   |
   |-> /api/cron/refresh-memes        --> refreshMemes()
   |     DexScreener boosts -> top pairs -> memeHeatScore
   |
   |-> /api/cron/refresh-predictions  --> refreshPredictions()
   |     Jupiter Prediction events -> predictionHeatScore
   |     Multi-outcome events emit a `multiprediction` signal type
   |
   |-> /api/cron/refresh-whales       --> refreshWhales()
         Hyperliquid REST poll of CURATED_WHALES -> whaleHeatScore
```

Each cron route guards on `checkCronAuth` (Bearer `CRON_SECRET`), runs `runtime: "nodejs"`, `maxDuration: 60`. The `signals` table is a **write-through cache**, not a log — each refresh does `DELETE WHERE type = X` then bulk-inserts the new top N. The frontend reads via `getFeedSignals(limit)` ordered by `heatScore` desc.

To exercise locally without curl-ing the endpoint, use `npm run refresh:*` — they call the same `refresh*()` function directly under `tsx --env-file=.env.local`.

### Bet lifecycle

A bet is a multi-phase dance. The **client orchestrates**; the **server only ever builds unsigned transactions**. Privy's wallet signs; Helius RPC submits.

1. **`POST /api/bet/{rail}`** — server validates, runs balance preflight (see USDC consolidation), builds the open tx (Jupiter swap / Jupiter Prediction order / Flash `swapAndOpen`). When `FEATURE_GASLESS_BETS=true`, the tx is built with **Gas Wallet as fee payer** and a **Treasury USDC fee transfer instruction appended** (0.5% + $0.05); server partial-signs as the fee payer before returning. Inserts a `bets` row with `status: "pending"`, returns one of:
   - `{ phase: "open", betId, swapTransaction }`
   - `{ phase: "consolidate", consolidationTransaction }`
   - `{ phase: "open", betId, prefundTransaction, swapTransaction }` (prediction rail under gasless)

2. **Client signs** via `signTransaction` from `@privy-io/react-auth/solana` and **submits raw via Helius** (`Connection.sendRawTransaction`). Privy's built-in submit can't resolve Address Lookup Tables, which both Jupiter swaps and Flash perps use, so we sign-only and broadcast ourselves. This logic is centralized in [lib/bets/post-with-consolidation.ts](lib/bets/post-with-consolidation.ts).

3. **`POST /api/bet/{rail}/confirm`** — client posts back the tx signature; server flips `status: "pending" -> "confirmed"` (or `"failed"`).

Close mirrors this: `close` builds, client signs+submits, `close/confirm` writes `proceedsUsdc` and `closeTxHash`. Closes carry no platform fee.

A pending bet that never reaches `confirm` (user cancels the wallet modal, network drops mid-sign) gets reaped to `status: "abandoned"` after 5 minutes by `/api/portfolio`.

### Gasless mode (server fee payer)

When `FEATURE_GASLESS_BETS=true`:

- Users hold only **USDC**. They never need SOL.
- Every user tx (bet, close, withdraw, consolidation) is fee-paid by a server-controlled **Gas Wallet** ([lib/wallets/gas.ts](lib/wallets/gas.ts)).
- A platform fee of **0.5% + $0.05 per open** is appended as a `TransferChecked` USDC instruction inside the same tx, routed to a **Treasury Wallet** ([lib/wallets/treasury.ts](lib/wallets/treasury.ts)). Closes and withdraws are free.

Per-rail integration:

- **Meme & consolidate** — Jupiter `/swap-instructions` returns raw ixs; we compose them with Gas Wallet as fee payer and append the fee ix.
- **Whale (Flash perp)** — Flash builds the tx; we pass `gaslessFeePayer` and `appendInstructions` to inject the Gas Wallet pubkey + fee ix.
- **Prediction (Jupiter Prediction)** — Jupiter's tx is baked with the user as fee payer and cannot be modified. We use **atomic prefund**: a separate Gas Wallet -> user SOL drip (~0.005 SOL when needed) + USDC fee transfer in one tx, landed before the prediction tx. Position rent (~0.003 SOL) refunds back to the user on close, so most subsequent prediction bets skip the drip.

Ops: `npm run refuel:gas` swaps Treasury USDC -> SOL via Jupiter and transfers to Gas Wallet when its balance drops below ~1 SOL.

### USDC <-> jupUSD consolidation

Jupiter Prediction settles winnings in **jupUSD**, not USDC. The user's "$X ready" balance pill sums USDC + jupUSD (both peg 1:1), but every bet and withdraw needs unified USDC. [lib/usd/consolidate.ts](lib/usd/consolidate.ts) handles this:

- **`ensureUsdcOrConsolidate({ userPubkey, requiredUsd })`** — legacy path. If USDC >= required, returns `{ ready: true }`. If USDC + jupUSD covers it but USDC alone doesn't, returns a Jupiter `jupUSD -> USDC` swap tx for the shortfall (with a 2% over-swap buffer for stable-to-stable slippage).
- **`ensureUsdcOrConsolidateGasless`** — same logic, tx built with Gas Wallet as fee payer.

When a bet or withdraw route returns `phase: "consolidate"`, `postBetWithConsolidation` signs the swap, waits for chain confirmation + a 1.5s RPC propagation buffer, then re-calls the same endpoint. Capped at 2 attempts to avoid infinite loops.

### Database (Drizzle)

Schema in [lib/db/schema.ts](lib/db/schema.ts). Five tables: `users`, `signals`, `bets`, `whale_wallets`, `feed_views`.

`bets.meta` is a free-form JSONB used per rail to remember what's needed to close the position:
- **Meme:** token mint + delivered atomic out
- **Prediction:** positionPubkey + contracts
- **Perp:** flashAsset + direction + leverage

### Auth flow

- Client calls `usePrivy().getAccessToken()`, passes the JWT as `Authorization: Bearer <token>`.
- Server `verifyPrivyRequest(request)` in [lib/privy/server.ts](lib/privy/server.ts) calls `privyServer.verifyAuthToken` and returns `{ userId, appId, sessionId }` or `null`.
- After login, `<UserEnsure />` POSTs to `/api/users/me` to upsert the `users` row and sync `solanaPubkey`. The whole authed UI is wrapped in `<AuthGate>`, which shows a login wall if `!authenticated`.

---

## Important quirks

### Flash Trade self-collateralization

Flash's Crypto.1 perp markets are **self-collateralized** — SOL/Long expects SOL collateral, BTC/Long expects BTC, etc. Calling `openPosition` with USDC collateral against a SOL/Long market hits Anchor `0xbc4` (`AccountNotInitialized`). We use `swapAndOpen` / `closeAndSwap` so Flash performs the USDC <-> target swap inline within the same tx.

### Drift dead code

The original design doc named **Drift Protocol** for perp execution. The shipped code uses **Flash Trade**. `lib/drift/*` exists but is unimported and dead — leave it alone unless you're explicitly reviving Drift. All perp routes import from `lib/flash-trade/`.

### Spec vs. code

The design spec ([docs/superpowers/specs/2026-05-04-fast-bet-design.md](docs/superpowers/specs/2026-05-04-fast-bet-design.md)) lists future-state pieces (SSE feed stream, `/history` page, Hyperliquid WS subscriptions) that are not in the codebase yet. Treat the spec as historical context; the README is the current state.

### Ad-hoc scripts hit mainnet

The `scripts/_test-*.mjs` files are one-off probes against mainnet (open a perp, close a perp, check a wallet, etc.). Read each one before running — they hit real RPCs and may sign real transactions.

---

## Cron schedules

From [vercel.json](vercel.json):

| Route | Schedule |
| --- | --- |
| `/api/cron/refresh-memes` | every minute |
| `/api/cron/refresh-predictions` | every 2 minutes |
| `/api/cron/refresh-whales` | every 2 minutes |

All cron routes require `Authorization: Bearer ${CRON_SECRET}` (Vercel sets this header automatically in production).

---

## Further reading

- [CLAUDE.md](CLAUDE.md) — orientation doc for AI agents working in this codebase (also useful for humans).
- [docs/superpowers/specs/2026-05-04-fast-bet-design.md](docs/superpowers/specs/2026-05-04-fast-bet-design.md) — original product spec.
- [docs/superpowers/specs/2026-05-05-gasless-trades-design.md](docs/superpowers/specs/2026-05-05-gasless-trades-design.md) — gasless architecture.
- [docs/superpowers/plans/2026-05-05-gasless-trades.md](docs/superpowers/plans/2026-05-05-gasless-trades.md) — implementation plan for gasless.
