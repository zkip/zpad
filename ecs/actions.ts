import { Book, Library, Stock, Entity, Vector2 } from "./entities";

export function sql_borrow(user: User, library: Library, targets: Book[]) {
	// searching stocks
	const kinds_id = search(library, '...');


	if (library.area_blocks) { }
}
export function assess() { }
export function read() { }
export function return_book() { }


export function search(library: Library, ...conditions: any[]): /* kind_id[] */Stock[] {
	const results = library.filter(...);
	return results;
}

class Storage<T> {
	stocks: T[] = [];

	putItem(item: T) { }
	removeItem(item: T) { }
}

class Motorage {
	position: Vector2 = [0, 0];

	moveTo(destination: Vector2) { }
	move(delta: Vector2) { }
	transpo(destination: Vector2) { }
}

class Assessor {
	position: Vector2 = [0, 0];

	assess(assessable: Assessable): number {
		return 0;
	}
}

type User = Entity & {
	components: {
		motorage: Motorage,
		storage: Storage<any>,
	}
}

type Admin = Entity & {
	components: {
		motorage: Motorage,
		storage: Storage<any>,
		assessor: Assessor
	}
}

function create_User() {
	const entity1 = {} as Entity1;
	entity1.addComponent(Storage, entity1.options.get(Storage));
	entity1.addComponent(Motorage, entity1.options.get(Motorage));
}
