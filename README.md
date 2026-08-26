# The Proxy Pattern — Your Object's Bodyguard 🛡️

A 60-minute interactive **Barcamp workshop** on the **Proxy pattern**
(GoF, structural design patterns), built for the international
Design Thinking & Entrepreneurship workshop.

Everything you need lives in this repository: concept, slides,
runnable demos and two hands-on exercises with model answers.

## Start here → `workshop.html`

**Double-click [`workshop.html`](workshop.html).** That is the whole setup.

It opens in any browser, works **completely offline**, and is what we use in the
session. It contains:

- the red thread of the talk and the full glossary
- all demos with a **Run** button — real output, no terminal
- both exercises with **Run**, **Check**, a step-by-step hint ladder and the
  model answer
- the Proxy vs. Decorator vs. Adapter vs. Facade comparison and a cheat sheet

No install, no Node, no npm, no internet, no server. Your work is saved in your
browser, so you can close the tab and come back to it.

> **Participants:** this one file is all you need. Everything below is optional.

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

## Optional: run the TypeScript source

The same demos and exercises also exist as real TypeScript files in `code/`.
Useful if you want them in your own editor, or after the session.

**Requirement: Node.js ≥ 22.18** (<https://nodejs.org>) — that's it. Node runs
the TypeScript files directly, so there is still **no `npm install` and no build
step**.

```bash
cd code

node src/01-problem.ts          # the problem: direct calls to an expensive service
node src/02-virtual-proxy.ts    # virtual/caching proxy
node src/03-protection-proxy.ts # protection proxy (roles)
node src/04-logging-proxy.ts    # logging/timing proxy
node src/05-native-js-proxy.ts  # bonus: native JavaScript Proxy object

node exercise/starter/exercise.ts     # hands-on 1: caching proxy
node exercise/solution/solution.ts    # model answer
node exercise/starter/exercise2.ts    # hands-on 2: protection proxy
node exercise/solution/solution2.ts   # model answer
```

`npm run demo1`, `npm run exercise`, `npm run exercise2` and friends do exactly
the same thing — every script is just `node <file>`.

The one difference from `workshop.html`: the in-browser editors run plain
JavaScript, while these files are TypeScript. The logic is identical; TypeScript
only adds the type annotations.

## Repository structure

```
Barcamp-Workshop/
├── README.md                  <- you are here
├── workshop.html              THE workshop: handout + interactive exercises
├── docs/
│   └── workshop-concept.md    learning goals, 60-min run sheet, prep checklist
├── slides/
│   ├── proxy-pattern.md       Marp slide deck (English)
│   └── proxy-pattern.pdf      exported deck — present from this
├── assets/
│   └── uml-proxy.svg          UML class diagram
└── code/
    ├── src/                   five runnable demos (TypeScript)
    └── exercise/              two hands-on tasks: starters + model answers
```

## Presenting

Open `slides/proxy-pattern.pdf` and go fullscreen (**Ctrl+L** or **F5** in most
PDF viewers). Nothing else to start.

To re-export the deck after editing the Markdown:

```bash
npx @marp-team/marp-cli slides/proxy-pattern.md --pdf --allow-local-files
```

Keep `--allow-local-files` — the UML slide is a local SVG, and this is the flag
that lets Marp read it.

## Session agenda

The run sheet in [`docs/workshop-concept.md`](docs/workshop-concept.md#3-run-sheet)
is the single source of truth for timing. It is deliberately not repeated here,
so the two can never drift apart.

## Authors

**Cebrail K. & Tiago D.** — Barcamp "Design Patterns"
