export interface ICrud<T> {
    create(item: T): void;
    read(id: string): T | undefined;
    update(id: string, item: T): boolean;
    delete(id: string): boolean;
}