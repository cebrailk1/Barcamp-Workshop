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

// ---------- YOUR WORK -----------------------------------------------------

class CachingQuoteProxy implements QuoteService {
  // TODO 1: add a private cache (a Map<string, string> fits nicely)

  constructor(private real: QuoteService) {}

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

const service: QuoteService = new CachingQuoteProxy(new SlowRemoteQuoteService());

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

const works =
  first.length > 0 &&      // real quote, not an empty string
  third === first &&       // identical answer for the same topic
  Date.now() - start < 50; // and FAST (no second network call)

console.log(
  works
    ? "SUCCESS - cache works!"
    : "Not yet - work through the TODOs in CachingQuoteProxy!"
);

// makes this file a standalone module (isolated scope)
export {};
