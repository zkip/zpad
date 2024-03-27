import { Entity } from "./Entity";
import { Axis, Size } from "./axis";

export type Rectangle = { position: Axis<number>; size: Size<number>; } & Entity;