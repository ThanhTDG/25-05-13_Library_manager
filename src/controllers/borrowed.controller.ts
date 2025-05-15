import { BorrowedBook } from "../models/borrowedBook.model";
import { BorrowedBookService } from "../services/borrowedBook.sevice";
import { BookService } from "../services/book.service";
import { UserService } from "../services/user.service";
import { BorrowedView } from "../views/borrowed.view";
import { Singleton } from "../singleton";
import { IBorrowedBookDetails } from "../interfaces/borrowedBook.interface";
import { generateId } from "../utils";
import { ISelectOption } from "../interfaces/select.interface";

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

		this.init();
	}

	private init(): void {
		this.renderBorrowedBooks();
		this.borrowedView.bindCancelBorrowFormEvent();
		this.bindCreateBorrow();
		this.borrowedView.setBorrowHandler(this.handleSaveBorrow.bind(this));
	}

	private renderBorrowedBooks(): void {
		const borrowedBooks = this.borrowedBookService.getAll();
		const detailedBorrowedBooks = borrowedBooks.map((borrowedBook) => {
			return this.getBorrowedBookDetails(borrowedBook);
		});

		this.borrowedView.renderBorrowedBooks(
			detailedBorrowedBooks,
			this.handleRowClick.bind(this)
		);
	}

	private getBorrowedBookDetails(
		borrowedBook: BorrowedBook
	): IBorrowedBookDetails {
		const book = this.bookService.getById(borrowedBook.bookId);
		const user = this.userService.getById(borrowedBook.userId);
		if (!book || !user) {
			throw new Error("Invalid book or user ID");
		}
		return <IBorrowedBookDetails>{
			id: borrowedBook.id,
			bookId: book.id,
			bookTitle: book.title,
			userId: user.id,
			userName: user.name,
			borrowDay: borrowedBook.borrowDay,
			updatedDate: borrowedBook.updatedDate,
			status: borrowedBook.status,
		};
	}

	private bindCreateBorrow(): void {
		this.borrowedView.bindCreateBorrowFormEvent(
			() => this.getBookOptions(),
			() => this.getUserOptions()
		);
	}

	private getBookOptions(): ISelectOption[] {
		return this.bookService.getAll().map(
			(book) =>
				<ISelectOption>{
					id: book.id,
					displayString: book.title,
				}
		);
	}

	private getUserOptions(): ISelectOption[] {
		return this.userService.getAll().map(
			(user) =>
				<ISelectOption>{
					id: user.id,
					displayString: user.name,
				}
		);
	}

	private handleRowClick(borrowedBook: IBorrowedBookDetails): void {
		this.borrowedView.populateForm(borrowedBook);
	}

	private handleSaveBorrow(updateBorrow: BorrowedBook): void {
		const existingBook = this.bookService.getById(updateBorrow.id);
		console.log(updateBorrow);
		if (existingBook) {
			this.borrowedBookService.update(updateBorrow.id, updateBorrow);
		} else {
			updateBorrow.id = generateId();
			this.borrowedBookService.create(updateBorrow);
		}
		this.renderBorrowedBooks();
	}
}
