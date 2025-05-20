import { Borrowed } from "../models/borrowed.model";
import { BorrowedService } from "../services/borrowed.service";
import { BookService } from "../services/book.service";
import { UserService } from "../services/user.service";
import { BorrowedView } from "../views/borrowed.view";
import { Singleton } from "../singleton";
import { IBorrowedBookDetails } from "../interfaces/borrowedBook.interface";
import { generateId } from "../utils";
import { ISelectOption } from "../interfaces/select.interface";
import { BorrowedStatus } from "../enums/borrow.enum";

@Singleton
export class BorrowedController {
	private borrowedService: BorrowedService;
	private bookService: BookService;
	private userService: UserService;
	private borrowedView: BorrowedView;

	constructor(
		borrowedBookService: BorrowedService,
		borrowedView: BorrowedView,
		bookService: BookService,
		userService: UserService
	) {
		this.borrowedService = borrowedBookService;
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
		const borrowedBooks = this.borrowedService.getAll();
		const detailedBorrowedBooks = borrowedBooks.map((borrowedBook) => {
			return this.getBorrowedBookDetails(borrowedBook);
		});

		this.borrowedView.renderBorrowedBooks(
			detailedBorrowedBooks,
			this.handleRowClick.bind(this)
		);
	}

	private getBorrowedBookDetails(borrowedBook: Borrowed): IBorrowedBookDetails {
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
	private createBorrow(userId: string, bookId: string): void {
		const isAlreadyBorrowing = this.borrowedService.hasBorrowed(userId, bookId);
		if (isAlreadyBorrowing) {
			alert(
				"This user is already borrowing this book and has not returned it yet."
			);
			return;
		}
		const availableCopies = this.bookService.getAvailableCopies(bookId);
		if (availableCopies <= 0) {
			alert("This book is currently not available for borrowing.");
			return;
		}
		const newBorrowedBook = new Borrowed(bookId, userId);
		this.borrowedService.create(newBorrowedBook);

		this.updateAvailableCopies(bookId);
	}
	private updateAvailableCopies(bookId: string): void {
		const borrowedCount = this.borrowedService.getCountByBookId(
			bookId,
			BorrowedStatus.BORROWING
		);
		this.bookService.updateAvailableCopies(bookId, borrowedCount);
	}

	private updateBorrow(borrowId: string, status: BorrowedStatus): void {
		let borrowed = this.borrowedService.getById(borrowId);
		if (!borrowed) {
			alert("Borrowed book not found");
			return;
		}
		switch (status) {
			case BorrowedStatus.RETURNED:
				borrowed.updateStatus(status);
				this.borrowedService.update(borrowId, borrowed);
				this.updateAvailableCopies(borrowed.bookId);
				break;
			case BorrowedStatus.BORROWING:
			default:
				alert("This book is already borrowed");
				return;
		}
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

	private handleSaveBorrow(updateBorrow: Partial<Borrowed>): void {
		if (!updateBorrow) {
			alert("Invalid borrow data");
			return;
		}
		const hasId = "id" in updateBorrow;
		const hasStatus = "status" in updateBorrow;
		if (hasId && hasStatus) {
			this.updateBorrow(
				<string>updateBorrow.id,
				<BorrowedStatus>updateBorrow.status
			);
			return;
		}
		if (updateBorrow.userId && updateBorrow.bookId) {
			this.createBorrow(updateBorrow.userId, updateBorrow.bookId);
		}
		this.renderBorrowedBooks();
	}
}
