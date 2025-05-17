import { Borrowed } from "../models/borrowed.model";
import { BorrowedStatus } from "../enums/borrow.enum";

export const borrowData: Borrowed[] = [
	new Borrowed("1", "1", "1", new Date("2025-05-01"), BorrowedStatus.BORROWING),
	new Borrowed("2", "2", "2", new Date("2025-05-02"), BorrowedStatus.BORROWING),
	new Borrowed("3", "3", "3", new Date("2025-05-03"), BorrowedStatus.BORROWING),
	new Borrowed("4", "4", "4", new Date("2025-05-04"), BorrowedStatus.BORROWING),
	new Borrowed("5", "5", "5", new Date("2025-05-05"), BorrowedStatus.BORROWING),
	new Borrowed("6", "6", "6", new Date("2025-05-06"), BorrowedStatus.BORROWING),
	new Borrowed("7", "7", "7", new Date("2025-05-07"), BorrowedStatus.BORROWING),
	new Borrowed("8", "8", "8", new Date("2025-05-08"), BorrowedStatus.BORROWING),
	new Borrowed("9", "9", "9", new Date("2025-05-09"), BorrowedStatus.BORROWING),
	new Borrowed(
		"10",
		"10",
		"10",
		new Date("2025-05-10"),
		BorrowedStatus.BORROWING
	),
];
