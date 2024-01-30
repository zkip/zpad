type Listener = EventListenerOrEventListenerObject;

interface EventReceipt {
	clean(target: Window): void;
	clean(target: HTMLElement): void;
	attach(target: HTMLElement, options?: boolean | AddEventListenerOptions): EventReceipt;
	attach(target?: Window, options?: boolean | AddEventListenerOptions): EventReceipt;
}

export function listen<K extends keyof HTMLElementEventMap>(type: K, istener: Listener): EventReceipt;
export function listen<K extends keyof WindowEventMap>(type: K, listener: Listener): EventReceipt;
export function listen<K extends keyof HTMLElementEventMap | keyof WindowEventMap>(type: K, listener: Listener) {
	let targets = new Array<Window | HTMLElement>();
	function clean(target: Window | HTMLElement) {
		const targetSet = new Set(targets);
		if (!targetSet.has(target)) return;

		targetSet.delete(target);
		targets = Array.from(targetSet.values());
	}
	function attach(target: HTMLElement | Window = window, options?: boolean | AddEventListenerOptions) {
		targets.push(target);
		target.addEventListener(type, listener, options);
		return { attach, clean };
	}
	return { attach, clean }
}