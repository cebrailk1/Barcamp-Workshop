# Workshop Concept — "The Proxy Pattern: Your Object's Bodyguard"

Barcamp session ·

## 1. Classification

- **Topic:** Proxy Pattern (GoF), part of the _structural_ design patterns
- **Format:** interactive Barcamp session — "from participants, for participants"
- **Setting:** international Design Thinking & Entrepreneurship workshop
- **Prerequisites for participants:** basic object-oriented programming
  (classes, interfaces, methods). No TypeScript experience required —
  the syntax is explained as we go. No installation required either.

## 2. Learning Goals

After the session, participants can …

1. explain what a proxy is and name everyday analogies,
2. read the UML diagram of the pattern and identify its players,
3. implement a caching proxy themselves in TypeScript,
4. distinguish Proxy from Decorator / Adapter / Facade,
5. name real-world uses (lazy loading, middleware, JS `Proxy`).

## 3. Run Sheet

> **This table is the single source of truth for timing.** The agenda slide and
> the README both point here - if you change a time, change it here first.

| Time  | Phase                | Trainer activity                                                            | Participant activity                        |
| ----- | -------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| 0–4   | Welcome & warm-up    | Introduce yourselves, poll: "Who used a VPN / credit card / bouncer?"             | Vote by raising hands                       |
| 4–9   | The problem          | Live demo `demo1`, collect pain points on the whiteboard                    | Call out problems they notice               |
| 9–15  | What is a Proxy?     | Definition + analogies, present UML (`assets/uml-proxy.svg`)                | Map the analogies onto the UML roles        |
| 15–22 | Live coding I        | Walk through `demo2` (caching/virtual proxy)                                | Predict the output before each run          |
| 22–27 | Guarding + compare   | `demo3` protection proxy, then **Proxy vs. Decorator/Adapter/Facade**       | Answer: which one is this? why?             |
| 27–31 | The wow moment       | Logging *as a slide only*, then run `demo5` (native JS `Proxy`)             | Spot the repetition demo 4 would have cost  |
| 31–46 | **Hands-on**         | Float between pairs, give hints from the ladder (built into the page)      | Pairs implement `CachingQuoteProxy` in `workshop.html` |
| 46–52 | Model answer         | Reveal "Show the model answer" in the page, discuss hits/misses stats       | Compare with own solution                   |
| 52–57 | Big picture          | Pros & cons, proxies in the wild                                            | Short discussion: "Where would YOU use it?" |
| 57–60 | Wrap-up              | Takeaways + Fist-to-Five feedback                                           | Rate 0–5, one word takeaway                 |

**Buffer:** if the hands-on runs long, cut **52–57** (pros/cons + proxies in the
wild) - both are on the handout anyway. Do *not* cut 22–27: the pattern
comparison is learning goal 4 and the most likely exam question.

**Why demo 4 is a slide, not a demo:** it exists to set up demo 5's punchline
("we wrote a wrapper for EVERY method - boring!"). Showing the slide costs 90
seconds and leaves the wow moment room to breathe. `demo4` stays runnable for
anyone who wants it at home.

**Pairs and laptops:** pair by seat, no group-forming ritual. One laptop per pair
is enough. Everyone works in **`workshop.html`** - one file, double-clicked, no
install and no internet, with Run/Check buttons and the hint ladder built in.
Send it out before the session and carry it on a USB stick as well. Both
presenters bring a spare laptop with the file already on it.

## 4. Methods

- **Warm-up poll** — activates prior knowledge, no fear of failure
- **Live coding** — mistakes allowed on purpose; shows real workflow
- **Predict-then-run** — participants guess output before each demo
- **Pair programming** — driver/navigator roles swap after 7 minutes
- **Hint ladder instead of answers** — see `code/exercise/README.md`
- **Fist-to-Five** — fast anonymous-ish feedback at the end

## 5. Roles within the Team of 2

| Role        | Responsibility                                   |
| ----------- | ------------------------------------------------ |
| Presenter A | Slides, definition/UML, big-picture part         |
| Presenter B | Live coding, exercise supervision, timing keeper |

Both float during the hands-on phase so every pair gets help fast.

## 6. Preparation Checklist

- [ ] `workshop.html` shared with participants **before** the session, and copied to
      a USB stick as a backup (that single file is all they need; the repository
      link is a bonus for anyone curious)
- [ ] Test machine: Node.js ≥ 22.18 (runs the TypeScript files directly - **no
      `npm install` needed**, and nothing to download on the day)
- [ ] All scripts tested once (`npm run demo1 … demo5`, both exercises, both solutions)
- [ ] `workshop.html` opened once by double-clicking it (a real `file://` load):
      demos run, both exercises check correctly, hints reveal one at a time
- [ ] Slides exported to PDF as offline backup - keep `--allow-local-files`, it is
      what lets Marp read the local UML SVG:
      `npx @marp-team/marp-cli slides/proxy-pattern.md --pdf --allow-local-files`
- [ ] PDF opened once and checked: 16 pages, correct agenda, UML slide shows the diagram
- [ ] Whiteboard/markers available for pain-point collection
- [ ] Timer visible; agree on hand signals between presenters

## 7. Environment Provided to Participants

- **`workshop.html`** - the workshop itself: one offline page with the glossary,
  every demo behind a Run button, both exercises with Run/Check and specific
  failure messages, the step-by-step hint ladder, and the model answers.
  No install, no build, no internet, no server.
- A second exercise (protection proxy) inside the same page, as a fast-finisher
  track for pairs who get through the caching proxy early
- The same demos and exercises as TypeScript source in `code/`, for anyone who
  wants them in their own editor - runs with plain `node file.ts`, still no install
- This concept, the README and the slides - everything versioned in this repository

## 8. Expected Tricky Questions (trainer FAQ)

- _"Proxy vs. Decorator?"_ → same interface both; proxy controls access
  (lazy/cache/guard), decorator adds behaviour.
- _"Isn't caching just performance?"_ → yes, that's the virtual-proxy use case.
- _"Why not modify the service class?"_ → open/closed principle; you may not
  own the code (third-party SDKs).
- _"Remote proxy?"_ → same idea across process/network boundaries (RPC stubs);
  mentioned briefly, not coded today.
- _"What if the cached data changes?"_ → the honest weakness of every cache:
  you trade freshness for speed. Never cache prices, permissions or stock levels
  without an invalidation rule.
- _"Is the native JS `Proxy` the same as the GoF Proxy?"_ → same idea, different
  level. GoF is a design you write by hand; `Proxy` is a language feature that
  applies it to every property of an object at once.

## 9. Sources & Further Reading

- Gamma, Helm, Johnson, Vlissides: _Design Patterns_ (GoF), chapter on Proxy
- MDN Web Docs: [`Proxy` (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- Refactoring.Guru: Proxy pattern
