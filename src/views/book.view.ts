import { BookController } from "../controllers/book.controller";
import { CreatedBookForm } from "../forms/createdBook.form";
import { Ibook as IBook } from "../models/book.model";

export class BookView {

    setAddBookHandler(handle: (formData: CreatedBookForm) => void): void {
        const form = document.getElementById("addBookForm") as HTMLFormElement
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const title = ((document.getElementById("title")) as HTMLInputElement).value
                const author = ((document.getElementById("author")) as HTMLInputElement).value
                const year = ((document.getElementById("year")) as HTMLInputElement).value
                const formData: CreatedBookForm = { title, author, year }
                handle(formData)
            })
        }
    }

    renderBooks(bookList: IBook[]): void {
        const tableElement = document.getElementById('bookTable');
        if (!tableElement)
            return;
        tableElement.innerHTML = ''
        const headerRow = document.createElement('tr');
        const headers = ["ID", "Title", "Author", "Year"]
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        bookList.forEach(book => {
            const row = document.createElement('tr')

            const idCell = document.createElement('td');
            idCell.textContent = book.id;
            row.appendChild(idCell)

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell)

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell)

            const yearCell = document.createElement('td');
            yearCell.textContent = book.availableCopies.toString();
            row.appendChild(yearCell)

            tableElement.appendChild(row);

        })
    }
}