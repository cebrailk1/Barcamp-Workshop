---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section { font-size: 26px; }
  h1 { color: #2b6cb0; }
  h2 { color: #2c5282; }
  table { font-size: 22px; }
  blockquote { border-left: 6px solid #c53030; padding-left: 14px; color: #444; }
---

<!-- _paginate: false -->

# The Proxy Pattern
## Your object's bodyguard 🛡️

**Structural Design Patterns · Barcamp Session**

Workshop by *<your names here>* · 60 minutes

---

# Agenda

| Time | What |
|---|---|
| 0–5 | Welcome + warm-up poll |
| 5–15 | The problem + what is a Proxy? (UML) |
| 15–30 | Live coding: caching & protection proxies |
| 30–45 | **Hands-on:** build your own proxy (pairs) |
| 45–55 | Model answer + Proxy vs. friends |
| 55–60 | Takeaways + feedback |

---

# Warm-up 🙋

Raise your hand if you have used ...

- a **VPN**
- a **credit card**
- a **bouncer** in front of a club

> All three stand *in front of* something else and control access to it.
> That is exactly what a **Proxy** does for objects.

---

# The Problem

A gallery app talks **directly** to a remote image service:

```ts
service.fetch("cat.png");   // 400 ms network call
service.fetch("dog.png");
service.fetch("cat.png");   // same file - downloaded AGAIN!
```

- 💸 wasted bandwidth & money
- 🐌 slow first page load (everything eager)
- 🔓 anyone can call anything — no access control
- 🔗 client is welded to one concrete class

Live demo: `npm run demo1`

---

# What is a Proxy?

> A Proxy is a **stand-in object** with the **same interface** as the real
> service. Clients talk to the proxy — the proxy decides whether, when and
> how the real service is used.

- GoF classification: **structural pattern** (like Adapter, Decorator, Facade)
- Intent: *"Provide a surrogate or placeholder for another object to
  control access to it."*
- The client code **never changes**

---

# Real-world analogies

| Analogy | What it controls |
|---|---|
| 🚪 Bouncer | who gets in (**protection**) |
| 💳 Credit card | money you don't carry (**virtual**) |
| 🌍 VPN | where your request really goes (**remote**) |
| 📝 Notary | records every signature (**logging**) |

Same idea: **stand in front, add control, keep the interface.**

---

# UML

![w:880](../assets/uml-proxy.svg)

---

# The trick: one shared interface

```ts
interface ImageService {              // <- both implement THIS
  fetch(filename: string): string;
}

class CachingImageProxy implements ImageService {
  private cache = new Map<string, string>();
  private real: ImageService | null = null;   // lazy!

  fetch(name: string): string {
    const hit = this.cache.get(name);
    if (hit) return hit;                      // 1. cache first
    this.real ??= new RemoteImageService();   // 2. lazy create
    const data = this.real.fetch(name);       // 3. delegate
    this.cache.set(name, data);               // 4. remember
    return data;
  }
}
```

Live demo: `npm run demo2`

---

# Protection Proxy — access control

```ts
delete(docId: string, user: User): void {
  if (user.role !== "admin") {
    console.log("403 - only admins may delete");
    return;                        // request never reaches the store
  }
  this.real.delete(docId, user);   // authorized -> delegate
}
```

The real store stays **dumb and safe**:
it can trust that every incoming call was already checked.

Live demo: `npm run demo3`

---

# Logging / Timing Proxy

Cross-cutting concerns (logging, metrics, tracing) don't belong
inside business classes:

```ts
getTemperature(city: string): number {
  const start = performance.now();
  const result = this.real.getTemperature(city);
  console.log(`getTemperature("${city}") took ${performance.now() - start} ms`);
  return result;
}
```

Live demo: `npm run demo4`

---

# 🤯 JavaScript ships a built-in Proxy

```ts
function withLogging<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, prop) { /* wrap every method automatically */ }
  });
}
```

One handler → **all methods covered**, works on any object.

Powers **Vue 3 reactivity**, MobX, mock libraries, ...

Live demo: `npm run demo5`

---

# Hands-on time! 🛠️ (15 min, pairs)

**Mission:** make the slow quote app fast.

1. Open `code/exercise/starter/exercise.ts`
2. Implement `CachingQuoteProxy` — cache every topic after the first fetch
3. Client code must stay untouched!

```bash
npm run exercise            # your attempt
npm run exercise:solution   # model answer
```

Goal: `SUCCESS - cache works!` 🎉

Hints are at the bottom of `code/exercise/README.md`.

---

# Proxy vs. its look-alikes

| Pattern | Question it answers |
|---|---|
| **Proxy** | Same interface — controls **access** |
| **Decorator** | Same interface — **adds behaviour/responsibilities** |
| **Adapter** | **Different** interface — makes things compatible |
| **Facade** | Simplifies a **whole subsystem** behind one front door |

> Exam favourite: Proxy vs. Decorator.
> Both wrap with the same interface — but the proxy *manages access*
> (lazy, cached, guarded), the decorator *enriches*.

---

# Pros & Cons

**✅ Pros**
- control access without touching the real class
- lazy loading & caching → performance wins
- open/closed: new behaviour, old clients unchanged

**❌ Cons**
- more classes / indirection
- response time may grow (extra layer)
- overuse → "wrapper hell", hard to debug

---

# Proxies in the wild

- **Lazy-loaded images** (`loading="lazy"`) — virtual proxy in the browser
- **Express middleware** — logging/auth proxies around route handlers
- **API SDKs & caches** — retry, rate-limit, memoize remote calls
- **Vue 3 / MobX reactivity** — built on the native JS `Proxy`
- **ORM lazy relations** — `user.posts` loads from DB only when touched

---

# Takeaways

1. Proxy = **same interface**, stands **in front of** the real object
2. Controls **when/how/who**: lazy, cached, guarded, logged
3. Client code stays unchanged — that's the whole point
4. Know the difference: **Proxy ≠ Decorator ≠ Adapter**

### Feedback: Fist-to-Five ✊✋
How useful was this session for you?

**Thanks! Questions? 🙌**
