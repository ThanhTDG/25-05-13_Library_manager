import { get } from "jquery";
import { Book } from "../models/book.model";
import {
	getButtonById,
	getDialogElementById,
	getFormElementById,
	getInputElementById,
} from "./utils.view";

export class BookView {
	static readonly ELEMENT_IDS = {
		BOOK_DIALOG: "dialog-book",
		BOOK_FORM: "form-book",
		FORM_ID: "form-book-id",
		FORM_TITLE: "form-book-title",
		FORM_AUTHOR: "form-book-author",
		FORM_ISBN: "form-book-isbn",
		FORM_AVAILABLE_COPIES: "form-book-available-copies",
		FORM_TOTAL_COPIES: "form-book-total-copies",
		BTN_TRIGGER_CREATE_BOOK: "btn-trigger-create-book",
		BTN_SAVE_BOOK_FORM: "btn-save-form-book",
		BTN_CANCEL_BOOK_FORM: "btn-cancel-form-book",
	};

	static readonly ELEMENT_CLASSES = {
		BTN_DELETE_BOOK: "btn-delete-book",
	};

	getBookDialog(): HTMLDialogElement {
		return getDialogElementById(BookView.ELEMENT_IDS.BOOK_DIALOG);
	}

	getBookForm(): HTMLFormElement {
		return getFormElementById(BookView.ELEMENT_IDS.BOOK_FORM);
	}

	setBookHandler(handle: (formData: Partial<Book>) => void): void {
		const form = this.getBookForm();
		if (!form) return;

		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = this.collectFormData();
			if (!formData) return;
			handle(formData);
			this.getBookDialog().close();
			location.reload();
		});
	}

	handleShowCreateBookForm(): void {
		const form = this.getBookForm();
		if (form) form.reset();
		this.getBookDialog().showModal();
	}

	bindCreateBookFormEvent(): void {
		const btnOpenFormCreate = getButtonById(
			BookView.ELEMENT_IDS.BTN_TRIGGER_CREATE_BOOK
		);
		btnOpenFormCreate?.addEventListener("click", () =>
			this.handleShowCreateBookForm()
		);
	}

	bindCancelBookFormEvent(): void {
		const cancelDialogButton = getButtonById(
			BookView.ELEMENT_IDS.BTN_CANCEL_BOOK_FORM
		);
		if (!cancelDialogButton) return;

		cancelDialogButton.addEventListener("click", () => {
			const form = this.getBookForm();
			if (form) form.reset();
			this.getBookDialog().close();
		});
	}

	populateForm(book: Book): void {
		const ELEMENTS_ID = BookView.ELEMENT_IDS;
		getInputElementById(ELEMENTS_ID.FORM_ID).value = book.id;
		getInputElementById(ELEMENTS_ID.FORM_TITLE).value = book.title;
		getInputElementById(ELEMENTS_ID.FORM_AUTHOR).value = book.author;
		getInputElementById(ELEMENTS_ID.FORM_ISBN).value = book.isbn;
		getInputElementById(ELEMENTS_ID.FORM_AVAILABLE_COPIES).valueAsNumber =
			book.availableCopies;
		this._setTotalCopiesInput(book);
		this.getBookDialog().showModal();
	}

	private _setTotalCopiesInput(book: Book): void {
		const borrowedCopies = book.totalCopies - book.availableCopies;
		const totalCopiesInput = getInputElementById(
			BookView.ELEMENT_IDS.FORM_TOTAL_COPIES
		);
		totalCopiesInput.setAttribute("min", borrowedCopies.toString());
		totalCopiesInput.valueAsNumber = book.totalCopies;
	}

	renderBooks(
		bookList: Book[],
		onRowClick: (book: Book) => void,
		onDeleteClick: (bookId: string) => void
	): void {
		const tableBody = document.querySelector("#book-table tbody");
		if (!tableBody) return;

		tableBody.innerHTML = bookList
			.map(
				(book) => `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.availableCopies}</td>
                    <td>${book.totalCopies}</td>
                    <td>
                        <button class="${BookView.ELEMENT_CLASSES.BTN_DELETE_BOOK}" data-id="${book.id}">Delete</button>
                    </td>
                </tr>
            `
			)
			.join("");

		tableBody.querySelectorAll("tr").forEach((row, index) => {
			const deleteButton = row.querySelector(
				`.${BookView.ELEMENT_CLASSES.BTN_DELETE_BOOK}`
			) as HTMLButtonElement;

			deleteButton.addEventListener("click", (event) => {
				event.stopPropagation();
				onDeleteClick(bookList[index].id);
			});

			row.addEventListener("click", () => onRowClick(bookList[index]));
		});
	}

	private collectFormData(): Partial<Book> | null {
		const ELEMENTS_ID = BookView.ELEMENT_IDS;

		const id =
			getInputElementById(ELEMENTS_ID.FORM_ID).value || Date.now().toString();
		const title = getInputElementById(ELEMENTS_ID.FORM_TITLE).value.trim();
		const author = getInputElementById(ELEMENTS_ID.FORM_AUTHOR).value.trim();
		const isbn = getInputElementById(ELEMENTS_ID.FORM_ISBN).value.trim();
		const totalCopies = getInputElementById(
			ELEMENTS_ID.FORM_TOTAL_COPIES
		).valueAsNumber;
		const availableCopies = getInputElementById(
			ELEMENTS_ID.FORM_AVAILABLE_COPIES
		).valueAsNumber;

		if (!title || !author || !isbn) {
			alert("Please fill in all fields.");
			return null;
		}

		return {
			id,
			title,
			author,
			isbn,
			totalCopies,
			availableCopies,
		};
	}
}
