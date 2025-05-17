import { saveToLocalStorage, loadFromLocalStorage } from "../utils";

export interface IBaseService<T> {
	create(item: T): T;
	getById(id: string): T | undefined;
	update(id: string, updatedItem: T): boolean;
	delete(id: string): boolean;
	getAll(): T[];
}

export class BaseService<T extends { id: string }> implements IBaseService<T> {
	protected array: T[] = [];
	protected storageKey: string;
	private factory: (data: any) => T;

	constructor(storageKey: string, factory: (data: any) => T) {
		this.storageKey = storageKey;
		this.factory = factory;
		this.load();
	}

	protected load(): void {
		const localData = loadFromLocalStorage<any[]>(this.storageKey);
		if (localData && localData.length > 0) {
			this.array = localData.map((data) => this.factory(data));
		} else {
			this.array = [];
		}
	}

	protected save(): void {
		saveToLocalStorage(this.storageKey, this.array);
	}

	create(item: T): T {
		const instance = this.factory(item);
		this.array.push(instance);
		this.save();
		return instance;
	}

	getById(id: string): T | undefined {
		let item = this.array.find((item) => item.id === id);
		console.log(item, "item", this.factory);
		return this.array.find((item) => item.id === id);
	}

	update(id: string, updatedItem: T): boolean {
		const index = this.array.findIndex((item) => item.id === id);
		if (index === -1) return false;
		this.array[index] = this.factory(updatedItem);
		this.save();
		return true;
	}

	delete(id: string): boolean {
		const index = this.array.findIndex((item) => item.id === id);
		if (index === -1) return false;
		this.array.splice(index, 1);
		this.save();
		return true;
	}

	getAll(): T[] {
		return this.array;
	}
}
