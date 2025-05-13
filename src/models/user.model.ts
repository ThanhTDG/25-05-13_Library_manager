export interface IUser {
    id: string;
    name: string;
    borrowedBookIds: string[];
}

export class User implements IUser {
    id: string;
    name: string;
    borrowedBookIds: string[]

    constructor(id: string, name: string, borrowedBookIds: string[] = []) {
        this.id = id;
        this.name = name;
        this.borrowedBookIds = borrowedBookIds;
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