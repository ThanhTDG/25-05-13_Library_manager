import { BaseService } from "./base.serivce";
import { Book } from "../models/book.model";
import { booksData } from "../data/books_data";

export class BookService extends BaseService<Book> {
    private static instance: BookService;

    private constructor() {
        super("books");
        if (this.getAll().length === 0) {
            booksData.forEach(book => this.create(book));
        }
    }

    static getInstance(): BookService {
        if (!BookService.instance) {
            BookService.instance = new BookService();
        }
        return BookService.instance;
    }
}