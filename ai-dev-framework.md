# The AI-Powered Development Framework
### A Repeatable Workflow for Building Production-Grade, Globally Deployable Web Applications

---

## What This Is

A structured, repeatable workflow that uses multiple AI models at the right stages to go from a raw idea to a secure, production-ready web application. Each stage has a specific role. No stage is skipped. The human stays in the loop at every handoff.

This is not a vibe-coding guide. It is a framework for building apps that real users can trust with their accounts, their data, and their API keys.

---

## The Core Principle

Different AI models are good at different things. A strong reasoning model that plans poorly-scoped work produces a well-structured mess. A strong execution model that builds without a plan produces fast, broken code. This framework puts the right model at the right stage and keeps the human in control of what moves forward.

---

## The Five Stages

---

### Stage 1 — Idea Refinement

**Who does it:** User + any capable AI (Claude.ai, ChatGPT, etc.)

**What happens:**
The user brings a raw idea, a problem they want to solve, or a feature they want to build. They describe it to an AI in as much detail as they have. The AI's job here is to:

- Ask clarifying questions to surface gaps
- Identify what the app actually needs to do (not just what the user said)
- Surface edge cases and unstated assumptions
- Produce a structured **Idea Document** in plain language

**What you produce:** A written Idea Document that covers:
- What the app does
- Who it is for
- Core features (what must exist for the app to work)
- Non-core features (nice to have, not required at launch)
- Any known constraints (budget, timeline, compliance)

**Human checkpoint:** Read the Idea Document. Does it accurately describe what you want to build? Edit it until it does. Do not move to Stage 2 until you would be comfortable handing this to a developer and having them understand the project.

---

### Stage 2 — Architectural Planning

**Who does it:** User + Claude Opus 4.7 in Plan Mode (Claude Code CLI)

**What happens:**
The user sends the approved Idea Document to Claude Code with Opus 4.7 running in Plan Mode. Plan Mode is activated by pressing `Shift+Tab` twice or typing `/plan` in the Claude Code prompt.

In Plan Mode, Claude can read files, search the codebase, and reason about architecture — but it **cannot write, edit, or execute anything**. It produces a `plan.md` file.

The plan covers:
- Full project structure and file layout
- All routes and API endpoints
- Database schema design
- Authentication flow
- Security implementation checklist
- Task breakdown with dependencies and execution order
- Estimated complexity per task

**Human checkpoint:** Open the plan file (`Ctrl+G` to open it in your editor). Read every section. Ask yourself:
- Does the structure make sense?
- Are there tasks that seem overly complex or underspecified?
- Are the security steps explicit, not assumed?

Edit the plan directly if needed. Iterate with Opus until the plan is something you would be confident handing to a contractor. Do not move to Stage 3 until the plan is approved.

---

### Stage 3 — Implementation

**Who does it:** User + GPT-5.5 (via Codex, API, GitHub Copilot, or any interface the user prefers)

**What happens:**
The user sends the approved plan to GPT-5.5 as the build prompt. GPT-5.5 is instructed to implement the plan as specified — no deviation from the agreed architecture without flagging it.

The user can feed the plan in sections or all at once depending on project size and their preferred workflow. The execution tool does not matter. What matters is that the model is building against the approved plan, not improvising.

**Human checkpoint at each task:** As each section is built, the user reviews the output before moving to the next task in the plan. If GPT-5.5 deviates from the plan, it must explain why before proceeding.

---

### Stage 4 — Security Review

**Who does it:** User + Claude Opus 4.7 + Claude Security

**What happens:**
Before any deployment, the completed code goes back to Claude Opus for a security review pass. Additionally, Anthropic's **Claude Security** tool (now in public beta, accessible at claude.ai/security) can be used to run automated scans against your codebase. Claude Security identifies vulnerabilities with confidence ratings, and findings can be handed directly to Claude Code to fix in a single sitting — no back and forth between security and engineering needed.

Between Claude Opus review and Claude Security scanning, this stage covers both AI-assisted manual review and automated vulnerability detection.

**What you check against:** The full security checklist in this document.

**Human checkpoint:** Review every flagged issue from both Claude Opus and Claude Security. No item on the security checklist should be marked unresolved before going to Stage 5.

---

### Stage 5 — Deployment

**Who does it:** User, via Vercel

**What happens:**
The reviewed, approved code is deployed. Environment variables are set in the Vercel dashboard — never committed to the repository. Preview deployments are tested before promoting to production.

---

## Security Standards (Non-Negotiable)

These are not optional. Every app built with this framework must implement all of the following before going live.

### Authentication & Sessions
- OAuth 2.0 for social login (Google, GitHub, etc.)
- JWT for session tokens — short expiry (15 minutes access token, 7-day refresh token)
- Secure, HttpOnly cookies for token storage — never localStorage
- CSRF protection on all state-changing requests
- Logout invalidates tokens server-side

### User Data & API Keys
- User-supplied API keys (LLM keys, third-party credentials) are encrypted at rest using AES-256
- API keys are never logged, never returned in full after initial entry, and never stored in plaintext
- Environment variables for all secrets — never hardcoded, never committed to git
- `.env` files listed in `.gitignore` before first commit

### Input & Output
- All user inputs validated and sanitized server-side (never trust client-side validation alone)
- Parameterized queries or ORM methods for all database operations — no raw string interpolation
- Output encoding to prevent XSS
- File uploads restricted by type, size, and scanned before storage

### Infrastructure
- HTTPS enforced everywhere (Vercel handles this automatically)
- Rate limiting on all API routes, especially authentication endpoints
- Brute force protection on login (lockout after N failed attempts)
- Security headers set: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

### Multi-Factor Authentication (MFA)
- MFA must be available to all users, not just admins — it is a baseline expectation in 2026
- Offer TOTP authenticator app support at minimum (e.g. Google Authenticator, Authy)
- Require MFA for all admin and privileged accounts with no exceptions
- Session re-authentication required for sensitive actions (password change, API key access, account deletion)

### Error Handling & Information Disclosure
- Generic error pages in production — never expose stack traces, database schema details, or internal file paths to users
- All detailed error information routed only to secure, centralized server-side logging
- Error messages must not reveal whether a username or email exists (e.g. on login failure, say "incorrect credentials" not "user not found")
- Remove all debug logs and developer tooling before production deployment

### Dependency & Supply Chain Security
- Automated dependency scanning in CI/CD pipeline — block deployments with known critical vulnerabilities
- All third-party packages reviewed before addition; unused dependencies removed
- `npm audit` or equivalent run on every build
- Dependencies pinned to specific versions in production; updates tested in staging before promoting

### Web Application Firewall (WAF)
- A WAF sits between your app and the internet, detecting and blocking Layer 7 attacks (SQL injection, XSS, zero-day exploits) before they reach your server
- Vercel provides basic edge protection; for higher-risk apps, Cloudflare WAF is the recommended addition
- Acts as virtual patching — blocks known attack vectors even before you've updated vulnerable code

### Monitoring, Logging & Incident Response
- Structured logging for all authentication events, API calls, admin actions, and errors
- Logs must never contain plaintext passwords, API keys, or sensitive user data
- Anomaly alerting set up for: repeated failed logins, unusual data export volumes, access from unexpected locations
- **Incident response plan defined before launch**, not after — know who gets notified, in what order, and what the rollback procedure is
- Data breach notification timelines: GDPR requires notifying authorities within **72 hours**; CCPA requires notification within **45 days**

### OWASP Top 10 Checklist
Before deployment, verify the application is not vulnerable to:
- [ ] Broken Access Control
- [ ] Cryptographic Failures
- [ ] Injection (SQL, NoSQL, command)
- [ ] Insecure Design
- [ ] Security Misconfiguration
- [ ] Vulnerable and Outdated Components
- [ ] Identification and Authentication Failures
- [ ] Software and Data Integrity Failures
- [ ] Security Logging and Monitoring Failures
- [ ] Server-Side Request Forgery (SSRF)

---

## Privacy & Legal Compliance

This section is not optional. The moment a real user from any country creates an account, legal obligations apply. Ignorance is not a defence and regulators have automated tools that scan for non-compliance.

### GDPR (European Union)
Applies to **any app with EU users, regardless of where your company is based.** Even one European user triggers full GDPR obligations.

Required:
- Explicit opt-in consent before collecting any non-essential data (analytics, marketing, etc.)
- Cookie/tracking consent banner that blocks trackers until the user accepts — a banner that records "declined" while trackers continue running is a violation
- Separate consent toggles per data category — one "Accept All" checkbox is not valid
- In-app Privacy Centre where users can: view their data, correct it, download it, delete it, and restrict processing
- Clear plain-language privacy policy describing exactly what data is collected, why, and with whom it is shared
- Data breach notification to authorities within **72 hours** of discovery
- Data minimisation — only collect what you actually need

### CCPA / CPRA (California, USA)
Applies to for-profit businesses serving California residents that meet revenue or data volume thresholds. As of January 2026, enforcement and requirements have significantly expanded.

Required:
- "Do Not Sell or Share My Personal Information" option visible to California users
- Honour Global Privacy Control (GPC) browser signals as valid opt-out requests
- Users can request access to, correction of, and deletion of their data
- Data Protection Impact Assessment for any high-risk processing activity
- Fines start at **$2,500 per violation** and reach **$7,988 per intentional violation** — assessed per consumer

### The Practical Approach for Global Apps
Implement to the strictest standard (GDPR) as your default, then add jurisdiction-specific controls on top. A GDPR-compliant app covers the vast majority of global privacy requirements. Do not try to patchwork compliance per region — build it right once.

**Minimum required documents before launch:**
- [ ] Privacy Policy (plain language, accurate, accessible from every page)
- [ ] Terms of Service
- [ ] Cookie Policy (if using any tracking or analytics)
- [ ] In-app data management/Privacy Centre for logged-in users

---

## Recommended Stack

This stack is opinionated by design. Every choice has a reason. Alternatives are listed where the tradeoff is real.

### Framework — Next.js (App Router)
**Why:** Built and maintained by Vercel. Server Components keep AI and business logic server-side. Server Actions simplify mutations. First-class streaming for LLM responses. File-based routing maps cleanly to most app structures. TypeScript-native.

**Alternative:** Remix (better progressive enhancement, more explicit data loading model — good choice if you prioritize web fundamentals over Vercel-specific features)

---

### Language — TypeScript
**Why:** Type safety catches entire categories of bugs before runtime. Every tool in this stack is TypeScript-native. Non-negotiable for production apps.

**Alternative:** None recommended for production.

---

### Deployment — Vercel
**Why:** Zero-config Next.js deployment. Preview deployments on every PR. Automatic HTTPS. Environment variable management. Edge network out of the box.

**Cost note:** Vercel's free tier works for development. The Pro plan ($20/month per user) is required for production apps with teams. As your app scales, evaluate Railway (usage-based pricing, better for high-traffic apps) or Cloudflare Pages (best global edge performance, generous free tier).

**Alternatives:**
- Railway — best if you want predictable pricing at scale, integrated databases, and container-based deploys
- Cloudflare Pages — best for global edge speed and cost at scale
- Self-hosted (Coolify) — best for teams that want full infrastructure control

---

### Database — Supabase (PostgreSQL)
**Why:** For most apps built with this framework, Supabase is the right default. It provides PostgreSQL, authentication, file storage, and realtime subscriptions in one platform. Row Level Security (RLS) lets you enforce data access rules at the database level, which is a strong security foundation. One platform, one bill, minimal integration work.

**When to switch to Neon + Clerk instead:**
- You need branch-per-PR database workflows (Neon's standout feature)
- You're building a B2B app where enterprise SSO and organization management matter
- You want strict separation of concerns between your database and auth layer

**Alternative (auth only):** Clerk pairs with any database and is the best dedicated auth solution for Next.js. More polished UI components, stronger enterprise features (SSO, organizations, RBAC). Worth the added cost for B2B apps.

---

### ORM — Prisma
**Why:** Type-safe database queries, auto-generated types, clean migration system, large community, excellent documentation. Works with Supabase and Neon equally well.

**Alternative:** Drizzle ORM — lighter, faster, more SQL-like syntax. Good choice if you're comfortable writing SQL and want maximum performance.

---

### Styling — Tailwind CSS
**Why:** Utility-first, consistent, and what AI models write best. Ships minimal CSS in production. Works with shadcn/ui out of the box.

**UI Components:** shadcn/ui — accessible, unstyled-by-default components you own in your codebase. Not a dependency, not a lock-in.

---

### AI Integration — Vercel AI SDK
**Why:** Unified interface for calling any model provider (Anthropic, OpenAI, Google, etc.). First-class streaming support. Works natively with Next.js Server Actions and Route Handlers.

**API key handling:** User-supplied LLM API keys must be encrypted at rest and decrypted only in server-side route handlers. Never pass user API keys to the client. Never log them.

---

## The AI Models and Their Roles

| Stage | Model | Role |
|---|---|---|
| Ideation | Any capable AI | Polish the idea, surface gaps |
| Planning | Claude Opus 4.7 (Plan Mode) | Architect the build, produce the plan |
| Execution | GPT-5.5 | Implement the approved plan |
| Security Review | Claude Opus 4.7 | Review against security checklist |

**Why Opus for planning and review?** As of May 2026, independent benchmarks show Claude Opus 4.7 outperforming GPT-5.5 across reasoning and analysis categories. Planning and security review are reasoning-heavy tasks. GPT-5.5 excels at agentic execution — handling multi-step, multi-file implementation with less guidance. Use each where it is strongest.

**Model flexibility:** This framework is model-agnostic at every stage. If a better model becomes available, swap it in. The stage structure and human checkpoints are what matter, not the specific model.

---

## Human Checkpoints Summary

| After Stage | What You Check | Pass Condition |
|---|---|---|
| Stage 1 | Idea Document | Accurately describes what you want to build |
| Stage 2 | Architectural Plan | Structure is sound, security steps are explicit |
| Stage 3 (each task) | Built code | Matches plan, no unexplained deviations |
| Stage 4 | Security review | All OWASP items addressed, no open issues |
| Stage 5 | Preview deployment | App works as expected before promoting to production |

---

## Common Mistakes This Framework Prevents

**Skipping the plan and going straight to code.** Without an approved architecture, the execution model improvises. You get fast code that solves the wrong problem or builds the wrong structure.

**Treating security as a final step.** Security is baked into Stage 2 (the plan includes it) and Stage 4 (it is reviewed before deployment). It is not an afterthought.

**Storing secrets wrong.** API keys and secrets belong in environment variables. This is specified in the plan stage and enforced in the security review.

**Letting the AI deviate from the plan silently.** Stage 3 requires the user to review each task. If GPT-5.5 changes the approach without explanation, that is a checkpoint failure, not a feature.

**Deploying without a security review.** Stage 4 exists because AI-generated code frequently contains security gaps. The security review is not optional.

---

## Starting a New Project with This Framework

1. Open Claude.ai (or any capable AI) and describe your idea
2. Iterate until you have an approved Idea Document
3. Open Claude Code, select Opus 4.7, enter Plan Mode (`/plan` or `Shift+Tab` twice)
4. Send the Idea Document and ask Opus to produce an architectural plan
5. Review the plan, edit as needed, approve it
6. Open GPT-5.5 (Codex, API, GitHub Copilot, or your preferred interface)
7. Send the approved plan and build task by task
8. Return to Claude Opus for security review
9. Deploy to Vercel from your approved, reviewed codebase

---

## Using This Framework as a Live Prompt

This document is designed to be pasted directly into any AI at the start of a session. You don't need to explain the workflow — the AI reads the framework and knows its role at each stage.

**What this framework is:**
- A structured workflow that guides you through 5 stages
- A security and privacy checklist baked into the process
- A way to keep humans in control at every checkpoint

**What this framework is NOT:**
- A "paste this and get a finished app" prompt
- A replacement for your own idea, judgment, or effort
- A shortcut that skips the work

**How to use it:**

Paste this entire document into your AI of choice and say something like:

> "I want to use this framework. Here it is: [paste framework]"

The AI will read it and respond ready to begin Stage 1 — it will ask for your idea and guide you through the process from there. You still need to bring your idea, review each output, and make decisions at checkpoints. The framework ensures the process is solid. It doesn't replace the work — it structures it.

This means the framework is both documentation and a working tool. Share it with a teammate and they can start a session the same way. Paste it into a new conversation and pick up where you left off. The workflow is portable, repeatable, and self-explanatory to any capable AI model.

## A Note for Solo Developers

This framework was designed to be used by anyone — a team of one or a team of one hundred. If you are building independently, nothing in this document is beyond your reach. But there are a few things worth understanding clearly.

**You are still a data controller under GDPR.** The law does not have a solo developer exemption. The moment a user in the EU creates an account on your app, you have legal obligations around their data. Company size is irrelevant. What matters is whose data you are processing and where they are from.

**You are not held to an enterprise operational standard.** Regulators pursue bad actors and negligence. A solo developer who made a genuine, documented effort to handle user data responsibly is in a fundamentally different position from a company that ignored the rules entirely. Building with this framework is that documented effort.

**What solo developers most commonly skip — and shouldn't:**
- Privacy Policy and Terms of Service — these must exist before your first real user, not after
- In-app data controls — users need to be able to view, edit, and delete their data
- Breach notification plan — you do not need a team, you need a written note to yourself: if something goes wrong, here is what I do and who I contact

**What realistically scales with size:**
- Formal certifications (SOC 2, ISO 27001) are enterprise requirements — not expected at indie scale
- CCPA has revenue and data volume thresholds — a small app will likely fall below them at launch, but revisit this as you grow
- A dedicated security team is not realistic — but one person who takes security seriously and follows this framework is enough to launch responsibly

**The principle that does not change regardless of your size:** your users are trusting you with their account, their data, and potentially their API keys. That trust is the same whether you have ten users or ten thousand. This framework exists to make sure you deserve it.

---

*Framework version: 1.0 — May 2026*
*Built for production. Designed to scale. Security-first by default.*
