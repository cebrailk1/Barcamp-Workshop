/**
 * DEMO 5 - BONUS: THE NATIVE JavaScript `Proxy`
 *
 * The GoF pattern is a DESIGN idea - but JavaScript ships a built-in
 * `Proxy` object that implements the idea for EVERY object at once.
 * One handler, all methods covered. No per-method wrapper code.
 *
 * Run: npm run demo5
 */

interface WeatherService {
  getTemperature(city: string): number;
  getForecast(city: string): string[];
}

class OpenWeatherService implements WeatherService {
  getTemperature(city: string): number {
    return city === "Hamburg" ? 18 : 25;
  }

  getForecast(city: string): string[] {
    return [`${city}: sunny`, `${city}: cloudy`, `${city}: rainy`];
  }
}

/** Wraps ANY object: logs + times every method call automatically. */
function withLogging<T extends object>(target: T, label = "API"): T {
  return new Proxy(target, {
    get(obj, prop) {
      const original = obj[prop as keyof T];
      if (typeof original !== "function") {
        return original; // only intercept methods
      }
      // return a NEW function that wraps the original call
      return (...args: unknown[]) => {
        const start = performance.now();
        const result = (original as (...a: unknown[]) => unknown).apply(obj, args);
        const ms = (performance.now() - start).toFixed(1);
        console.log(`   [${label}] ${String(prop)}(${args.map(String).join(", ")}) -> ${JSON.stringify(result)} (${ms} ms)`);
        return result;
      };
    },
  });
}

// --- Client code ----------------------------------------------------------

const realApi = new OpenWeatherService();
const api = withLogging(realApi, "WEATHER");

console.log("Same service, zero changes, full logging:\n");
api.getTemperature("Hamburg");
api.getForecast("Berlin");

// Works for ANY object - here: a plain calculator
const calc = withLogging({ add: (a: number, b: number) => a + b }, "CALC");
calc.add(2, 3);

console.log("\nThis exact trick powers Vue 3 reactivity, MobX and many mock libraries.");

// makes this file a standalone module (isolated scope)
export {};
