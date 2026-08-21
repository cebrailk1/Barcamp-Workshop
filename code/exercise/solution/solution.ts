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
  getQuote(topic: string): string {
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

  constructor(private real: QuoteService) {}

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

const service = new CachingQuoteProxy(new SlowRemoteQuoteService());

console.log("User opens the app three times:\n");

let start = Date.now();
const first = service.getQuote("design");
console.log(`1st: ${first}`);
console.log(`    took ${Date.now() - start} ms\n`);

start = Date.now();
console.log(`2nd: ${service.getQuote("code")}`);
console.log(`    took ${Date.now() - start} ms\n`);

start = Date.now();
const third = service.getQuote("design");
console.log(`3rd: ${third}  <-- same topic again!`);
console.log(`    took ${Date.now() - start} ms\n`);

console.log(`Stats: ${JSON.stringify(service.stats())}`);

const works =
  first.length > 0 &&      // real quote, not an empty string
  third === first &&       // identical answer for the same topic
  Date.now() - start < 50; // and FAST (no second network call)

console.log(works ? "SUCCESS - cache works!" : "FAILED");

// makes this file a standalone module (isolated scope)
export {};
