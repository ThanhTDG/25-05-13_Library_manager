export interface IBaseService<T> {
    create(item: T): void;
    getById(id: string): T | undefined;
    getAll(): T[];
    update(id: string, updatedIntem: T): boolean;
    delete(id: string): boolean
}