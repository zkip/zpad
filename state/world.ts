import type { IEntity } from '$types/Entity';
import { storable } from './core';
import { tryJSONParse } from '$lib/transform';
import type { IRectangle } from '$types/entity/Rectangle';

export const world = storable<IEntity[]>('world', {
	fallback: [],
	get(value) {
		return tryJSONParse(value);
	},
	set(value) {
		return JSON.stringify(value);
	}
});

export function createRectangle(rect: IRectangle) {
	world.update((entities) => (entities.push(rect), entities));
}
