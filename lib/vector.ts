import { isTruthy } from "./asserts";

export class Vector2<T extends number>{
    private deminsions = [0, 0] as [T, T];

    set x(v: T) { this.deminsions[0] = v }
    get x(): T { return this.deminsions[0] }

    set y(v: T) { this.deminsions[1] = v }
    get y(): T { return this.deminsions[1] }

    constructor(v?: T);
    constructor(x: T, y: T);
    constructor(vec: Vector2<T>);
    constructor(xOrVec: Vector2<T>, _y = xOrVec as unknown as T) {
        if (isVector2(xOrVec)) { this.copyFrom(xOrVec); return; }
        this.deminsions = [xOrVec ?? 0, _y ?? 0];
    }

    map<U>(fn: (deminsion: T, index: number, deminsions: T[]) => U) { return this.deminsions.map.call(this, fn) as [U, U] }

    all() { return this.deminsions }

    /** copy form another vector */
    copyFrom<X extends T>(vec: Vector2<X>) { this.deminsions = [...vec.all()]; return; }
}

export function isVector2<T extends Record<never, never>, X extends number>(v: T | Vector2<X>): v is Vector2<X> {
    if (v instanceof Vector2) return true;

    return isTruthy(v) && (
        (((v as unknown as Vector2<X>)['deminsions'] ?? []).length > 1) &&
        ['x', 'y'].every(d => d in (v))
    )
}