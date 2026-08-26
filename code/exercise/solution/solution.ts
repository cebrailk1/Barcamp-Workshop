/**
 * MODEL ANSWER - CachingQuoteProxy (with logging + stats bonus)
 *
 * Run: npm run exercise:solution
 */

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

// ---------- model answer ---------------------------------------------------

class CachingQuoteProxy implements QuoteService {
  private cache = new Map<string, string>();
  private hits = 0;
  private misses = 0;

  private real: QuoteService;

  constructor(real: QuoteService) {
    this.real = real;
  }

  getQuote(topic: string): string {
    const cached = this.cache.get(topic);
    if (cached !== undefined) {
      this.hits++;
      console.log(`   [PROXY ] cache hit for "${topic}"`);
      return cached;
    }

    this.misses++;
    const fresh = this.real.getQuote(topic); // delegate
    this.cache.set(topic, fresh); // remember
    return fresh;
  }

  stats(): { hits: number; misses: number } {
    return { hits: this.hits, misses: this.misses };
  }
}

// ---------- client code ----------------------------------------------------

const remote = new SlowRemoteQuoteService();
const service = new CachingQuoteProxy(remote); // concrete type: we want stats()

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

console.log(`Stats: ${JSON.stringify(service.stats())}`);

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
