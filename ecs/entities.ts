export type Library = {
	stock: Stock;
	area_blocks: Area[];
}

export type Stock = {
	library_id: string;
	kind_id: string;
	count: number;
}

export type Book = {
	id: string;
	kind_id: string;
	name: string;
}

export type Position = {
	shelf_id: string;
	area: Area;
}

export type Area = {
	geo_postion: Vector3;
}

export type Vector3 = [number, number, number];
export type Vector2 = [number, number];

export type Table<T> = {
	name: string;
	insert(record: T): void;
	query(...conditions: any[]): T[];
}

export type Queryable = {
	is(...conditions: any[]): boolean
}

export type User = {
	id: string;
}

export type Entity = {
	id: string;
	components: Map</* component */ any, /* config */ any>
	addComponent<T extends any>(component: T, options: any): void
	getComponent<T extends any>(component: T, options: any): void
}