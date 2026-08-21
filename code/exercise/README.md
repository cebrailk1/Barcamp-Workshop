# Hands-on: Build your own Proxy (15 min)

Work in pairs. One laptop per pair is enough - talk while you type.

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

```bash
npm run exercise            # run YOUR version
npm run exercise:solution   # compare with the model answer
```

You succeeded when the app prints `SUCCESS - cache works!`
and the third call took less than ~50 ms.

## Hints (only if you are stuck - in order)

1. Look at demo 2 (`src/02-virtual-proxy.ts`) - you are building almost
   the same thing.
2. A `Map<string, string>` stores one value per topic:
   `cache.set(key, value)` / `cache.get(key)` returns `undefined` when absent.
3. The proxy method has three jobs: check cache -> maybe delegate ->
   remember result. Write them in that order.
4. For the bonus counter: increase `hits` on cache hit, `misses` before
   delegating.

## Questions to discuss in your pair

- What would you cache besides quotes? What should you NEVER cache?
- The client never changed. Why is that the whole point of this pattern?
