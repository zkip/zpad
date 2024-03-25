export function tryToGet(obj: unknown, key: string) {
	return (obj as { [key: string]: unknown })[key];
}
