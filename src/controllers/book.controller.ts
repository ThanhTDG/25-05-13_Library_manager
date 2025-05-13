import { CreatedBookForm } from '../forms/createdBook.form';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service'
import { BookView } from '../views/book.view';
export class BookController {
    constructor(
        private bookService: BookService,
        private bookView: BookView
    ) {
        this.init()
    }

    private init(): void {
        this.bookView.setAddBookHandler(this.handleAddBook.bind(this));
        this.renderBooks();
    }

    private handleAddBook(formData: CreatedBookForm): void {
        const newBook = Book.fromForm(formData);
        this.bookService.create(newBook);
        this.renderBooks();
    }

    private renderBooks(): void {
        const books = this.bookService.getAll();
        this.bookView.renderBooks(books);
    }
}