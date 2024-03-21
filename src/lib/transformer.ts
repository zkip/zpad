import { notZeroFalsy } from "./asserts";

export function tryToNum<T>(literal: T) {
	const result = Number(literal)
	if (notZeroFalsy(result)) {
		return result
	}
	return undefined
}