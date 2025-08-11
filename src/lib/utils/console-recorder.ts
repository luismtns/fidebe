// console-recorder.ts
export type LogLevel = "log" | "info" | "warn" | "error" | "debug";
export type LogEntry = { t: number; lvl: LogLevel; msg: unknown[]; stack?: string };

function safeSerialize(v: unknown, seen = new WeakSet()): any {
  if (v === null || typeof v !== "object") {
    if (typeof v === "function") return `[Function ${v.name || "anonymous"}]`;
    if (v instanceof Error) return { name: v.name, message: v.message, stack: v.stack };
    return v;
  }
  if (seen.has(v as object)) return "[Circular]";
  seen.add(v as object);

  if (Array.isArray(v)) return v.map(x => safeSerialize(x, seen));

  const out: Record<string, any> = {};
  for (const k of Object.keys(v as object)) {
    try { out[k] = safeSerialize((v as any)[k], seen); } catch { out[k] = "[Unserializable]"; }
  }
  return out;
}

export function createConsoleRecorder(maxEntries = 300) {
  const buffer: LogEntry[] = [];
  const orig = { log: console.log, info: console.info, warn: console.warn, error: console.error, debug: console.debug };

  function push(e: LogEntry) {
    buffer.push(e);
    if (buffer.length > maxEntries) buffer.shift();
  }

  function wrap(level: LogLevel) {
    return (...args: unknown[]) => {
      try {
        const serialized = args.map(a => safeSerialize(a));
        let stack: string | undefined;
        try { stack = new Error().stack; } catch {}
        push({ t: Date.now(), lvl: level, msg: serialized, stack });
      } catch {}
      (orig[level] as any).apply(console, args);
    };
  }

  console.log = wrap("log");
  console.info = wrap("info");
  console.warn = wrap("warn");
  console.error = wrap("error");
  console.debug = wrap("debug");

  const onError = (ev: ErrorEvent) =>
    push({ t: Date.now(), lvl: "error", msg: [safeSerialize(ev.error || ev.message)], stack: ev.error?.stack || `${ev.filename}:${ev.lineno}:${ev.colno}` });
  const onRej = (ev: PromiseRejectionEvent) =>
    push({ t: Date.now(), lvl: "error", msg: ["[unhandledrejection]", safeSerialize(ev.reason)], stack: ev.reason?.stack });

  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRej);

  return {
    getSnapshot() {
      return { logs: buffer.slice() };
    },
    restore() {
      console.log = orig.log; console.info = orig.info; console.warn = orig.warn; console.error = orig.error; console.debug = orig.debug;
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRej);
    }
  };
}
