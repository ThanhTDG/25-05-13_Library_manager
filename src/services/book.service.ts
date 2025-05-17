import { BaseService } from "./base.serivce";
import { Book } from "../models/book.model";
import { booksData } from "../data/books_data";

export class BookService extends BaseService<Book> {
	private static instance: BookService;

	private constructor() {
		super("books", (data) => Book.fromJson(data));
		if (this.getAll().length === 0) {
			booksData.forEach((book) => this.create(book));
		}
	}
	updateAvailableCopies(bookId: string, totalBorrowed: number): boolean {
		const book = this.getById(bookId);
		if (!book) {
			return false;
		}
		if (book.totalCopies >= totalBorrowed) {
			book.availableCopies = book.totalCopies - totalBorrowed;
			this.update(bookId, book);
			return true;
		}
		return false;
	}
	getAvailableCopies(bookId: string): number {
		const book = this.getById(bookId);
		if (!book) {
			return 0;
		}
		return book.availableCopies;
	}

	static getInstance(): BookService {
		if (!BookService.instance) {
			BookService.instance = new BookService();
		}
		return BookService.instance;
	}
}
