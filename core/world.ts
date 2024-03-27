import type { Entity } from '$types/Entity';
import { storable } from './core';
import type { Rectangle } from '$types/Rectangle';
import { tryJSONParse } from '$lib/transform';

export const world = storable<Entity[]>('world', {
	fallback: [],
	get(value) {
		return tryJSONParse(value);
	},
	set(value) {
		return JSON.stringify(value);
	}
});

export function createRectangle(rect: Rectangle) {
	world.update((entities) => (entities.push(rect), entities));
}
