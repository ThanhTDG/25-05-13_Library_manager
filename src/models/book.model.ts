import { CreatedBookForm } from "../forms/createdBook.form";
import Audio from "./audio";

export interface IBook {
    id: string;
    title: string;
    author: string;
    availableCopies: number;
}

export class Book implements IBook {
    id: string;
    title: string;
    author: string;
    date: string; 
    availableCopies: number;

    constructor(
        id: string,
        title: string,
        author: string,
        date: string,
        availableCopies: number = 1
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.availableCopies = availableCopies;
    }
    static fromForm(form: CreatedBookForm): Book {
        return new Book(
            Date.now().toString(),
            form.title.trim(),
            form.author.trim(),
            form.year.trim(),
            1
        );
    }
}


export type BorrowableBook = Book & { borrowed: boolean }
