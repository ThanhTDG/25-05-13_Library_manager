import { generateId } from "../utils";

export interface IUser {
    id: string;
    name: string;
    dayCreated: Date;
    borrowedBookIds: string[];
}

export class User implements IUser {
    public name: string;
    public id: string;
    public dayCreated: Date;
    public borrowedBookIds: string[];

    constructor(id: string, name: string, dateCreated: Date, borrowedBookIds: string[] = []) {
        this.id = id;
        this.name = name;
        this.dayCreated = dateCreated;
        this.borrowedBookIds = borrowedBookIds
    }
    static formIUser(user: Partial<IUser>): User {
        const id = user.id || generateId();
        const name = user.name || "Unknown";
        const dayCreated = user.dayCreated ? new Date(user.dayCreated) : new Date();
        const borrowedBookIds = user.borrowedBookIds || [];
        return new User(id, name, dayCreated, borrowedBookIds);
    }

    borrowBook(bookId: string): void {
        if (!this.borrowedBookIds.includes(bookId)) {
            this.borrowedBookIds.push(bookId)
        }
    }
    returnBook(bookId: string): void {
        const index = this.borrowedBookIds.indexOf(bookId)
        if (index > -1) {
            this.borrowedBookIds.slice(index, 1)
        }
    }


}