export function isBrowser(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Check in time of execution
  return globalThis.window !== undefined && globalThis.document !== undefined;
}

export function isNode(): boolean {
  return typeof process !== "undefined" && Boolean(process.versions.node);
}
