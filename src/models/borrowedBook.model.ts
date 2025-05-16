import { BorrowedBookStatus } from "../enums/borrowBook.enum";
import { generateId } from "../utils";

export class BorrowedBook {
	id: string;
	bookId: string;
	userId: string;
	borrowDay: Date;
	updatedDate?: Date;
	status: BorrowedBookStatus;

	constructor(
		bookId: string,
		userId: string,
		id: string = generateId(),
		borrowDay: Date = new Date(Date.now()),
		status: BorrowedBookStatus = BorrowedBookStatus.BORROWING,
		updatedDate?: Date
	) {
		this.id = id;
		this.bookId = bookId;
		this.userId = userId;
		this.borrowDay = borrowDay;
		this.updatedDate = updatedDate;
		this.status = status;
	}
	updateDate(): void {
		if (this.status !== BorrowedBookStatus.BORROWING) {
			this.updatedDate = new Date(Date.now());
		} else {
			this.updatedDate = undefined;
		}
	}
}
