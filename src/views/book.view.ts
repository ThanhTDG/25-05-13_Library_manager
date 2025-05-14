import { BookController } from "../controllers/book.controller";
import { BookForm } from "./forms/createdBook.form";
import { IBook as IBook } from "../models/book.model";

export class BookView {

    setBookHandler(handle: (formData: IBook) => void): void {
        const dialog = document.getElementById("book-dialog") as HTMLDialogElement;
        const form = document.getElementById("book-form") as HTMLFormElement;
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const id = (document.getElementById("id") as HTMLInputElement).value || Date.now().toString();
                const title = (document.getElementById("title") as HTMLInputElement).value;
                const author = (document.getElementById("author") as HTMLInputElement).value;
                const isbn = (document.getElementById("isbn") as HTMLInputElement).value;
                const availableCopies = (document.getElementById("available-copies") as HTMLInputElement).valueAsNumber;
                const totalCopies = (document.getElementById("total-copies") as HTMLInputElement).valueAsNumber
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

    populateForm(book: IBook): void {
        const dialog = document.getElementById('book-dialog') as HTMLDialogElement;
        (document.getElementById("id") as HTMLInputElement).value = book.id;
        (document.getElementById("title") as HTMLInputElement).value = book.title;
        (document.getElementById("author") as HTMLInputElement).value = book.author;
        (document.getElementById("isbn") as HTMLInputElement).value = book.isbn;
        (document.getElementById("available-copies") as HTMLInputElement).value = book.availableCopies.toString();
        (document.getElementById("total-copies") as HTMLInputElement).value = book.totalCopies.toString();
        dialog.showModal();
    }

    renderBooks(bookList: IBook[], onRowCLick: (book: IBook) => void, onDeleteClick: (bookId: string) => void): void {
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
                    <button class="delete-button" data-id="${book.id}">Delete</button>
                </td>
            `;
            const deleteButton = row.querySelector(".delete-button") as HTMLButtonElement;
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                onDeleteClick(book.id);
            });
            row.addEventListener('click', () => onRowCLick(book))
            tableBody.appendChild(row);
        });
    }
}