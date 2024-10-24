export function jsTimestamp2UnixTimestamp(jsTimestamp: number) {
  return Math.floor(jsTimestamp / 1000);
}
