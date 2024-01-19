import { inRecordBy } from "../asserts";
import { get } from "../mapped";

export class Vector2<T extends number>{
	private deminsions = [0, 0] as [T, T];

	public set x(v: T) { this.deminsions[0] = v }
	public get x(): T { return this.deminsions[0] }

	public set y(v: T) { this.deminsions[1] = v }
	public get y(): T { return this.deminsions[1] }

	constructor(v?: T);
	constructor(x: T, y: T);
	constructor(vec: Vector2<T>);
	constructor(xOrVec: Vector2<T>, _y = xOrVec) {
		if (isVector2(xOrVec)) { this.copy(xOrVec); return; }
	}

	map<U>(fn: (deminsion: T, index: number, deminsions: T[]) => U) { return this.deminsions.map.call(this, fn) as [U, U] }

	all() { return this.deminsions }

	/** copy form another vector */
	copy<X extends T>(vec: Vector2<X>) { this.deminsions = [...vec.all()]; return; }
}


export function isVector2<T, X extends number>(v: T | Vector2<X>): v is Vector2<X> {
	return v instanceof Vector2 || (
		((get(v, 'deminsions') ?? []).length > 1) &&
		['x', 'y'].every(inRecordBy(v))
	)
}
