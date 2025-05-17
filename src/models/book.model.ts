import { generateId } from "../utils";

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
		public id: string = generateId(),
		public title: string,
		public author: string,
		public isbn: string,
		public totalCopies: number,
		public availableCopies: number
	) {}
	static create(data: Partial<Book>): Book {
		return new Book(
			data.id || generateId(),
			data.title || "Untitled",
			data.author || "Unknown",
			data.isbn || "Unknown",
			data.totalCopies || 0,
			data.availableCopies || 0
		);
	}
	update(newBook: Partial<Book>): void {
		this.title = newBook.title ?? this.title;
		this.author = newBook.author ?? this.author;
		this.isbn = newBook.isbn ?? this.isbn;

		if (newBook.totalCopies !== undefined && newBook.totalCopies !== null) {
			const difference = newBook.totalCopies - this.totalCopies;
			this.availableCopies += difference;
			this.availableCopies = Math.max(this.availableCopies, 0);
			this.totalCopies = newBook.totalCopies;
		}
	}
	static fromJson(json: any): Book {
		return new Book(
			json.id,
			json.title,
			json.author,
			json.isbn,
			json.totalCopies,
			json.availableCopies
		);
	}
}

export type BorrowableBook = Book & { borrowed: boolean };
