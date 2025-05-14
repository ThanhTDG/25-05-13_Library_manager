import { IBaseService } from "../interfaces/baseService.interface";

import { Book, IBook } from "../models/book.model";
import { readJsonFile, writeJsonFile } from "../utils/file.ulti";

export class BookService implements IBaseService<Book> {
    private static instance: BookService;
    private constructor() {
        this.loadFromFile()
    }
    static getInstance(): BookService {
        if (!BookService.instance) {
            BookService.instance = new BookService()
        }
        return BookService.instance
    }
    private books: Book[] = []

    private loadFromFile(): void {
        const data = readJsonFile<IBook[]>()
        this.books = data || []
    }
    private saveBooksToFile(): void {
        throw new Error("Browser can't write json file")
    }

    getAll(): Book[] {
        return this.books
    }
    create(book: Book): void {
        this.books.push(book)

    }
    getById(id: string): Book | undefined {
        return this.books.find(book => book.id === id)
    }
    update(id: string, updatedBook: Book): boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) return false;
        this.books[index] = updatedBook;
        return true;
    }
    delete(id: string): boolean {
        let index = this.books.findIndex(book => book.id === id)
        if (index === -1) {
            return false
        }
        this.books.splice(index, 1);
        return true
    }

}