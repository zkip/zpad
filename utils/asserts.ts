import { ObjKey } from "./mapped";

export function notNum<T>(v: T | number): v is T { return typeof v !== "number"; }
export function isNum<T>(v: T | number): v is number { return typeof v === "number" }
export function notNil<T>(v: T | undefined): v is T { return typeof v !== "undefined"; }
export function isNil<T>(v: T | undefined): v is undefined { return typeof v === "undefined"; }
export function notStr<T>(v: T | string): v is T { return typeof v !== "string"; }
export function isStr<T>(v: T | string): v is string { return typeof v === "string"; }
export function notNilStr<T>(v: T | string | ""): v is string { return v !== ""; }
export function isNilStr<T>(v: T | string | ""): v is "" { return v === ""; }

/**
 * Is:	Object, ...
 * Not: Array, Function, ...
 */
export function notRecord<T, XK extends ObjKey, XV>(v: T | Record<XK, XV>): v is T { return typeof v !== "object" || (v instanceof Array); }
export function isRecord<T, XK extends ObjKey, XV>(v: T | Record<XK, XV>): v is Record<XK, XV> { return typeof v === "object" && !(v instanceof Array); }
export function inRecord<T, K extends keyof T>(t: T, k: T | K | ObjKey): k is K { return (k as K) in (t as { [k in K]: T[K] }) }
export function inRecordBy<T>(t: T) { return <K extends keyof T>(k: T | K | ObjKey): k is K => (k as K) in (t as { [k in K]: T[K] }) }

export function _test() {
	const v = '' as string | undefined | number | boolean | "";
	if (isNilStr(v)) {
		console.log(v);	// ""
	} else {
		console.log(v);	// string | undefined | number | boolean
	}

	const v1 = '' as string | undefined | number | boolean | "";
	if (isStr(v1)) {
		console.log(v1);	// string
	} else {
		console.log(v1);	// undefined | number | boolean
	}

	const rs = [{}, [], () => { }, 1, false, /d/, Symbol, '', String, Array, new String(), new Array(), new RegExp('')];
	if (rs.filter(notRecord)) {
		console.log(rs);
	} else {
		console.log(rs);
	}
}