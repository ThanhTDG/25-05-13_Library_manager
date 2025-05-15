import { get } from "jquery";
import { BorrowedBookStatus } from "../enums/borrowBook.enum";
import { IBorrowedBookDetails } from "../interfaces/borrowedBook.interface";
import { ISelectOption } from "../interfaces/select.interface";
import { dateToString } from "../utils";
import {
	enumToOptions,
	fillOption,
	fillOptions,
	getButtonById,
	getDialogElementById,
	getElementById,
	getFormElementById,
	getInputElementById,
	getSelectElementById,
	loadSelectOption,
	loadSelectOptions,
} from "./utils.view";

export class BorrowedView {
	static readonly ELEMENT_IDS = {
		BORROW_DIALOG: "dialog-borrow",
		BORROW_FORM: "form-borrow",
		FORM_BORROW_ID: "form-borrow-id",
		FORM_BORROW_BOOK: "form-select-borrow-book",
		FORM_BORROW_USER: "form-select-borrow-user",
		FORM_BORROW_STATUS: "form-select-borrow-status",
		FORM_BORROW_DATE: "form-borrow-date",
		BTN_TRIGGER_CREATE_BORROW: "btn-trigger-create-borrow",
		BTN_SAVE_BORROW_FORM: "btn-save-form-borrow",
		BTN_CANCEL_BORROW_FORM: "btn-cancel-form-borrow",
	};

	renderBorrowedBooks(
		borrowedBooks: Array<IBorrowedBookDetails>,
		handleRowClick: (borrowed: IBorrowedBookDetails) => void
	): void {
		const table = document.querySelector(
			"#borrowed-table tbody"
		) as HTMLTableSectionElement;
		if (!table) {
			console.error("Borrowed table not found in the DOM.");
			return;
		}
		table.innerHTML = "";

		borrowedBooks.forEach((borrowedBook) => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${borrowedBook.id}</td>
                <td>${borrowedBook.bookTitle}</td>
                <td>${borrowedBook.userName}</td>
                <td>${dateToString(borrowedBook.borrowDay)}</td>
                <td>${
									borrowedBook.updatedDate
										? dateToString(borrowedBook.updatedDate)
										: "-"
								}</td>
                <td>${borrowedBook.status}</td>
            `;
			row.addEventListener("click", () => handleRowClick(borrowedBook));
			table.appendChild(row);
		});
	}

	setBorrowHandler(handle: (formData: any) => void): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const dialog = this.getBorrowDialog();
		const form = this.getBorrowForm();
		if (form) {
			form.addEventListener("submit", (event) => {
				event.preventDefault();
				const id = getInputElementById(ELEMENTS_ID.FORM_BORROW_ID).value;
				const bookId = getSelectElementById(
					ELEMENTS_ID.FORM_BORROW_BOOK
				)?.value;
				const userId = getSelectElementById(
					ELEMENTS_ID.FORM_BORROW_USER
				)?.value;
				const status = getSelectElementById(
					ELEMENTS_ID.FORM_BORROW_STATUS
				)?.value;
				const borrowDate = getInputElementById(
					ELEMENTS_ID.FORM_BORROW_DATE
				).value;
				const formData = {
					id,
					bookId,
					userId,
					status,
					borrowDate: new Date(borrowDate),
				};
				handle(formData);
				dialog.close();
			});
		}
	}

	handleShowCreateBorrowForm(): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const dialog = this.getBorrowDialog();
		const form = this.getBorrowForm();
		if (form) {
			form.reset();
		}
		dialog.showModal();
	}

	bindCreateBorrowFormEvent(
		getBookIOptions: () => ISelectOption[],
		getUserIOptions: () => ISelectOption[]
	): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const btnOpenFormCreate = getButtonById(
			ELEMENTS_ID.BTN_TRIGGER_CREATE_BORROW
		);

		btnOpenFormCreate.addEventListener("click", () => {
			const userIOptions = getUserIOptions();
			const bookIOptions = getBookIOptions();

			const form = this.getBorrowForm();

			if (form) {
				form.reset();
			}
			const userSelect = getSelectElementById(ELEMENTS_ID.FORM_BORROW_USER);
			const bookSelect = getSelectElementById(ELEMENTS_ID.FORM_BORROW_BOOK);
			console.log("open borrow userSelect", userSelect);
			if (userSelect) {
				userSelect.innerHTML = fillOptions(userIOptions, {
					id: "",
					displayString: "Select User",
				});
				userSelect.disabled = false;
			}
			if (bookSelect) {
				bookSelect.innerHTML = fillOptions(bookIOptions, {
					id: "",
					displayString: "Select Book",
				});
				bookSelect.disabled = false;
			}
			this.getBorrowedStatusForm();

			this.handleShowCreateBorrowForm();
			setTimeout(() => {
				($("#form-select-borrow-user") as any).select2({
					dropdownParent: $("#dialog-borrow"),
				});
				($("#form-select-borrow-book") as any).select2({
					dropdownParent: $("#dialog-borrow"),
				});
			}, 0);
		});
	}

	bindCancelBorrowFormEvent(): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const cancelDialogButton = getButtonById(
			ELEMENTS_ID.BTN_CANCEL_BORROW_FORM
		);
		const form = this.getBorrowForm();
		if (cancelDialogButton) {
			cancelDialogButton.addEventListener("click", () => {
				const dialog = this.getBorrowDialog();
				if (form) {
					form.reset();
				}
				dialog.close();
			});
		}
	}

	getBorrowedStatusForm(
		defaultOption: string = BorrowedBookStatus.BORROWING
	): HTMLSelectElement | null {
		if (defaultOption) {
		}
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const borrowStatus = getSelectElementById(ELEMENTS_ID.FORM_BORROW_STATUS);
		if (borrowStatus) {
			borrowStatus.innerHTML = enumToOptions(BorrowedBookStatus);
		}
		return borrowStatus;
	}

	populateForm(borrowedBook: IBorrowedBookDetails): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const dialog = this.getBorrowDialog();

		loadSelectOption(
			ELEMENTS_ID.FORM_BORROW_USER,
			borrowedBook.userId,
			borrowedBook.userName
		);
		loadSelectOption(
			ELEMENTS_ID.FORM_BORROW_BOOK,
			borrowedBook.bookId,
			borrowedBook.bookTitle
		);
		let borrowStatus = this.getBorrowedStatusForm();
		if (borrowStatus) {
			borrowStatus.value = borrowedBook.status;
		}

		getInputElementById(ELEMENTS_ID.FORM_BORROW_ID).value = borrowedBook.id;
		getInputElementById(ELEMENTS_ID.FORM_BORROW_DATE).value = dateToString(
			borrowedBook.borrowDay
		);

		dialog.showModal();
	}

	getBorrowDialog(): HTMLDialogElement {
		return getDialogElementById(BorrowedView.ELEMENT_IDS.BORROW_DIALOG);
	}

	getBorrowForm(): HTMLFormElement {
		return getFormElementById(BorrowedView.ELEMENT_IDS.BORROW_FORM);
	}
}
