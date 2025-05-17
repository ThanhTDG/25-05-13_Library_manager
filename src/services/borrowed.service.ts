import { BaseService } from "./base.serivce";
import { Borrowed } from "../models/borrowed.model";
import { borrowData } from "../data/borrow_data";
import { BorrowedStatus } from "../enums/borrow.enum";

export class BorrowedService extends BaseService<Borrowed> {
	private static instance: BorrowedService;

	private constructor() {
		super("borrowedBooks", (data) => Borrowed.fromJson(data));
		if (this.getAll().length === 0) {
			borrowData.forEach((borrowedBook) => this.create(borrowedBook));
		}
	}
	getByUserId(userId: string): Borrowed[] {
		return this.getAll().filter(
			(borrowedBook) => borrowedBook.userId === userId
		);
	}
	private _isMatchingBorrowedBook(
		borrowedBook: Borrowed,
		userId: string,
		bookId: string,
		status: BorrowedStatus
	): boolean {
		return (
			borrowedBook.userId === userId &&
			borrowedBook.bookId === bookId &&
			borrowedBook.status === status
		);
	}
	public hasBorrowed(
		userId: string,
		bookId: string,
		status: BorrowedStatus = BorrowedStatus.BORROWING
	): boolean {
		return this.getAll().some((borrowedBook) =>
			this._isMatchingBorrowedBook(borrowedBook, userId, bookId, status)
		);
	}

	getCountByBookId(bookId: string, status?: BorrowedStatus): number {
		return this.getAll().filter((borrowedBook) => {
			const bookMatch = borrowedBook.bookId === bookId;
			if (status !== undefined) {
				return bookMatch && borrowedBook.status === status;
			}
			return bookMatch;
		}).length;
	}

	static getInstance(): BorrowedService {
		if (!BorrowedService.instance) {
			BorrowedService.instance = new BorrowedService();
		}
		return BorrowedService.instance;
	}
}
