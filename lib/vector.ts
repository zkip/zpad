import _ from 'lodash';
const { get, isObject } = _;

export class TwoDimension<T = number> {
    protected dimension = [0, 0] as [T, T];

    set(v?: T): void;
    set(d1: T, d2: T): void;
    set(d1OrV: T, d2 = d1OrV) { this.dimension = [d1OrV, d2] }

    all() { return this.dimension }

    map<U>(fn: (dimension: T, index: number, dimensions: T[]) => U) {
        return this.dimension.map.call(this, fn) as [U, U];
    }

    /** copy form another TwoDimesion */
    copyFrom<U extends T>(dinmension: TwoDimension<U>) { this.dimension = [...dinmension.all()] }
}

export class Vector2 extends TwoDimension<number> {
    set x(v: number) { this.dimension[0] = v; } get x(): number { return this.dimension[0]; }
    set y(v: number) { this.dimension[1] = v; } get y(): number { return this.dimension[1]; }

    constructor(v?: number);
    constructor(x: number, y: number);
    constructor(vec: Vector2);
    constructor(xOrVec?: Vector2 | number, y = xOrVec) {
        super();

        if (isVector2(xOrVec)) { this.copyFrom(xOrVec); return; }
        this.set(xOrVec as number, y as number)
    }
}

export class Size extends TwoDimension<number> {
    set width(v: number) { this.dimension[0] = v; } get width(): number { return this.dimension[0]; }
    set height(v: number) { this.dimension[1] = v; } get height(): number { return this.dimension[1]; }

    constructor(v?: number);
    constructor(width: number, height: number);
    constructor(size: Size);
    constructor(widthOrSize?: Size | number, y = widthOrSize) {
        super();

        if (isVector2(widthOrSize)) { this.copyFrom(widthOrSize); return; }
        this.set(widthOrSize as number, y as number)
    }

    area() { return this.width * this.height }
}

export function isVector2<T>(v: T | Vector2): v is Vector2 {
    if (v instanceof Vector2) return true;

    return (
        isObject(v) && (get(v, 'dimension.length') ?? 0) > 1 && ['x', 'y'].every((d) => d in v)
    );
}
