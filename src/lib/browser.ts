export function onlyBrowser<A extends any[], R>(fn: (...args: A) => R, ...args: A) {
	if (typeof window === 'undefined') {
		return
	}
	return fn(...args)
}