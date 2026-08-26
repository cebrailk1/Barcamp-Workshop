/**
 * DEMO 2 - VIRTUAL PROXY (lazy loading + caching)
 *
 * Same interface as the real service, but smart:
 *  - creates the expensive real service only when it is first needed
 *  - caches results, so repeated requests are (almost) free
 *
 * The client cannot tell the difference - it only knows the interface.
 *
 * Run: npm run demo2
 */

function simulateNetworkDelay(ms: number): void {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    /* blocking on purpose */
  }
}

/** The interface BOTH classes share - this is the whole trick. */
interface ImageService {
  fetch(filename: string): string;
}

class RemoteImageService implements ImageService {
  fetch(filename: string): string {
    console.log(`   [NETWORK] downloading "${filename}" ...`);
    simulateNetworkDelay(400);
    return `[image data of ${filename}]`;
  }
}

class CachingImageProxy implements ImageService {
  private cache = new Map<string, string>();
  private real: ImageService | null = null; // lazy!

  fetch(filename: string): string {
    // 1. cache hit? -> no network at all
    const cached = this.cache.get(filename);
    if (cached !== undefined) {   // NOT `if (cached)` - a cached "" would miss!
      console.log(`   [PROXY ] cache hit for "${filename}"`);
      return cached;
    }
    // 2. first real call -> create the expensive service NOW
    if (!this.real) {
      console.log("   [PROXY ] creating real service (first use)");
      this.real = new RemoteImageService();
    }
    // 3. delegate, then remember
    const data = this.real.fetch(filename);
    this.cache.set(filename, data);
    return data;
  }
}

// --- Client code: depends ONLY on the interface --------------------------

function openGallery(service: ImageService): void {
  const start = Date.now();
  // A real gallery page shows the same thumbnails over and over:
  // 6 requests, but only 3 different pictures.
  service.fetch("cat.png");
  service.fetch("dog.png");
  service.fetch("cat.png"); // again
  service.fetch("parrot.png");
  service.fetch("dog.png"); // again
  service.fetch("cat.png"); // and again
  console.log(`Page ready after ${Date.now() - start} ms\n`);
}

console.log("--- WITHOUT proxy (demo 1 behaviour) ---");
openGallery(new RemoteImageService());

console.log("--- WITH caching proxy ---");
const proxied = new CachingImageProxy();
openGallery(proxied);

console.log("Same client code. Different object behind the interface.");
console.log(`Real service created lazily? ${proxied["real"] !== null ? "yes, on first use" : "no"}`);

// makes this file a standalone module (isolated scope)
export {};
