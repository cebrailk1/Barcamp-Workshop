/**
 * MODEL ANSWER - ProtectedDocumentProxy (with access log bonus)
 *
 * Run: node exercise/solution/solution2.ts
 */

// ---------- given code: do NOT change ------------------------------------

interface DocumentService {
  readDocument(name: string): string;
  deleteDocument(name: string): string;
}

class RealDocumentService implements DocumentService {
  private documents: Record<string, string> = {
    "contract.pdf": "Content: contract details ...",
    "secret.pdf": "Content: strictly confidential ...",
  };

  readDocument(name: string): string {
    return this.documents[name] ?? "document not found";
  }

  deleteDocument(name: string): string {
    delete this.documents[name];
    return `"${name}" was deleted.`;
  }
}

// ---------- model answer --------------------------------------------------

class ProtectedDocumentProxy implements DocumentService {
  private accessLog: string[] = [];
  private real: DocumentService;
  private role: "admin" | "guest";

  constructor(real: DocumentService, role: "admin" | "guest") {
    this.real = real;
    this.role = role;
  }

  readDocument(name: string): string {
    // reading is always allowed -> pass straight through
    this.log("read", name, true);
    return this.real.readDocument(name);
  }

  deleteDocument(name: string): string {
    if (this.role !== "admin") {
      this.log("delete", name, false);
      return `Access denied: role "${this.role}" may not delete "${name}".`;
    }

    this.log("delete", name, true);
    return this.real.deleteDocument(name);
  }

  getAccessLog(): string[] {
    return [...this.accessLog];
  }

  private log(action: string, name: string, allowed: boolean): void {
    const entry = `[${allowed ? "ALLOWED" : "DENIED "}] role "${this.role}" -> ${action}("${name}")`;
    console.log(`   [ACCESS] ${entry}`);
    this.accessLog.push(entry);
  }
}

// ---------- client code: do NOT change ------------------------------------

const store = new RealDocumentService();
const asGuest: DocumentService = new ProtectedDocumentProxy(store, "guest");
const asAdmin: DocumentService = new ProtectedDocumentProxy(store, "admin");

console.log("Guest tries to read and to delete:");
console.log(`   read  -> ${asGuest.readDocument("contract.pdf")}`);
console.log(`   delete-> ${asGuest.deleteDocument("contract.pdf")}`);

console.log("\nAdmin tries to read and to delete:");
console.log(`   read  -> ${asAdmin.readDocument("secret.pdf")}`);
console.log(`   delete-> ${asAdmin.deleteDocument("secret.pdf")}`);

// Every check tells you exactly what is still missing.
const guestDelete = asGuest.deleteDocument("contract.pdf");
const checks: Array<[boolean, string]> = [
  [asGuest.readDocument("contract.pdf").includes("contract details"),
    "a guest must still be able to READ contract.pdf"],
  [guestDelete.toLowerCase().includes("denied"),
    'a denied delete must return a message containing "denied"'],
  [store.readDocument("contract.pdf").includes("contract details"),
    "contract.pdf must STILL EXIST - the guest's delete must never reach the real store"],
  [!store.readDocument("secret.pdf").includes("confidential"),
    "the admin's delete must actually go through to the real store"],
];

const failed = checks.filter(([ok]) => !ok);

if (failed.length === 0) {
  console.log("\nSUCCESS - access control works!");
} else {
  console.log("\nNot yet:");
  for (const [, why] of failed) console.log(`  - ${why}`);
}

// makes this file a standalone module (isolated scope)
export {};
