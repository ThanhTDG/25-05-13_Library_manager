import { Book } from "../models/book.model";

export const booksData: Book[] = [
	new Book("1", "Clean Code", "Robert C. Martin", "9780132350884", 10, 9), // 10 (totalCopies) - 1 (Borrowed)
	new Book(
		"2",
		"The Pragmatic Programmer",
		"Andrew Hunt",
		"9780201616224",
		5,
		4
	), // 5 (totalCopies) - 1 (Borrowed)
	new Book("3", "You Don't Know JS", "Kyle Simpson", "9781491904244", 7, 6), // 7 (totalCopies) - 1 (Borrowed)
	new Book(
		"4",
		"Eloquent JavaScript",
		"Marijn Haverbeke",
		"9781593279509",
		6,
		5
	), // 6 (totalCopies) - 1 (Borrowed)
	new Book(
		"5",
		"JavaScript: The Good Parts",
		"Douglas Crockford",
		"9780596517748",
		4,
		3
	), // 4 (totalCopies) - 1 (Borrowed)
	new Book("6", "Design Patterns", "Erich Gamma", "9780201633610", 8, 7), // 8 (totalCopies) - 1 (Borrowed)
	new Book("7", "Refactoring", "Martin Fowler", "9780201485677", 9, 8), // 9 (totalCopies) - 1 (Borrowed)
	new Book(
		"8",
		"Introduction to Algorithms",
		"Thomas H. Cormen",
		"9780262033848",
		3,
		2
	), // 3 (totalCopies) - 1 (Borrowed)
	new Book(
		"9",
		"The Mythical Man-Month",
		"Frederick P. Brooks Jr.",
		"9780201835953",
		5,
		4
	), // 5 (totalCopies) - 1 (Borrowed)
	new Book("10", "Code Complete", "Steve McConnell", "9780735619678", 6, 5), // 6 (totalCopies) - 1 (Borrowed)
];
