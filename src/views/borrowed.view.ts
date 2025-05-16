import { BorrowedBookStatus } from "../enums/borrowBook.enum";
import { IBorrowedBookDetails } from "../interfaces/borrowedBook.interface";
import { ISelectOption } from "../interfaces/select.interface";
import { BorrowedBook } from "../models/borrowedBook.model";
import { dateToString, stringToDate } from "../utils";
import {
	enumToOptions,
	fillOptions,
	getButtonById,
	getDialogElementById,
	getFormElementById,
	getInputElementById,
	getSelectElementById,
	loadSelectOption,
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
		borrowedBooks: IBorrowedBookDetails[],
		handleRowClick: (borrowed: IBorrowedBookDetails) => void
	): void {
		const table = document.querySelector(
			"#borrowed-table tbody"
		) as HTMLTableSectionElement;

		if (!table) {
			console.error("Borrowed table not found in the DOM.");
			return;
		}

		table.innerHTML = borrowedBooks
			.map(
				(borrowedBook) => `
                <tr>
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
                </tr>
            `
			)
			.join("");

		table.querySelectorAll("tr").forEach((row, index) => {
			row.addEventListener("click", () => handleRowClick(borrowedBooks[index]));
		});
	}

	setBorrowHandler(handle: (formData: any) => void): void {
		const form = this.getBorrowForm();
		if (!form) return;

		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = this.collectFormData();
			handle(formData);
			this.getBorrowDialog().close();
		});
	}

	bindCreateBorrowFormEvent(
		getBookOptions: () => ISelectOption[],
		getUserOptions: () => ISelectOption[]
	): void {
		const btnOpenFormCreate = getButtonById(
			BorrowedView.ELEMENT_IDS.BTN_TRIGGER_CREATE_BORROW
		);
		if (!btnOpenFormCreate) return;

		btnOpenFormCreate.addEventListener("click", () => {
			this.resetForm();
			this.populateSelectOptions(getUserOptions(), getBookOptions());
			this.handleShowCreateBorrowForm();
		});
	}
	handleShowCreateBorrowForm(): void {
		const dialog = this.getBorrowDialog();
		const form = this.getBorrowForm();
		if (form) {
			form.reset();
		}
		dialog.showModal();
	}

	bindCancelBorrowFormEvent(): void {
		const cancelDialogButton = getButtonById(
			BorrowedView.ELEMENT_IDS.BTN_CANCEL_BORROW_FORM
		);
		if (!cancelDialogButton) return;

		cancelDialogButton.addEventListener("click", () => {
			this.resetForm();
			this.getBorrowDialog().close();
		});
	}

	populateForm(borrowedBook: IBorrowedBookDetails): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;

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

		let statusSelect = this.getBorrowedStatusForm();
		if (statusSelect) {
			statusSelect.value = borrowedBook.status;
			if (borrowedBook.status === BorrowedBookStatus.BORROWING) {
				statusSelect.disabled = false;
			} else {
				statusSelect.disabled = true;
			}
		}

		getInputElementById(ELEMENTS_ID.FORM_BORROW_ID).value = borrowedBook.id;
		getInputElementById(ELEMENTS_ID.FORM_BORROW_DATE).value = dateToString(
			borrowedBook.borrowDay
		);

		this.getBorrowDialog().showModal();
	}

	private collectFormData(): BorrowedBook {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
		const statusValue = getSelectElementById(
			ELEMENTS_ID.FORM_BORROW_STATUS
		)?.value;
		const status = Object.values(BorrowedBookStatus).includes(
			statusValue as BorrowedBookStatus
		)
			? (statusValue as BorrowedBookStatus)
			: BorrowedBookStatus.BORROWING;
		return <BorrowedBook>{
			id: getInputElementById(ELEMENTS_ID.FORM_BORROW_ID).value,
			bookId: getSelectElementById(ELEMENTS_ID.FORM_BORROW_BOOK)?.value || "",
			userId: getSelectElementById(ELEMENTS_ID.FORM_BORROW_USER)?.value || "",
			status: status,
			borrowDay: stringToDate(
				getInputElementById(ELEMENTS_ID.FORM_BORROW_DATE).value
			),
		};
	}

	private resetForm(): void {
		const form = this.getBorrowForm();
		if (form) form.reset();
	}

	private populateSelectOptions(
		userOptions: ISelectOption[],
		bookOptions: ISelectOption[]
	): void {
		const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;

		const userSelect = getSelectElementById(ELEMENTS_ID.FORM_BORROW_USER);
		const bookSelect = getSelectElementById(ELEMENTS_ID.FORM_BORROW_BOOK);

		if (userSelect) {
			userSelect.innerHTML = fillOptions(userOptions, {
				id: "",
				displayString: "Select User",
			});
			userSelect.disabled = false;
		}

		if (bookSelect) {
			bookSelect.innerHTML = fillOptions(bookOptions, {
				id: "",
				displayString: "Select Book",
			});
			bookSelect.disabled = false;
		}

		let statusSelect = this.getBorrowedStatusForm();
		if (statusSelect) {
			statusSelect.disabled = true;
		}
	}

	private getBorrowedStatusForm(): HTMLSelectElement | null {
		const borrowStatus = getSelectElementById(
			BorrowedView.ELEMENT_IDS.FORM_BORROW_STATUS
		);
		if (borrowStatus) {
			borrowStatus.innerHTML = enumToOptions(BorrowedBookStatus);
		}
		return borrowStatus;
	}

	private getBorrowDialog(): HTMLDialogElement {
		return getDialogElementById(BorrowedView.ELEMENT_IDS.BORROW_DIALOG);
	}

	private getBorrowForm(): HTMLFormElement {
		return getFormElementById(BorrowedView.ELEMENT_IDS.BORROW_FORM);
	}
}
