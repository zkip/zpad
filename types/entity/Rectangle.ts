import type { IAxis, ISize } from '$types/axis';
import type { IEntity } from '../Entity';

export type IRectangle = { position: IAxis<number>; size: ISize<number> } & IEntity;
