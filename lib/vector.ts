import _ from 'lodash';
const { get, isObject } = _;

export class TwoDimension<T = number> {
    protected dimension = [0, 0] as [T, T];

    constructor(v?: T);
    constructor(d1: T, d2: T);
    constructor(d1OrV: T, d2 = d1OrV) { this.set(d1OrV, d2) }

    set(v?: T): void;
    set(d1: T, d2: T): void;
    set(d1OrV: T, d2 = d1OrV) { this.dimension = [d1OrV, d2]; }

    all() { return this.dimension }

    // update itself
    mapFrom<R extends T>(fn: (dimension: T, index: number, dimensions: T[]) => R) {
        const dimensions = this.dimension.map.call(this, fn) as [R, R];
        this.set(...dimensions);
        return this;
    }

    map<R>(fn: (dimension: T, index: number, dimensions: T[]) => R) {
        return this.dimension.map.call(this, fn) as [R, R];
    }

    // update itself
    combineFrom<U extends T, R extends T>({ dimension }: TwoDimension<U>, fn: (pair: [source: T, target: T], index: number,
        listPair: [sourceList: [T, T], targetList: [T, T]]) => R) {
        return this.mapFrom((source, index) => fn([source, dimension[index]], index, [this.dimension, dimension]));
    }

    combine<U extends T, R>({ dimension }: TwoDimension<U>, fn: (pair: [source: T, target: T], index: number,
        listPair: [sourceList: [T, T], targetList: [T, T]]) => R) {
        return this.map((source, index) => fn([source, dimension[index]], index, [this.dimension, dimension]));
    }

    clone() { return new TwoDimension(...this.all()) }

    /** copy form another TwoDimesion */
    copyFrom<U extends T>(dinmension: TwoDimension<U>) { this.dimension = [...dinmension.all()] }
}

export class Vector2 extends TwoDimension<number> {
    set x(v: number) { this.dimension[0] = v; } get x(): number { return this.dimension[0]; }
    set y(v: number) { this.dimension[1] = v; } get y(): number { return this.dimension[1]; }

    constructor(v?: number);
    constructor(x: number, y: number);
    constructor(vec: Vector2);
    constructor(xOrVec?: Vector2 | number, y = xOrVec as number) {
        super();

        if (isVector2(xOrVec)) { this.copyFrom(xOrVec); return; }
        this.set(xOrVec as number, y)
    }

    clone() { return new Vector2(...this.all()) }

    add(v?: number): Vector2;
    add(x: number, y: number): Vector2;
    add(vec?: Vector2): Vector2;
    add(xOrVec?: Vector2 | number, y = xOrVec as number): Vector2 {
        return this.clone().combineFrom(new Vector2(xOrVec as number, y), ([a, b]) => a + b);
    }

    minus(v?: number): Vector2;
    minus(x: number, y: number): Vector2;
    minus(vec?: Vector2): Vector2;
    minus(xOrVec?: Vector2 | number, y = xOrVec as number): Vector2 {
        return this.clone().combineFrom(new Vector2(xOrVec as number, y), ([a, b]) => a - b);
    }

    muliply(v?: number): Vector2;
    muliply(x: number, y: number): Vector2;
    muliply(vec?: Vector2): Vector2;
    muliply(xOrVec?: Vector2 | number, y = xOrVec as number): Vector2 {
        return this.clone().combineFrom(new Vector2(xOrVec as number, y), ([a, b]) => a * b);
    }

    divide(v?: number): Vector2;
    divide(x: number, y: number): Vector2;
    divide(vec?: Vector2): Vector2;
    divide(xOrVec?: Vector2 | number, y = xOrVec as number): Vector2 {
        return this.clone().combineFrom(new Vector2(xOrVec as number, y), ([a, b]) => a / b);
    }

    max(v?: number): Vector2;
    max(x: number, y: number): Vector2;
    max(vec?: Vector2): Vector2;
    max(xOrVec?: Vector2 | number, y = xOrVec as number): Vector2 {
        return this.clone().combineFrom(new Vector2(xOrVec as number, y), ([a, b]) => Math.max(a, b));
    }

    min(v?: number): Vector2;
    min(x: number, y: number): Vector2;
    min(vec?: Vector2): Vector2;
    min(xOrVec?: Vector2 | number, y = xOrVec as number): Vector2 {
        return this.clone().combineFrom(new Vector2(xOrVec as number, y), ([a, b]) => Math.min(a, b));
    }

    // TODO:
    // length() { return this.mapFrom(v => -v) }
    // normalize() { return this.mapFrom(v => -v) }
    // normalized() { return this.clone().mapFrom(v => -v) }

    // vector rect area
    area() { return this.dimension.reduce((a, b) => a * b) }
    // vector rect perimeter
    perimeter() { return this.dimension.reduce((a, b) => a + b) }

    negate() { return this.clone().mapFrom(v => -v) }

    floor() { return this.clone().mapFrom(v => Math.floor(v)) }
    ceil() { return this.clone().mapFrom(v => Math.ceil(v)) }
    round() { return this.clone().mapFrom(v => Math.round(v)) }
    trunc() { return this.clone().mapFrom(v => Math.trunc(v)) }
    abs() { return this.clone().mapFrom(v => Math.abs(v)) }
    sign() { return this.clone().mapFrom(v => Math.sign(v)) }
    sqrt() { return this.clone().mapFrom(v => Math.sqrt(v)) }
    acos() { return this.clone().mapFrom(v => Math.acos(v)) }
    asin() { return this.clone().mapFrom(v => Math.asin(v)) }
    atan() { return this.clone().mapFrom(v => Math.atan(v)) }
    sinh() { return this.clone().mapFrom(v => Math.sinh(v)) }
    cosh() { return this.clone().mapFrom(v => Math.cosh(v)) }
    tanh() { return this.clone().mapFrom(v => Math.tanh(v)) }
    asinh() { return this.clone().mapFrom(v => Math.asinh(v)) }
    acosh() { return this.clone().mapFrom(v => Math.acosh(v)) }
    atanh() { return this.clone().mapFrom(v => Math.atanh(v)) }
    cbrt() { return this.clone().mapFrom(v => Math.cbrt(v)) }
    clz32() { return this.clone().mapFrom(v => Math.clz32(v)) }
    expm1() { return this.clone().mapFrom(v => Math.expm1(v)) }
    exp() { return this.clone().mapFrom(v => Math.exp(v)) }
    fround() { return this.clone().mapFrom(v => Math.fround(v)) }
    log() { return this.clone().mapFrom(v => Math.log(v)) }
    log10() { return this.clone().mapFrom(v => Math.log10(v)) }
    log1p() { return this.clone().mapFrom(v => Math.log1p(v)) }
    log2() { return this.clone().mapFrom(v => Math.log2(v)) }
}

export function isVector2<T>(v: T | Vector2): v is Vector2 {
    if (v instanceof Vector2) return true;

    return (
        isObject(v) && (get(v, 'dimension.length') ?? 0) > 1 && ['x', 'y'].every((d) => d in v)
    );
}
