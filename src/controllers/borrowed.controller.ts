import { BorrowedBook } from '../models/borrowedBook.model';
import { BorrowedBookService } from '../services/borrowedBook.sevice';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { BorrowedView } from '../views/borrowed.view';
import { Singleton } from '../singleton';
import { IBorrowedBookDetails } from '../interfaces/borrowedBook.interface';
import { generateId } from '../utils';

@Singleton
export class BorrowedController {
    private borrowedBookService: BorrowedBookService;
    private bookService: BookService;
    private userService: UserService;
    private borrowedView: BorrowedView;

    constructor(
        borrowedBookService: BorrowedBookService,
        borrowedView: BorrowedView,
        bookService: BookService,
        userService: UserService
    ) {
        this.borrowedBookService = borrowedBookService;
        this.borrowedView = borrowedView;
        this.bookService = bookService;
        this.userService = userService;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.init();
    }

    private init(): void {
        this.renderBorrowedBooks();
        this.setupEventListeners();
        this.borrowedView.bindCancelBorrowFormEvent()
    }

    private renderBorrowedBooks(): void {
        const borrowedBooks = this.borrowedBookService.getAll();
        const detailedBorrowedBooks = borrowedBooks.map((borrowedBook) => {
            const book = this.bookService.getById(borrowedBook.bookId);
            const user = this.userService.getById(borrowedBook.userId);

            return {
                id: borrowedBook.id,
                bookId: borrowedBook.bookId,
                bookTitle: book ? book.title : '-',
                userId: borrowedBook.userId,
                userName: user ? user.name : '-',
                borrowDay: borrowedBook.borrowDay,
                updatedDate: borrowedBook.updatedDate,
                status: borrowedBook.status
            } as IBorrowedBookDetails;
        });

        this.borrowedView.renderBorrowedBooks(detailedBorrowedBooks, this.handleRowClick);
    }

    private setupEventListeners(): void {
        this.renderBorrowedBooks()
        this.borrowedView.bindCancelBorrowFormEvent();
        this.bindCreateBorrow()
        this.borrowedView.setBorrowHandler(this.handleSaveBorrow.bind(this))

    }
    private bindCreateBorrow(): void {
        const bookOptions = this.bookService.getAll().map((book) => {
            return {
                id: book.id,
                displayString: book.title
            }
        });
        const userOptions = this.userService.getAll().map((user) => {
            return {
                id: user.id,
                displayString: user.name
            }
        });
        this.borrowedView.bindCreateBorrowFormEvent(userOptions, bookOptions)
    }

    private handleRowClick(borrowedBook: IBorrowedBookDetails): void {
        this.borrowedView.populateForm(borrowedBook);
    }


    private handleSaveBorrow(updatedBook: BorrowedBook): void {
        const existingBook = this.bookService.getById(updatedBook.id);
        if (existingBook) {
            console.log("updatedBook", updatedBook, existingBook)
            this.borrowedBookService.update(updatedBook.id, updatedBook);
        } else {
            updatedBook.id = generateId()
            this.borrowedBookService.create(updatedBook);
        }
        this.renderBorrowedBooks();
    }

    public getIBorrowedBookDetails(borrowedBook: BorrowedBook): IBorrowedBookDetails {
        const book = this.bookService.getById(borrowedBook.bookId);
        const user = this.userService.getById(borrowedBook.userId);

        if (!book || !user) {
            throw new Error('Invalid book or user ID');
        }

        return {
            id: borrowedBook.id,
            bookId: book.id,
            bookTitle: book.title,
            userId: user.id,
            userName: user.name,
            borrowDay: borrowedBook.borrowDay,
            updatedDate: borrowedBook.updatedDate,
            status: borrowedBook.status
        };
    }
}