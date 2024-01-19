export function not<Args extends any[], R>(fn: (...args: Args) => R) { return (...args: Args) => !fn(...args); }
