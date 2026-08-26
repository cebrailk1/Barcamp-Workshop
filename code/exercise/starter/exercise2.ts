/**
 * HANDS-ON EXERCISE - Protection Proxy
 *
 * Szenario: Ein Dokumenten-System erlaubt das Lesen und Löschen
 * von Dokumenten. ABER: Löschen dürfen nur Nutzer mit der Rolle "admin".
 *
 * Deine Mission: Implementiere `ProtectedDocumentProxy` so, dass:
 *   1. `readDocument()` IMMER funktioniert (für jede Rolle)
 *   2. `deleteDocument()` nur ausgeführt wird, wenn role === "admin"
 *   3. bei fehlender Berechtigung wird NICHT gelöscht, sondern
 *      eine verständliche Meldung zurückgegeben (kein Crash!)
 *   4. der Client-Code unten bleibt UNVERÄNDERT
 *
 * Bonus (wenn du schnell bist):
 *   5. logge jeden Zugriffsversuch (erlaubt/verweigert) mit Rolle + Aktion
 *   6. füge eine Methode `getAccessLog()` hinzu, die alle Versuche
 *      als Liste zurückgibt
 */

// ---------- given code: do NOT change ------------------------------------

interface DocumentService {
  readDocument(name: string): string;
  deleteDocument(name: string): string;
}

class RealDocumentService implements DocumentService {
  private documents: Record<string, string> = {
    "vertrag.pdf": "Inhalt: Vertragsdetails...",
    "geheim.pdf": "Inhalt: Streng vertraulich...",
  };

  readDocument(name: string): string {
    return this.documents[name] ?? "Dokument nicht gefunden";
  }

  deleteDocument(name: string): string {
    delete this.documents[name];
    return `"${name}" wurde gelöscht.`;
  }
}

// ---------- YOUR WORK -----------------------------------------------------

class ProtectedDocumentProxy implements DocumentService {
  // TODO 1: evtl. ein Array/Liste für den Access-Log anlegen

  constructor(
    private real: DocumentService,
    private role: "admin" | "guest"
  ) {}

  readDocument(name: string): string {
    // TODO 2: einfach durchreichen (Lesen ist immer erlaubt)
    return "";
  }

  deleteDocument(name: string): string {
    // TODO 3: nur ausführen, wenn this.role === "admin"
    // TODO 4: sonst verständliche Fehlermeldung zurückgeben
    return "";
  }

  // TODO 6 (bonus): getAccessLog()
}

// ---------- client code: do NOT change ------------------------------------

const guestService: DocumentService = new ProtectedDocumentProxy(
  new RealDocumentService(),
  "guest"
);
const adminService: DocumentService = new ProtectedDocumentProxy(
  new RealDocumentService(),
  "admin"
);

console.log("Guest versucht zu lesen und zu löschen:");
console.log(guestService.readDocument("vertrag.pdf"));
console.log(guestService.deleteDocument("vertrag.pdf"));

console.log("\nAdmin versucht zu lesen und zu löschen:");
console.log(adminService.readDocument("geheim.pdf"));
console.log(adminService.deleteDocument("geheim.pdf"));

const works =
  guestService.readDocument("vertrag.pdf").includes("Vertragsdetails") &&
  guestService.deleteDocument("vertrag.pdf").toLowerCase().includes("nicht") &&
  adminService.deleteDocument("geheim.pdf").includes("gelöscht");

console.log(
  works
    ? "\nSUCCESS - Zugriffskontrolle funktioniert!"
    : "\nNoch nicht - arbeite die TODOs durch!"
);

export {};