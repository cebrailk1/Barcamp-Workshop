# The Proxy Pattern — Your Object's Bodyguard 🛡️

A 60-minute interactive **Barcamp workshop** on the **Proxy pattern**
(GoF, structural design patterns), built for the international
Design Thinking & Entrepreneurship workshop.

Everything you need lives in this repository: concept, slides,
runnable demos and two hands-on exercises with model answers.

## What is the Proxy pattern?

> A proxy is an object with the **same interface** as a real service.
> Clients talk to the proxy; the proxy controls **whether, when and how**
> the real service is used.

**Typical use cases**

| Variant | Use case | Example in this repo |
|---|---|---|
| Virtual proxy | expensive objects created/loaded lazily | `02-virtual-proxy.ts` |
| Caching proxy | repeated requests answered from memory | `02-virtual-proxy.ts`, exercise 1 |
| Protection proxy | access control by role/permission | `03-protection-proxy.ts`, exercise 2 |
| Logging/timing proxy | cross-cutting concerns around any call | `04-logging-proxy.ts` |
| Remote proxy | stand-in for an object in another process/network | discussed, not coded |

**Benefits:** performance (lazy + cache), security (guards), clean clients
(open/closed principle — behaviour added without touching existing code).
**Drawbacks:** extra indirection, more classes, can hide latency.

## Quick start

**Requirement: Node.js ≥ 22.18** (<https://nodejs.org>) — that's it.
Node runs the TypeScript files directly, so there is **no `npm install`,
no build step and nothing to download on the day.**

```bash
cd Barcamp-Workshop/code

npm run demo1     # the problem: direct calls to an expensive service
npm run demo2     # virtual/caching proxy
npm run demo3     # protection proxy (roles)
npm run demo4     # logging/timing proxy
npm run demo5     # bonus: native JavaScript Proxy object

npm run exercise             # hands-on 1: caching proxy (your turn!)
npm run exercise:solution    # model answer
npm run exercise2            # hands-on 2: protection proxy (fast finishers)
npm run exercise:solution2   # model answer
```

Every script is just `node <file>` — you can also run the files directly:

```bash
node src/01-problem.ts
```

### No Node? No problem.

Double-click **`workshop.html`** in the repository root. It opens in any
browser, works completely offline, and contains the glossary, the runnable
demos and both exercises with Run and Check buttons. Nothing to install,
nothing to deploy.

## Repository structure

```
Barcamp-Workshop/
├── README.md                  <- you are here
├── workshop.html              offline handout + interactive exercises
├── docs/
│   └── workshop-concept.md    learning goals, 60-min run sheet, prep checklist
├── slides/
│   ├── proxy-pattern.md       Marp slide deck (English)
│   └── proxy-pattern.pdf      exported deck (offline backup)
├── assets/
│   └── uml-proxy.svg          UML class diagram
└── code/
    ├── src/                   five runnable demos
    └── exercise/              two hands-on tasks: starters + model answers
```

## Slides

The deck is written in [Marp](https://marp.app/) Markdown. Render to PDF:

```bash
npx @marp-team/marp-cli slides/proxy-pattern.md --pdf --allow-local-files
```

`--allow-local-files` is **required** — without it the UML slide exports blank.

## Session agenda

The run sheet in [`docs/workshop-concept.md`](docs/workshop-concept.md#3-run-sheet)
is the single source of truth for timing. It is deliberately not repeated here,
so the two can never drift apart.

## Authors

**Cebrail K. & Tiago D.** — Barcamp "Design Patterns"
