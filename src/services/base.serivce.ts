import { saveToLocalStorage, loadFromLocalStorage } from "../utils";
export interface IBaseService<T> {
    create(item: T): void;
    getById(id: string): T | undefined;
    update(id: string, updatedItem: T): boolean;
    delete(id: string): boolean;
    getAll(): T[];
}
export class BaseService<T> implements IBaseService<T> {
    private array: T[] = [];
    private storageKey: string;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
        this.load();
    }

    private load(): void {
        const localData = loadFromLocalStorage<T[]>(this.storageKey);
        if (localData && localData.length > 0) {
            this.array = localData;
        } else {
            this.array = [];
        }
    }

    private save(): void {
        saveToLocalStorage(this.storageKey, this.array);
    }

    create(item: T): void {
        this.array.push(item);
        this.save();
    }

    getById(id: string): T | undefined {
        return this.array.find((item: any) => item.id === id);
    }

    update(id: string, updatedItem: T): boolean {
        const index = this.array.findIndex((item: any) => item.id === id);
        if (index === -1) return false;
        this.array[index] = updatedItem;
        this.save();
        return true;
    }

    delete(id: string): boolean {
        const index = this.array.findIndex((item: any) => item.id === id);
        if (index === -1) return false;
        this.array.splice(index, 1);
        this.save();
        return true;
    }

    getAll(): T[] {
        return this.array;
    }
}