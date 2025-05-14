import { IForm } from "../../interfaces/form.interface";
import { IBook } from "../../models/book.model";
import { createInputElement } from "../components/input.compoent";

export interface IBookForm {
    title: string;
    author: string;
    isbn: string;
    totalCopies: number;

}
export class BookForm implements IBookForm, IForm<IBookForm> {
    static formId: string = "book-form"
    private titleId: string;
    private authorId: string;
    private isbnId: string;
    private totalCopiesId: string
    constructor(
        public title: string = "",
        public author: string = "",
        public isbn: string = "",
        public totalCopies: number = 0,
    ) {
        let formId = BookForm.formId;
        this.titleId = `${formId}-title`
        this.authorId = `${formId}-author`
        this.isbnId = `${formId}-isbn`
        this.totalCopiesId = `${formId}-total-copies`

    }

    render(): void {
        const form = document.getElementById(BookForm.formId)
        if (form) {
            form.innerHTML = ''
        } else {
            return
        }
        let id = createInputElement("Mã", '')
        let label = createInputElement("Tựa đề:", this.titleId)
        let author = createInputElement("Tác giả:", this.authorId)
        let isbn = createInputElement("ISBN", this.isbnId)
        let totalCopies = createInputElement("Số bản:", this.totalCopiesId)
        form.appendChild(label)
        form.appendChild(author)
        form.appendChild(isbn)
        form.appendChild(totalCopies)
    }
    update(book: IBookForm): void {
        this.title = book.title;
        this.author = book.author;
        this.isbn = book.isbn;
        this.totalCopies = book.totalCopies;
    }

    setFormHandler(handle: (formData: IBookForm) => void): void {
        const form = document.getElementById(BookForm.formId)
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                this.title = (document.getElementById(this.title) as HTMLInputElement).value
                this.author = (document.getElementById(this.author) as HTMLInputElement).value
                this.isbn = (document.getElementById(this.isbnId) as HTMLInputElement).value
                this.totalCopies = (document.getElementById(this.totalCopiesId) as HTMLInputElement).valueAsNumber
                handle(this)
            })
        }
    }


}
