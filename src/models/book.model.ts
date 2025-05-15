
export interface IBook {
    id: string;
    title: string;
    author: string;
    isbn: string;
    totalCopies: number;
    availableCopies: number;
}

export class Book implements IBook {

    constructor(
        public id: string = Date.now().toString(),
        public title: string,
        public author: string,
        public isbn: string,
        public totalCopies: number,
        public availableCopies: number,
    ) {

    }
}


export type BorrowableBook = Book & { borrowed: boolean }
