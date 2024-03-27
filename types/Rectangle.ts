import type { Entity } from './Entity';
import type { Axis, Size } from './axis';

export type Rectangle = { position: Axis<number>; size: Size<number> } & Entity;
