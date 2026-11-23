import tls from "node:tls";

const HOST = "imap.titan.email";
const USER = "info@caravanrent-alicante.com";
const FOLDER = "PriceLooks";

export type Look = {
  vehicle?: string;
  from?: string;
  to?: string;
  total?: number;
  session?: string;
  at?: string;
};

function quote(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

class Box {
  private buffer = "";
  private tag = 0;
  private waiter: ((error: Error | null, text: string) => void) | null = null;
  private expect = "";
  private folder = FOLDER;

  constructor(private socket: tls.TLSSocket) {
    socket.on("data", (chunk) => {
      this.buffer += chunk.toString("utf8");
      this.settle();
    });
  }

  private settle() {
    if (!this.waiter) return;
    const done = this.buffer.includes(`\r\n${this.expect} `) || this.buffer.startsWith(`${this.expect} `);
    const plus = this.buffer.includes("\r\n+") || this.buffer.startsWith("+");
    if (!done && !plus) return;
    const text = this.buffer;
    this.buffer = "";
    const finish = this.waiter;
    this.waiter = null;
    if (text.includes(`${this.expect} OK`)) finish(null, text);
    else if (text.includes(`${this.expect} NO`) || text.includes(`${this.expect} BAD`)) finish(new Error(text.slice(-240)), text);
    else finish(null, text);
  }

  private wait() {
    return new Promise<string>((resolve, reject) => {
      this.waiter = (error, text) => (error ? reject(error) : resolve(text));
      this.settle();
    });
  }

  private send(line: string) {
    this.expect = `A${++this.tag}`;
    const pending = this.wait();
    const timer = setTimeout(() => {
      if (!this.waiter) return;
      const finish = this.waiter;
      this.waiter = null;
      finish(new Error(`imap timeout ${line.split(" ")[0]}`), "");
    }, 10000);
    this.socket.write(`${this.expect} ${line}\r\n`);
    return pending.finally(() => clearTimeout(timer));
  }

  async login(pass: string) {
    await this.send(`LOGIN ${quote(USER)} ${quote(pass)}`);
    try {
      await this.send(`CREATE ${FOLDER}`).catch(() => undefined);
      await this.send(`SELECT ${FOLDER}`);
    } catch {
      this.folder = "INBOX.PriceLooks";
      await this.send(`CREATE ${this.folder}`).catch(() => undefined);
      await this.send(`SELECT ${this.folder}`);
    }
  }

  async save(subject: string, row: Look) {
    const message = [
      `From: ${USER}`,
      `To: ${USER}`,
      `Subject: ${subject}`,
      `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "",
      JSON.stringify(row),
      "",
    ].join("\r\n");
    const tag = `A${++this.tag}`;
    this.expect = tag;
    const ready = this.wait();
    this.socket.write(`${tag} APPEND ${this.folder} (\\Seen) {${Buffer.byteLength(message)}}\r\n`);
    const started = await ready;
    if (started.includes(`${tag} OK`)) return;
    this.expect = tag;
    const done = this.wait();
    this.socket.write(message);
    await done;
  }

  async recent() {
    const since = new Date(Date.now() - 3 * 86400000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = `${String(since.getUTCDate()).padStart(2, "0")}-${months[since.getUTCMonth()]}-${since.getUTCFullYear()}`;
    const found = await this.send(`UID SEARCH SINCE ${day}`);
    const ids = (found.match(/\* SEARCH([^\r\n]*)/)?.[1] || "").trim().split(/\s+/).filter(Boolean);
    if (!ids.length) return [] as Look[];
    const fetched = await this.send(`UID FETCH ${ids.join(",")} (BODY.PEEK[TEXT])`);
    const rows: Look[] = [];
    for (const line of fetched.split(/\r?\n/)) {
      const start = line.indexOf("{");
      if (start < 0) continue;
      try {
        rows.push(JSON.parse(line.slice(start)) as Look);
      } catch {
        // Not one of our records.
      }
    }
    return rows;
  }

  close() {
    this.socket.end();
  }
}

function connect() {
  const socket = tls.connect({ host: HOST, port: 993, servername: HOST });
  socket.setTimeout(12000);
  socket.on("timeout", () => socket.destroy(new Error("imap timeout")));
  return socket;
}

async function open() {
  const pass = process.env.SMTP_PASS;
  if (!pass) throw new Error("smtp");
  const socket = connect();
  const box = new Box(socket);
  try {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("imap greeting")), 12000);
      const ready = () => {
        if (!box["buffer"].includes("\n")) return;
        clearTimeout(timer);
        socket.off("data", ready);
        resolve();
      };
      socket.on("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
      socket.on("data", ready);
      ready();
    });
    await box.login(pass);
  } catch (error) {
    box.close();
    throw error;
  }
  return box;
}

export async function saveLook(row: Look) {
  const box = await open();
  try {
    const subject = row.session?.startsWith("digest-") ? `digest ${row.from}` : "look";
    await box.save(subject, row);
  } finally {
    box.close();
  }
}

export async function readLooks() {
  const box = await open();
  try {
    return await box.recent();
  } finally {
    box.close();
  }
}
