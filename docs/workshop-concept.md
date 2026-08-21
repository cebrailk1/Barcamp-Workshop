# Workshop Concept — "The Proxy Pattern: Your Object's Bodyguard"

Barcamp session · 60 minutes · English · 2–6 participants

## 1. Classification

- **Topic:** Proxy Pattern (GoF), part of the *structural* design patterns
- **Format:** interactive Barcamp session — "from participants, for participants"
- **Setting:** international Design Thinking & Entrepreneurship workshop
- **Prerequisites for participants:** basic object-oriented programming
  (classes, interfaces, methods). No TypeScript experience required —
  the syntax is explained as we go.

## 2. Learning Goals

After the session, participants can …

1. explain what a proxy is and name everyday analogies,
2. read the UML diagram of the pattern and identify its players,
3. implement a caching proxy themselves in TypeScript,
4. distinguish Proxy from Decorator / Adapter / Facade,
5. name real-world uses (lazy loading, middleware, JS `Proxy`).

## 3. Run Sheet (60 min)

| Time | Phase | Trainer activity | Participant activity |
|---|---|---|---|
| 0–5 | Welcome & warm-up | Introduce yourselves, poll: "Who used a VPN / credit card / bouncer?" | Vote by raising hands |
| 5–10 | The problem | Live demo `npm run demo1`, collect pain points on whiteboard | Call out problems they notice |
| 10–15 | What is a Proxy? | Definition + analogies slide, present UML (`assets/uml-proxy.svg`) | Map bouncer/credit-card to UML roles |
| 15–22 | Live coding I | Walk through `demo2` (caching/virtual proxy) | Predict output before each run |
| 22–30 | Live coding II | `demo3` protection proxy, `demo4` logging; wow-moment `demo5` native JS `Proxy` | Ask questions, spot the pattern repetition |
| 30–45 | **Hands-on** | Float between pairs, give hints from ladder (see exercise README) | Pairs implement `CachingQuoteProxy` |
| 45–52 | Model answer | Run `exercise:solution`, discuss hits/misses stats | Compare with own solution |
| 52–58 | Big picture | Slides: Proxy vs. Decorator/Adapter/Facade, pros & cons, proxies in the wild | Short discussion: "Where would YOU use it?" |
| 58–60 | Wrap-up | Takeaways + Fist-to-Five feedback | Rate 0–5, one word takeaway |

**Buffer:** the "proxies in the wild" slide can be cut if hands-on runs long.

## 4. Methods

- **Warm-up poll** — activates prior knowledge, no fear of failure
- **Live coding** — mistakes allowed on purpose; shows real workflow
- **Predict-then-run** — participants guess output before each demo
- **Pair programming** — driver/navigator roles swap after 7 minutes
- **Hint ladder instead of answers** — see `code/exercise/README.md`
- **Fist-to-Five** — fast anonymous-ish feedback at the end

## 5. Roles within the Team of 2

| Role | Responsibility |
|---|---|
| Presenter A | Slides, definition/UML, big-picture part |
| Presenter B | Live coding, exercise supervision, timing keeper |

Both float during the hands-on phase so every pair gets help fast.

## 6. Preparation Checklist

- [ ] Repository shared with participants **before** the session (clone link)
- [ ] Test machine: Node.js ≥ 18 installed, `npm install` runs clean
- [ ] All six scripts tested once (`npm run demo1 … demo5`, `exercise:solution`)
- [ ] Slides exported to PDF as offline backup (`npx @marp-team/marp-cli slides/proxy-pattern.md --pdf`)
- [ ] Whiteboard/markers available for pain-point collection
- [ ] Timer visible; agree on hand signals between presenters

## 7. Environment Provided to Participants

- Complete runnable code base (`code/`) with npm scripts per demo
- Exercise starter file with TODOs + step-by-step hint ladder
- Model answer (`code/exercise/solution/`)
- This concept, README and slides — everything versioned in this repository

## 8. Expected Tricky Questions (trainer FAQ)

- *"Proxy vs. Decorator?"* → same interface both; proxy controls access
  (lazy/cache/guard), decorator adds behaviour.
- *"Isn't caching just performance?"* → yes, that's the virtual-proxy use case.
- *"Why not modify the service class?"* → open/closed principle; you may not
  own the code (third-party SDKs).
- *"Remote proxy?"* → same idea across process/network boundaries (RPC stubs);
  mentioned briefly, not coded today.

## 9. Sources & Further Reading

- Gamma, Helm, Johnson, Vlissides: *Design Patterns* (GoF), chapter on Proxy
- MDN Web Docs: [`Proxy` (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- Refactoring.Guru: Proxy pattern
