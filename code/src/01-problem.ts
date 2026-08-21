/**
 * DEMO 1 - THE PROBLEM
 *
 * A gallery app talks directly to an expensive remote image service.
 * Every single view triggers a fresh network download - even for the
 * same picture, and even before anyone actually looks at it.
 *
 * Run: npm run demo1
 */

/** Simulates blocking network latency (like a real remote call would). */
function simulateNetworkDelay(ms: number): void {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // busy-wait on purpose: this cost should hurt :)
  }
}

/** The REAL service - expensive, slow, far away. */
class RemoteImageService {
  fetch(filename: string): string {
    console.log(`   [NETWORK] downloading "${filename}" ...`);
    simulateNetworkDelay(400);
    return `[image data of ${filename}]`;
  }
}

// --- Client code: talks DIRECTLY to the real service --------------------

const service = new RemoteImageService();

console.log("Opening the gallery page ...");
const start = Date.now();

// Page shows three thumbnails - one of them twice.
service.fetch("cat.png");
service.fetch("dog.png");
service.fetch("cat.png"); // same file, downloaded AGAIN!
service.fetch("parrot.png");

console.log(`Page ready after ${Date.now() - start} ms`);
console.log("\nProblems:");
console.log("  1. cat.png was downloaded twice        -> wasted bandwidth");
console.log("  2. everything loads eagerly            -> slow first paint");
console.log("  3. ANYONE can call fetch()             -> no access control");
console.log("  4. client is welded to the real class  -> hard to extend");
console.log("\nQuestion: can we fix this WITHOUT touching RemoteImageService?");

// makes this file a standalone module (isolated scope)
export {};
