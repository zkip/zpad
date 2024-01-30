import { isRecord, notNilStr } from "./asserts";
import { firstMust } from "./list";
import { IsAny } from "./types";

/** Record object */
// export function get<T extends AnyRecord, K extends keyof T = PureLiteralRecord<T> extends never ? string : keyof T>(obj: T, key: NestedKeyPath<T>): T[K];
// /** T object */
// export function get<T, K extends keyof T>(object: T, path: K): K extends keyof T ? T[K] : ;
/** any object */
export function get(object: any, path: string): any;
export function get(object: any, path: string) {
	const segs = path.split(".").filter(notNilStr);
	if (segs.length > 1 && isRecord(object)) {
		const rGet = <T>(obj: T, path: string): any => {
			const [firstSeg, ...rPath] = path.split(".")
			const key = firstSeg as keyof T
			if (isRecord(obj[key]) && rPath.length > 0) return rGet(obj[key], path.slice(firstSeg.length + 1))
			return obj[key]
		}
		return rGet(object, path)
	}
	return object[firstMust(segs)]
}

export type Valueof<T> = T[keyof T];
export type ObjKey = keyof any;
export type AnyRecord = Record<any, any>;

export type KeyType = { [k: string]: string } & { [k: symbol]: symbol } & { [k: number]: number };
export type ShallowPrimitive<T extends ObjKey> = T extends KeyType[T] ? KeyType[T] extends T ? T : never : never;
export type PureLiteral<T extends ObjKey> = ShallowPrimitive<T> extends never ? T : never;
export type PureLiteralRecord<T extends Record<any, any>> = true extends IsAny<keyof T> ? never : PureLiteral<keyof T>;

// reference from https://dev.to/scooperdev/supporting-circularly-referenced-mapped-types-in-typescript-4825
// type SerKey<TObj> = keyof TObj & (string | number);


// type MaxRecursiveDepth = 18;

// type NestedKeyPath<T = any, TDepth extends never[] = []> = {
// 	[K in SerKey<T>]:
// 	| (T[K] extends any ? `${K}` : never)
// 	| (T[K] extends object ?
// 		`${K}.${TDepth['length'] extends MaxRecursiveDepth ? any : NestedKeyPath<T[K], [...TDepth, never]>}`
// 		: never)
// }[SerKey<T>];

// type NestedValue<T extends Record<string, any>, K extends string> =
// 	K extends keyof T
// 	? T[K]
// 	: {
// 		[NK in Split<K>[0]]: NestedValue<T[NK], Split<K>[1] extends NestedKeyPath<T[Split<K>[1]]> ? Split<K>[1] : never>
// 	}[Split<K>[0]]

// type Split<T extends string> = T extends `${infer S}.${infer R}` ? [S, R] : never;

// type R = Split<`1.23.4`>
// type R1 = Split<`123.`>
// type R2 = Split<`.4`>

// type A = {
// 	a: { b: { c: { name: 'seed', d: { e: { f: { h: { i: { core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal' } } } } } } } } } } } } } } } } } } }, x: 20 } }
// 	// a2: { b: { c: { name: 'seed', d: { e: { f: { h: { i: { core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal', core: { mutable: 'crystal' } } } } } } } } } } } } } } } } } } }, x: 20 } }
// };
// type B = { a: { b: { c: { name: 'seed' } } } }
// // type B = NestedPathValue<A, 'a.b'>;

// type C = Split<'a.b'>;
// type D1 = NestedKeyPath<A>

// type D2 = NestedKeyPath<B>
// type E2 = NestedValue<B, 'a.c'>

// function vget<K extends NestedKeyPath<B>, V extends NestedValue<B, K>>(v: K): V {
// 	return {} as V;
// }

// const d = vget('a.b.c.name')

// export function _test() {
// 	const target1 = new Object({ a: { b: { c: 'x' } } });
// 	const target2 = { a: { b: { c: 'x' } }, feat: 12 };
// 	const target3 = { a: { b: { c: 'x' } } } as Record<any, any>;
// 	const v1 = get(target1, '');
// 	const v2 = get(target2, 'a');
// 	const v3 = get(target3, 'sd');

// 	// /** isMappedType<T> testing start */

// 	// const sym = Symbol();
// 	// type Record1 = Record<any, any>;
// 	// type Record2 = Record<ObjKey, any>;
// 	// type Mapped1 = { 1: 'f', 'ff': 1, [sym]: 3 }
// 	// type Mapped2 = {
// 	// 	[12]: 'f', 'ff': 1, [sym]: 3
// 	// } & { [k in string]: 3; }

// 	// type E1 = keyof Record1;
// 	// type E2 = keyof Record2;
// 	// type E3 = keyof Mapped1;
// 	// type E4 = keyof Mapped2;

// 	// type AnyR1 = true extends IsAny<E1> ? 1 : 0;	// 1, miss
// 	// type AnyR2 = true extends IsAny<E2> ? 1 : 0;	// 0
// 	// type AnyR3 = true extends IsAny<E3> ? 1 : 0;	// 0
// 	// type AnyR4 = true extends IsAny<E4> ? 1 : 0;	// 0

// 	// type X1 = ShallowPrimitive<keyof Record1>	// skip
// 	// type X2 = ShallowPrimitive<keyof Record2>	// union primitive
// 	// type X3 = ShallowPrimitive<keyof Mapped1>	// literal
// 	// type X4 = ShallowPrimitive<keyof Mapped2>	// addtion primitive

// 	// type L1 = PureLiteral<E1>	// skip
// 	// type L2 = PureLiteral<E2>	// union primitive
// 	// type L3 = PureLiteral<E3>	// literal
// 	// type L4 = PureLiteral<E4>	// addtion primitive

// 	// type HLR1 = PureLiteralRecord<Record1>;		// never, pre 'any'
// 	// type HLR2 = PureLiteralRecord<Record2>;		// never, miss
// 	// type HLR3 = PureLiteralRecord<Mapped1>;		// T, hited
// 	// type HLR4 = PureLiteralRecord<Mapped2>;		// never, miss


// 	// function givenToDiff<T extends Record<any, any>>(record: T, key: PureLiteralRecord<T> extends never ? string : keyof T) {

// 	// }

// 	// const rSym = Symbol();
// 	// const rs = { name: 'fe', 12: 4, [rSym]: '3' }
// 	// const r1 = {} as Record1;
// 	// const r2 = {} as Record2;
// 	// const r3 = {} as Mapped1;
// 	// const r4 = {} as Mapped2;

// 	// givenToDiff(r1, 'skdjflksdj')
// 	// givenToDiff(r2, 'sdf')
// 	// givenToDiff(rs, 'name')
// 	// givenToDiff(rs, rSym)
// 	// givenToDiff(rs, Symbol())		// error: symbol is not assign to `unique symbol | "name" | 12`
// 	// givenToDiff(rs, '12')			// error: '12' is not assign to `unique symbol | "name" | 12`
// 	// givenToDiff(rs, 12)
// 	// givenToDiff(rs, '12')			// error: '12' is not assign to `unique symbol | "name" | 12`
// 	// givenToDiff(rs, 14)				// error: '14' is not assign to `unique symbol | "name" | 12`
// 	// givenToDiff(rs, 'namef')		// error: "namef" not assign to `unique symbol | "name" | 12`
// 	// givenToDiff(r3, 'ff')
// 	// givenToDiff(r3, 'ff2')			// error: "ff2" not assign to "ff"
// 	// givenToDiff(r4, 'eee')

// 	// // overload
// 	// function givenToDiffOverload<T extends Record<any, any>, K = PureLiteralRecord<T> extends never ? string : keyof T>(record: T, key: K): void;
// 	// function givenToDiffOverload<T extends Record<any, any>>(record: T, key: PureLiteralRecord<T> extends never ? string : keyof T) { }

// 	// givenToDiffOverload(r1, 'skdjflksdj')
// 	// givenToDiffOverload(r2, 'sdf')
// 	// givenToDiffOverload(rs, 'name')
// 	// givenToDiffOverload(rs, rSym)
// 	// givenToDiffOverload(rs, Symbol())		// overload redirect
// 	// givenToDiffOverload(rs, '12')			// overload redirect
// 	// givenToDiffOverload(rs, 12)
// 	// givenToDiffOverload(rs, '12')			// overload redirect
// 	// givenToDiffOverload(rs, 14)				// overload redirect
// 	// givenToDiffOverload(rs, 'namef')		// overload redirect
// 	// givenToDiffOverload(r3, 'ff')
// 	// givenToDiffOverload(r3, 'ff2')			// overload redirect
// 	// givenToDiffOverload(r4, 'eee')

// 	// givenToDiffOverload({ name: 'fe' }, 'namef')
// 	// /** isMappedType<T> testing end */
// }
