import { IBook as IBook } from "../models/book.model";
import { getButtonById, getDialogElementById, getFormElementById, getInputElementById } from "./utils.view";

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
    }
    static readonly ELEMENTS_CLASS = {
        BTN_DELETE_BOOK: "btn-delete-book",
    }
    getUserDialog(): HTMLDialogElement {
        return getDialogElementById(BookView.ELEMENT_IDS.BOOK_DIALOG);
    }
    getUserForm(): HTMLFormElement {
        return getFormElementById(BookView.ELEMENT_IDS.BOOK_FORM)
    }


    setBookHandler(handle: (formData: IBook) => void): void {
        const ELEMENTS_ID = BookView.ELEMENT_IDS;
        const dialog = this.getUserDialog();
        const form = this.getUserForm();
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                let id = getInputElementById(ELEMENTS_ID.FORM_ID).value;
                const title = getInputElementById(ELEMENTS_ID.FORM_TITLE).value;
                const author = getInputElementById(ELEMENTS_ID.FORM_AUTHOR).value;
                const isbn = getInputElementById(ELEMENTS_ID.FORM_ISBN).value;
                const totalCopies = getInputElementById(ELEMENTS_ID.FORM_TOTAL_COPIES).valueAsNumber;
                let availableCopies = getInputElementById(ELEMENTS_ID.FORM_AVAILABLE_COPIES).valueAsNumber;
                if (!id || id.trim() === "") {
                    availableCopies = totalCopies;
                    id = Date.now().toString();
                }
                if (availableCopies > totalCopies) {
                    alert("Available copies cannot be greater than total copies");
                    return;
                }

                const formData: IBook = {
                    id,
                    title,
                    author,
                    isbn,
                    availableCopies,
                    totalCopies,
                }
                handle(formData);
                dialog.close();
            });
        }
    }
    handleShowCreateBookForm(): void {
        const ELEMENTS_ID = BookView.ELEMENT_IDS;
        const dialog = this.getUserDialog();
        const form = this.getUserForm();
        if (form) {
            form.reset();
        }
        dialog.showModal();
    }
    bindCreateBookFormEvent(): void {
        const ELEMENTS_ID = BookView.ELEMENT_IDS;
        const btnOpenFormCreate = getButtonById(ELEMENTS_ID.BTN_TRIGGER_CREATE_BOOK);
        btnOpenFormCreate.addEventListener('click', () => {
            this.handleShowCreateBookForm();
        });
    }
    bindCancelBookFormEvent(): void {
        const ELEMENTS_ID = BookView.ELEMENT_IDS;
        const cancelDialogButton = getButtonById(ELEMENTS_ID.BTN_CANCEL_BOOK_FORM);
        const form = this.getUserForm();
        if (cancelDialogButton) {
            cancelDialogButton.addEventListener('click', () => {
                const dialog = this.getUserDialog();
                if (form) {
                    form.reset();
                }
                dialog.close();
            });
        }
    }


    populateForm(book: IBook): void {
        const ELEMENTS_ID = BookView.ELEMENT_IDS;
        const dialog = this.getUserDialog();
        getInputElementById(ELEMENTS_ID.FORM_ID).value = book.id;
        getInputElementById(ELEMENTS_ID.FORM_TITLE).value = book.title;
        getInputElementById(ELEMENTS_ID.FORM_AUTHOR).value = book.author;
        getInputElementById(ELEMENTS_ID.FORM_ISBN).value = book.isbn;
        getInputElementById(ELEMENTS_ID.FORM_AVAILABLE_COPIES).valueAsNumber = book.availableCopies;
        getInputElementById(ELEMENTS_ID.FORM_TOTAL_COPIES).valueAsNumber = book.totalCopies;
        dialog.showModal();
    }

    renderBooks(bookList: IBook[], onRowCLick: (book: IBook) => void, onDeleteClick: (bookId: string) => void): void {
        const ELEMENTS_CLASS = BookView.ELEMENTS_CLASS;
        const tableBody = document.querySelector("#book-table tbody");
        if (!tableBody) return;
        tableBody.innerHTML = "";

        bookList.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.availableCopies}</td>
                <td>${book.totalCopies}</td>
                <td>
                    <button class="${ELEMENTS_CLASS.BTN_DELETE_BOOK}" data-id="${book.id}">Delete</button>
                </td>
            `;
            const deleteButton = row.querySelector(`.${ELEMENTS_CLASS.BTN_DELETE_BOOK}`) as HTMLButtonElement;
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                onDeleteClick(book.id);
            });
            row.addEventListener('click', () => onRowCLick(book))
            tableBody.appendChild(row);
        });
    }

}