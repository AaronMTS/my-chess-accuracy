export function generateSafeIntegerID() {
  const timestamp = Date.now();
  const randomChunk = Math.floor(Math.random() * 1000);
  return parseInt(`${timestamp}${randomChunk}`);
}
