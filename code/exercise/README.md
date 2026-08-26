# Hands-on: Build your own Proxy (15 min)

Work in pairs. One laptop per pair is enough - talk while you type.
Swap driver and navigator after 7 minutes.

## Where to work

**In the session we use `workshop.html`** - double-click it in the repository
root. The same exercise is in there, with a Run button, a Check button, the hint
ladder and the model answer. Nothing to install.

These files are the same exercise as TypeScript, for your own editor or for
after the session. Node 22.18+ runs them directly - still nothing to install:

```bash
node exercise/starter/exercise.ts      # run YOUR version
node exercise/solution/solution.ts     # compare with the model answer
```

`npm run exercise` / `npm run exercise:solution` do the same thing.

## Your mission

`exercise/starter/exercise.ts` contains a working app with one problem:
every quote request hits a **slow remote service** (600 ms), even for
topics that were already requested.

Open the file and implement `CachingQuoteProxy`. It must:

1. fetch every topic from the real service **at most once**
2. answer repeated requests **instantly** from a cache
3. keep the client code at the bottom **unchanged**

## Bonus (if you are fast)

4. log every call as `[PROXY] cache hit` / cache miss
5. add a `stats()` method returning `{ hits, misses }`

## Check yourself

You succeeded when the app prints `SUCCESS - cache works!`.
If not, it lists exactly which condition still fails - read that list,
it is more useful than guessing.

## Hints (only if you are stuck - in order)

1. Look at demo 2 (`src/02-virtual-proxy.ts`) - you are building almost
   the same thing.
2. A `Map<string, string>` stores one value per topic:
   `cache.set(key, value)` / `cache.get(key)` returns `undefined` when absent.
3. The proxy method has three jobs: check cache -> maybe delegate ->
   remember result. Write them in that order.
4. For the bonus counter: increase `hits` on cache hit, `misses` before
   delegating.

## Finished early? Exercise 2: the protection proxy

Same pattern, different job - the proxy decides **who** may do what
instead of **when** to call:

```bash
node exercise/starter/exercise2.ts      # your version
node exercise/solution/solution2.ts     # model answer
```

Implement `ProtectedDocumentProxy`: everyone may read, only an `admin`
may delete, and a denied delete must never reach the real store.

## Questions to discuss in your pair

- What would you cache besides quotes? What should you NEVER cache?
- The client never changed. Why is that the whole point of this pattern?
- Exercise 2: why is checking permissions in the proxy safer than
  checking them inside `RealDocumentService`?
