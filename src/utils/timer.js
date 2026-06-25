export const DURATION_MS = 45 * 60 * 1000;

export function getRemainingMs(startTime) {
  return Math.max(0, DURATION_MS + startTime - Date.now());
}

export function formatTime(ms) {
  const s = Math.ceil(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// Generate `count` random millisecond offsets spread across the test duration
export function generateScreenshotTimes(count = 5) {
  const minMs = 90_000;                    // not before 1.5 min
  const maxMs = DURATION_MS - 90_000;     // not in last 1.5 min
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (maxMs - minMs) + minMs)
  ).sort((a, b) => a - b);
}
