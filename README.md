# The Proxy Pattern — Your Object's Bodyguard 🛡️

A 60-minute interactive **Barcamp workshop** on the **Proxy pattern**
(GoF, structural design patterns), built for the international
Design Thinking & Entrepreneurship workshop.

Everything you need lives in this repository: concept, slides,
runnable demos and a hands-on exercise with a model answer.

## What is the Proxy pattern?

> A proxy is an object with the **same interface** as a real service.
> Clients talk to the proxy; the proxy controls **whether, when and how**
> the real service is used.

**Typical use cases**

| Variant | Use case | Example in this repo |
|---|---|---|
| Virtual proxy | expensive objects created/loaded lazily | `02-virtual-proxy.ts` |
| Caching proxy | repeated requests answered from memory | `02-virtual-proxy.ts` |
| Protection proxy | access control by role/permission | `03-protection-proxy.ts` |
| Logging/timing proxy | cross-cutting concerns around any call | `04-logging-proxy.ts` |
| Remote proxy | stand-in for an object in another process/network | discussed, not coded |

**Benefits:** performance (lazy + cache), security (guards), clean clients
(open/closed principle — behaviour added without touching existing code).
**Drawbacks:** extra indirection, more classes, can hide latency.

## Repository structure

```
proxy-pattern-workshop/
├── README.md                  <- you are here
├── docs/
│   └── workshop-concept.md    learning goals, 60-min run sheet, prep checklist
├── slides/
│   └── proxy-pattern.md       Marp slide deck (English)
├── assets/
│   └── uml-proxy.svg          UML class diagram
└── code/
    ├── src/                   five runnable demos
    └── exercise/              hands-on task: starter + model answer
```

## Requirements

- Node.js ≥ 18 (<https://nodejs.org>)
- npm (comes with Node)

## Quick start

```bash
git clone <this-repo>
cd proxy-pattern-workshop/code
npm install

npm run demo1     # the problem: direct calls to an expensive service
npm run demo2     # virtual/caching proxy
npm run demo3     # protection proxy (roles)
npm run demo4     # logging/timing proxy
npm run demo5     # bonus: native JavaScript Proxy object

npm run exercise            # hands-on starter (your turn!)
npm run exercise:solution   # model answer
```

## Slides

The deck is written in [Marp](https://marp.app/) Markdown. Render to PDF:

```bash
npx @marp-team/marp-cli slides/proxy-pattern.md --pdf --allow-local-files
```

## Session agenda (60 min)

1. Welcome & warm-up poll (5')
2. Problem demo + definition + UML (10')
3. Live coding: caching & protection proxies (15')
4. Hands-on: build your own caching proxy in pairs (15')
5. Model answer + Proxy vs. Decorator/Adapter/Facade (10')
6. Takeaways + Fist-to-Five feedback (5')

## Authors

*<your names here>* — Gruppe <x>, Barcamp "Design Patterns"
