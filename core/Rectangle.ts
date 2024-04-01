import { uuid } from "$lib/generator";
import {  Vector2 } from "$lib/vector";
import type { IEntity } from "$types/Entity";
import type { IRectangle } from "$types/entity/Rectangle";
import _ from "lodash";

export class RectShape implements IRectangle, IEntity {
    id: string = uuid();
    position = new Vector2();
    size = new Vector2();

    constructor(position: Vector2, size: Vector2) {
        this.position = position;
        this.size = size;
    }

    area() { return this.size.area() }
}

export function isRectShape<T>(v: T | RectShape): v is RectShape {
    if (v instanceof RectShape) return true;

    return (
        _.isObject(v) && ['id', 'position', 'size'].every((d) => d in v)
    );
}

export function castRectShape<T>(v: T | RectShape): RectShape {
    const position = _.get(v, 'position.dimension') as [number, number];
    const size = _.get(v, 'size.dimension') as [number, number];

    const rect = new RectShape(new Vector2(...position), new Vector2(...size));
    rect.id = _.get(v, "id") as string
    return rect
}