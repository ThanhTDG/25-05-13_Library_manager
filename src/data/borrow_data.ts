import { BorrowedBook } from "../models/borrowedBook.model";
import { BorrowedBookStatus } from "../enums/borrowBook.enum";

export const borrowData: BorrowedBook[] = [
	new BorrowedBook(
		"1",
		"1",
		"1",
		new Date("2025-05-01"),
		BorrowedBookStatus.BORROWING
	),
	new BorrowedBook(
		"2",
		"2",
		"2",
		new Date("2025-05-02"),
		BorrowedBookStatus.RETURNED,
		new Date("2025-05-10")
	),
	new BorrowedBook(
		"3",
		"3",
		"3",
		new Date("2025-05-03"),
		BorrowedBookStatus.BORROWING
	),
	new BorrowedBook(
		"4",
		"4",
		"4",
		new Date("2025-05-04"),
		BorrowedBookStatus.RETURNED,
		new Date("2025-05-12")
	),
	new BorrowedBook(
		"5",
		"5",
		"5",
		new Date("2025-05-05"),
		BorrowedBookStatus.BORROWING
	),
	new BorrowedBook(
		"6",
		"6",
		"6",
		new Date("2025-05-06"),
		BorrowedBookStatus.RETURNED,
		new Date("2025-05-13")
	),
	new BorrowedBook(
		"7",
		"7",
		"7",
		new Date("2025-05-07"),
		BorrowedBookStatus.BORROWING
	),
	new BorrowedBook(
		"8",
		"8",
		"8",
		new Date("2025-05-08"),
		BorrowedBookStatus.RETURNED,
		new Date("2025-05-14")
	),
	new BorrowedBook(
		"9",
		"9",
		"9",
		new Date("2025-05-09"),
		BorrowedBookStatus.BORROWING
	),
	new BorrowedBook(
		"10",
		"10",
		"10",
		new Date("2025-05-10"),
		BorrowedBookStatus.RETURNED,
		new Date("2025-05-15")
	),
];
