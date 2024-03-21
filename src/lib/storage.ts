export function storageItemGet(key: string) {
	return localStorage.getItem(key) ?? undefined;
}
export function storageItemSet(key: string, value: string) {
	return localStorage.setItem(key, value);
}
export function storageItemRemove(key: string) {
	return localStorage.removeItem(key);
}

export function storageItemClear(key: string, value: string) {
	return localStorage.setItem(key, value);
}
