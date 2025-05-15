import { IBook as IBook } from "../models/book.model";

export class BookView {
    static readonly ELEMENTS_ID = {
        BOOK_DIALOG: "book-dialog",
        BOOK_FORM: "book-form",
        FORM_ID: "form-book-id",
        FORM_TITLE: "form-book-title",
        FORM_AUTHOR: "form-book-author",
        FORM_ISBN: "form-book-isbn",
        FORM_AVAILABLE_COPIES: "form-book-available-copies",
        FORM_TOTAL_COPIES: "form-book-total-copies",
        BTN_TRIGGER_CREATE_BOOK: "btn-trigger-create-book",
        BTN_SAVE_BOOK_FORM: "btn-save-book-form",
        BTN_CANCEL_BOOK_FORM: "btn-cancel-book-form",
    } 
    static readonly ELEMENTS_CLASS = {
        BTN_DELETE_BOOK: "delete-book-button",
    }
    getBookDialog(): HTMLDialogElement {
        const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const dialog = document.getElementById(ELEMENTS_ID.BOOK_DIALOG) as HTMLDialogElement;
        if (!dialog) {
            throw new Error("Dialog not found");
        }
        return dialog;
    }
    getBookForm(): HTMLFormElement {
        const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const form = document.getElementById(ELEMENTS_ID.BOOK_FORM) as HTMLFormElement;
        if (!form) {
            throw new Error("Form not found");
        }
        return form;
    }
    getInputElementById(id: string): HTMLInputElement {
        return document.getElementById(id) as HTMLInputElement;
    }
    setBookHandler(handle: (formData: IBook) => void): void {
        const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const dialog = this.getBookDialog();
        const form = this.getBookForm();
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                let id = this.getInputElementById(ELEMENTS_ID.FORM_ID).value;
                const title = this.getInputElementById(ELEMENTS_ID.FORM_TITLE).value;
                const author = this.getInputElementById(ELEMENTS_ID.FORM_AUTHOR).value;
                const isbn = this.getInputElementById(ELEMENTS_ID.FORM_ISBN).value;
                const totalCopies = this.getInputElementById(ELEMENTS_ID.FORM_TOTAL_COPIES).valueAsNumber;
                let availableCopies = this.getInputElementById(ELEMENTS_ID.FORM_AVAILABLE_COPIES).valueAsNumber;
                if(!id || id.trim() === ""){
                    availableCopies = totalCopies;
                    id = Date.now().toString();
                }
                if(availableCopies > totalCopies){
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
         const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const dialog = this.getBookDialog();
        const form = this.getBookForm();
        if (form) {
            form.reset();
        }
        dialog.showModal();
    }
    bindCreateBookFormEvent(): void {
         const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const btnOpenFormCreate = document.getElementById(ELEMENTS_ID.BTN_TRIGGER_CREATE_BOOK) as HTMLButtonElement;
        btnOpenFormCreate.addEventListener('click', () => {
            this.handleShowCreateBookForm();
        });
    }
    bindCancelBookFormEvent(): void{
        const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const cancelDialogButton = document.getElementById(ELEMENTS_ID.BTN_CANCEL_BOOK_FORM) as HTMLButtonElement;
        const form = this.getBookForm();
        if(cancelDialogButton){
            cancelDialogButton.addEventListener('click', () => {
                const dialog = this.getBookDialog();
                if(form){
                    form.reset();
                }
                dialog.close();
            });
        }
    }


    populateForm(book: IBook): void {
        const ELEMENTS_ID = BookView.ELEMENTS_ID;
        const dialog = this.getBookDialog();
        this.getInputElementById(ELEMENTS_ID.FORM_ID).value = book.id;
        this.getInputElementById(ELEMENTS_ID.FORM_TITLE).value = book.title;
        this.getInputElementById(ELEMENTS_ID.FORM_AUTHOR).value = book.author;
        this.getInputElementById(ELEMENTS_ID.FORM_ISBN).value = book.isbn;
        this.getInputElementById(ELEMENTS_ID.FORM_AVAILABLE_COPIES).valueAsNumber = book.availableCopies;
        this.getInputElementById(ELEMENTS_ID.FORM_TOTAL_COPIES).valueAsNumber = book.totalCopies;
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