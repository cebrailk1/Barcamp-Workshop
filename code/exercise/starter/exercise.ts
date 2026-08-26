/**
 * HANDS-ON EXERCISE - Build your own proxy!
 *
 * Your mission: this app asks for quotes about topics. The real service
 * is SLOW (600 ms per call) and the app asks for the same topic a lot.
 *
 * Implement `CachingQuoteProxy` so that:
 *   1. every topic is fetched from the real service at most ONCE
 *   2. repeated requests are answered instantly from your cache
 *   3. the client code below stays UNTOUCHED
 *
 * Bonus (if you are fast):
 *   4. log every call: cache hit or miss
 *   5. add a `stats()` method returning how many hits/misses happened
 *
 * Run your attempt:   npm run exercise
 * Run the model answer: npm run exercise:solution
 */

// ---------- given code: do NOT change ------------------------------------

function simulateNetworkDelay(ms: number): void {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    /* blocking on purpose */
  }
}

interface QuoteService {
  getQuote(topic: string): string;
}

class SlowRemoteQuoteService implements QuoteService {
  /** how often the REAL service was actually hit - the proxy must keep this low */
  calls = 0;

  getQuote(topic: string): string {
    this.calls++;
    console.log(`   [NETWORK] searching quotes about "${topic}" ...`);
    simulateNetworkDelay(600);
    const quotes: Record<string, string> = {
      design: "Simplicity is the ultimate sophistication.",
      code: "Talk is cheap. Show me the code.",
      life: "The best way to predict the future is to invent it.",
    };
    return quotes[topic] ?? `"${topic}"? Stay curious!`;
  }
}

// ---------- YOUR WORK -----------------------------------------------------

class CachingQuoteProxy implements QuoteService {
  // TODO 1: add a private cache (a Map<string, string> fits nicely)

  private real: QuoteService;

  constructor(real: QuoteService) {
    this.real = real;
  }

  getQuote(topic: string): string {
    // TODO 2: if the topic is already cached -> return it immediately
    //         (and maybe log "[PROXY] cache hit")

    // TODO 3: otherwise delegate to the real service,
    //         store the result in the cache, then return it

    return ""; // <- replace this line
  }

  // TODO 5 (bonus): stats()
}

// ---------- client code: do NOT change ------------------------------------

const remote = new SlowRemoteQuoteService();
const service: QuoteService = new CachingQuoteProxy(remote);

console.log("User opens the app three times:\n");

let start = Date.now();
const first = service.getQuote("design");
const firstMs = Date.now() - start;
console.log(`1st: ${first}`);
console.log(`    took ${firstMs} ms\n`);

start = Date.now();
const second = service.getQuote("code");
const secondMs = Date.now() - start;
console.log(`2nd: ${second}`);
console.log(`    took ${secondMs} ms\n`);

start = Date.now();
const third = service.getQuote("design");
const thirdMs = Date.now() - start; // measured BEFORE any printing
console.log(`3rd: ${third}  <-- same topic again!`);
console.log(`    took ${thirdMs} ms\n`);

// Every check tells you exactly what is still missing.
const checks: Array<[boolean, string]> = [
  [first === "Simplicity is the ultimate sophistication.",
    'the 1st call must return the real quote about "design"'],
  [second === "Talk is cheap. Show me the code.",
    'the 2nd call must return the real quote about "code"'],
  [third === first,
    "the 3rd call must return the same answer as the 1st"],
  [remote.calls === 2,
    `the real service was called ${remote.calls}x - it must be exactly 2 (design, code)`],
  [thirdMs < 150,
    `the 3rd call took ${thirdMs} ms - a cache hit must be instant`],
];

const failed = checks.filter(([ok]) => !ok);

if (failed.length === 0) {
  console.log("SUCCESS - cache works!");
} else {
  console.log("Not yet:");
  for (const [, why] of failed) console.log(`  - ${why}`);
}

// makes this file a standalone module (isolated scope)
export {};
