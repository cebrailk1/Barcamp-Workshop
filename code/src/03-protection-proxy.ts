/**
 * DEMO 3 - PROTECTION PROXY (access control)
 *
 * The proxy wraps the real document store and checks WHO is calling
 * before the request goes through. The real store stays dumb and safe -
 * it can trust that every call was already authorized.
 *
 * Run: npm run demo3
 */

type Role = "guest" | "editor" | "admin";

interface User {
  name: string;
  role: Role;
}

interface DocumentStore {
  read(docId: string, user: User): string;
  delete(docId: string, user: User): void;
}

class RealDocumentStore implements DocumentStore {
  private docs = new Map<string, string>([
    ["handbook", "Public employee handbook ..."],
    ["salaries", "CONFIDENTIAL salary list ..."],
  ]);

  read(docId: string, _user: User): string {
    return this.docs.get(docId) ?? "(not found)";
  }

  delete(docId: string, user: User): void {
    this.docs.delete(docId);
    console.log(`   [STORE ] "${docId}" deleted by ${user.name}`);
  }
}

class ProtectionProxy implements DocumentStore {
  constructor(private real: RealDocumentStore) {}

  read(docId: string, user: User): string {
    if (user.role === "guest" && docId === "salaries") {
      console.log(`   [PROXY ] 403 - ${user.name} may not read "${docId}"`);
      return "403 Forbidden";
    }
    return this.real.read(docId, user);
  }

  delete(docId: string, user: User): void {
    if (user.role !== "admin") {
      console.log(`   [PROXY ] 403 - only admins may delete (${user.name} is ${user.role})`);
      return;
    }
    this.real.delete(docId, user);
  }
}

// --- Client code ----------------------------------------------------------

const proxy = new ProtectionProxy(new RealDocumentStore());

const guests: User[] = [
  { name: "Alice", role: "guest" },
  { name: "Bob", role: "editor" },
  { name: "Root", role: "admin" },
];

for (const user of guests) {
  console.log(`\n${user.name} (${user.role}) tries to read "salaries":`);
  console.log(`   -> ${proxy.read("salaries", user)}`);
}

console.log('\nBob (editor) tries to delete "handbook":');
proxy.delete("handbook", guests[1]!);

console.log('Root (admin) deletes "handbook":');
proxy.delete("handbook", guests[2]!);

console.log("\nThe real store never saw a single unauthorized call.");

// makes this file a standalone module (isolated scope)
export {};
