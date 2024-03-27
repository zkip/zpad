import { isNil } from "./asserts";

export function tryToNum<T>(literal: T) {
	const result = Number(literal);
	if (isNaN(result)) return undefined;
	return result;
}

export function tryJSONParse(literal?: string) {
	if (isNil(literal)) return undefined;
	try {
		return JSON.parse(literal);
	} catch (error) {
		return undefined
	}
}
