/**
 * HANDS-ON EXERCISE 2 - PROTECTION PROXY (fast-finisher track)
 *
 * Only do this one if you already finished exercise 1.
 *
 * Scenario: a document system lets people read and delete documents.
 * BUT: only users with the role "admin" are allowed to delete.
 *
 * Your mission: implement `ProtectedDocumentProxy` so that:
 *   1. readDocument() ALWAYS works, for every role
 *   2. deleteDocument() only runs when role === "admin"
 *   3. without permission nothing is deleted - the proxy returns a
 *      readable message instead (no crash, no exception)
 *   4. the client code below stays UNTOUCHED
 *
 * Bonus (if you are fast):
 *   5. log every attempt (allowed/denied) with role + action
 *   6. add a getAccessLog() method returning all attempts as a list
 *
 * Run it:  node exercise/starter/exercise2.ts
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

// ---------- YOUR WORK -----------------------------------------------------

class ProtectedDocumentProxy implements DocumentService {
  // TODO 1: (bonus) add an array for the access log

  private real: DocumentService;
  private role: "admin" | "guest";

  constructor(real: DocumentService, role: "admin" | "guest") {
    this.real = real;
    this.role = role;
  }

  readDocument(name: string): string {
    // TODO 2: just pass it through - reading is always allowed
    return "";
  }

  deleteDocument(name: string): string {
    // TODO 3: only run this when this.role === "admin"
    // TODO 4: otherwise return a readable "denied" message
    //         (it must contain the word "denied")
    return "";
  }

  // TODO 6 (bonus): getAccessLog()
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
