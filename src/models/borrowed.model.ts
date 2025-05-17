import { BorrowedStatus } from "../enums/borrow.enum";
import { generateId } from "../utils";

export class Borrowed {
	id: string;
	bookId: string;
	userId: string;
	borrowDay: Date;
	updatedDate?: Date;
	status: BorrowedStatus;

	constructor(
		bookId: string,
		userId: string,
		id: string = generateId(),
		borrowDay: Date = new Date(Date.now()),
		status: BorrowedStatus = BorrowedStatus.BORROWING,
		updatedDate?: Date
	) {
		this.id = id;
		this.bookId = bookId;
		this.userId = userId;
		this.borrowDay = borrowDay;
		this.updatedDate = updatedDate;
		this.status = status;
	}
	updateStatus(newStatus: BorrowedStatus): void {
		if (newStatus !== BorrowedStatus.BORROWING) {
			this.updatedDate = new Date(Date.now());
		} else {
			this.updatedDate = undefined;
		}
		this.status = newStatus;
	}
	static fromJson(json: any): Borrowed {
		return new Borrowed(
			json.bookId,
			json.userId,
			json.id,
			new Date(json.borrowDay),
			json.status,
			json.updatedDate ? new Date(json.updatedDate) : undefined
		);
	}
}
