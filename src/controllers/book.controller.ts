import { Book } from '../models/book.model';
import { BookService } from '../services/book.service'
import { Singleton } from '../singleton';
import { BookView } from '../views/book.view';

@Singleton
export class BookController {
    private bookService: BookService;
    private bookView: BookView;

    constructor(bookService: BookService, bookView: BookView) {
        this.bookService = bookService;
        this.bookView = bookView;

        this.init();
    }

    private init(): void {
        this.renderBooks();
        this.bookView.bindCreateBookFormEvent();
        this.bookView.bindCancelBookFormEvent();
        this.bookView.setBookHandler(this.handleSaveBook.bind(this));
    }

    private renderBooks(): void {
        const books = this.bookService.getAll();
        this.bookView.renderBooks(
            books,
            this.handleRowClick.bind(this),
            this.handleDeleteBook.bind(this)
        );
    }


    private handleRowClick(book: Book): void {
        this.bookView.populateForm(book);
    }

    private handleSaveBook(updatedBook: Book): void {
        const existingBook = this.bookService.getById(updatedBook.id);
        if (existingBook) {
            this.bookService.update(updatedBook.id, updatedBook);
        } else {
            this.bookService.create(updatedBook);
        }
        this.renderBooks();
    }

    private handleDeleteBook(bookId: string): void {
        const isDeleted = this.bookService.delete(bookId);
        if (isDeleted) {
            this.renderBooks();
        } else {
            alert("Failed to delete the book.");
        }
    }
}