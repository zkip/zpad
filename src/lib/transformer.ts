export function tryToNum<T>(literal: T) {
	const result = Number(literal);
	if (isNaN(result)) return undefined;
	return result;
}
