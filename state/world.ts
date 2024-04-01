import type { IEntity } from '$types/Entity';
import { storable } from './core';
import { tryJSONParse } from '$lib/transform';
import type { IRectangle } from '$types/entity/Rectangle';
import { get } from 'svelte/store';
import { type RectShape } from '$core/Rectangle';
import type { Vector2 } from '$lib/vector';

export const world = storable<IEntity['id'][]>('world', {
	fallback: [],
	get(value) { return tryJSONParse(value) },
	set(value) { return JSON.stringify(value) }
});

export function createRectangle(rect: RectShape) {
	world.update((entities) => (entities.push(rect.id), entities));
	properties.update((propertyMap) => ({ ...propertyMap, [rect.id]: rect }));
}

export const properties = storable<{ [key: IEntity['id']]: Property }>('property', {
	fallback: {},
	get(value) { return tryJSONParse(value) },
	set(value) { return JSON.stringify(value) }
})

type Property = {
	color?: string;
	position: Vector2,
	size: Vector2,
}

export function getProperty(uid: string) { return get(properties)[uid] }