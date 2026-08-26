/**
 * DEMO 4 - LOGGING / TIMING PROXY (cross-cutting concerns)
 *
 * We want logging + timing for a service - but we do NOT want to
 * pollute the service itself with console.log calls.
 *
 * The proxy adds the "boring" stuff around every call and delegates
 * the real work. This is how middleware, metrics and tracing work.
 *
 * Run: npm run demo4
 */

interface WeatherService {
  getTemperature(city: string): number;
  getForecast(city: string): string[];
}

class OpenWeatherService implements WeatherService {
  getTemperature(city: string): number {
    // imagine an HTTP request here
    return city === "Hamburg" ? 18 : 25;
  }

  getForecast(city: string): string[] {
    return [`${city}: sunny`, `${city}: cloudy`, `${city}: rainy`];
  }
}

class LoggingProxy implements WeatherService {
  private callCount = 0;

  private real: WeatherService;

  constructor(real: WeatherService) {
    this.real = real;
  }

  getTemperature(city: string): number {
    this.callCount++;
    const start = performance.now();
    const result = this.real.getTemperature(city);
    const ms = (performance.now() - start).toFixed(1);
    console.log(`   [LOG #${this.callCount}] getTemperature("${city}") -> ${result}°C (${ms} ms)`);
    return result;
  }

  getForecast(city: string): string[] {
    this.callCount++;
    const start = performance.now();
    const result = this.real.getForecast(city);
    const ms = (performance.now() - start).toFixed(1);
    console.log(`   [LOG #${this.callCount}] getForecast("${city}") -> ${result.length} days (${ms} ms)`);
    return result;
  }
}

// --- Client code ----------------------------------------------------------

const api = new LoggingProxy(new OpenWeatherService());

console.log("App calls the weather API through the logging proxy:\n");
api.getTemperature("Hamburg");
api.getTemperature("Berlin");
api.getForecast("Hamburg");

console.log("\nThe real service has ZERO logging code.");
console.log("But wait ... we wrote a wrapper method for EVERY method. Boring!");
console.log("Good news: JavaScript has something built in for this -> demo 5");

// makes this file a standalone module (isolated scope)
export {};
