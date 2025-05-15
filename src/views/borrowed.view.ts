import { IBorrowedBookDetails } from "../interfaces/borrowedBook.interface";
import { ISelectOption } from "../interfaces/selelect.interface";
import { BorrowableBook } from "../models/book.model";
import { dateToString } from "../utils";
import { getButtonById, getDialogElementById, getFormElementById, getInputElementById, populateDropdowns } from "./utils.view";



export class BorrowedView {
    static readonly ELEMENT_IDS = {
        BORROW_DIALOG: "dialog-borrow",
        BORROW_FORM: "form-borrow",
        FORM_BORROW_ID: "form-borrow-id",
        FORM_BORROW_BOOK_ID: "form-borrow-book-id",
        FORM_BORROW_USER_ID: "form-borrow-user-id",
        FORM_BORROW_DATE: "form-borrow-date",
        BTN_TRIGGER_CREATE_BORROW: "btn-trigger-create-borrow",
        BTN_SAVE_BORROW_FORM: "btn-save-form-borrow",
        BTN_CANCEL_BORROW_FORM: "btn-cancel-form-borrow",
    };

    renderBorrowedBooks(borrowedBooks: Array<IBorrowedBookDetails>, handleRowClick: (borrowed: IBorrowedBookDetails) => void): void {
        const table = document.querySelector("#borrowed-table tbody") as HTMLTableSectionElement;
        if (!table) {
            console.error("Borrowed table not found in the DOM.");
            return;
        }
        console.log(borrowedBooks)
        table.innerHTML = "";

        borrowedBooks.forEach((borrowedBook) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${borrowedBook.id}</td>
                <td>${borrowedBook.bookTitle}</td>
                <td>${borrowedBook.userName}</td>
                <td>${dateToString(borrowedBook.borrowDay)}</td>
                <td>${borrowedBook.updatedDate ? dateToString(borrowedBook.updatedDate) : "-"}</td>
                <td>${borrowedBook.status}</td>
            `;
            row.addEventListener('click', () => handleRowClick(borrowedBook))
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
                const bookId = getInputElementById(ELEMENTS_ID.FORM_BORROW_BOOK_ID).value;
                const userId = getInputElementById(ELEMENTS_ID.FORM_BORROW_USER_ID).value;
                const borrowDate = getInputElementById(ELEMENTS_ID.FORM_BORROW_DATE).value;

                const formData = {
                    id,
                    bookId,
                    userId,
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

    bindCreateBorrowFormEvent(userOptions: ISelectOption[], bookOptions: ISelectOption[]): void {
        const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
        const btnOpenFormCreate = getButtonById(ELEMENTS_ID.BTN_TRIGGER_CREATE_BORROW);
        btnOpenFormCreate.addEventListener("click", () => {
            const dialog = this.getBorrowDialog();
            const userInput = getInputElementById(ELEMENTS_ID.FORM_BORROW_USER_ID);
            const bookInput = getInputElementById(ELEMENTS_ID.FORM_BORROW_BOOK_ID);
            populateDropdowns(
                userOptions,
                ELEMENTS_ID.FORM_BORROW_USER_ID
            );
            populateDropdowns(
                bookOptions,
                ELEMENTS_ID.FORM_BORROW_BOOK_ID
            );

            this.handleShowCreateBorrowForm();
        });
    }

    bindCancelBorrowFormEvent(): void {
        const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
        const cancelDialogButton = getButtonById(ELEMENTS_ID.BTN_CANCEL_BORROW_FORM);
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

    populateFormSearchText(userId: string, bookId: string): void {
        const userInput = getInputElementById(BorrowedView.ELEMENT_IDS.FORM_BORROW_USER_ID);
        const bookInput = getInputElementById(BorrowedView.ELEMENT_IDS.FORM_BORROW_BOOK_ID);

        if (userInput) {
            userInput.value = userId;
        }

        if (bookInput) {
            bookInput.value = bookId;
        }
    }

    populateForm(borrowedBook: IBorrowedBookDetails): void {
        const ELEMENTS_ID = BorrowedView.ELEMENT_IDS;
        const dialog = this.getBorrowDialog();

        const userInput = getInputElementById(ELEMENTS_ID.FORM_BORROW_USER_ID);
        const bookInput = getInputElementById(ELEMENTS_ID.FORM_BORROW_BOOK_ID);

        getInputElementById(ELEMENTS_ID.FORM_BORROW_ID).value = borrowedBook.id;

        populateDropdowns(
            [{ id: borrowedBook.userId, displayString: borrowedBook.userName }],
            ELEMENTS_ID.FORM_BORROW_USER_ID
        );
        userInput.value = borrowedBook.userId;

        populateDropdowns(
            [{ id: borrowedBook.bookId, displayString: borrowedBook.bookTitle }],
            ELEMENTS_ID.FORM_BORROW_BOOK_ID
        );
        bookInput.value = borrowedBook.bookId;

        getInputElementById(ELEMENTS_ID.FORM_BORROW_DATE).value = dateToString(borrowedBook.borrowDay);

        dialog.showModal();
    }


    getBorrowDialog(): HTMLDialogElement {
        return getDialogElementById(BorrowedView.ELEMENT_IDS.BORROW_DIALOG);
    }

    getBorrowForm(): HTMLFormElement {
        return getFormElementById(BorrowedView.ELEMENT_IDS.BORROW_FORM);
    }
}