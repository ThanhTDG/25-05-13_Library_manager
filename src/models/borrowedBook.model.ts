import { BorrowedBookStatus } from "../enums/borrwedBook.enum";
import { generateId } from "../utils";

export class BorrowedBook {
    id: string;
    bookId: string;
    userId: string;
    borrowDay: Date;
    updatedDate?: Date;
    status: BorrowedBookStatus;

    constructor(
        id: string = generateId(),
        bookId: string,
        userId: string,
        borrowDay: Date = new Date(),
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
}