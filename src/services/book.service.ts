import { IBaseService } from "../interfaces/baseService.interface";

import { Book } from "../models/book.model";

export class BookService implements IBaseService<Book> {
    private static instance: BookService;
    private constructor() {
    }
    static getInstance(): BookService {
        if (!BookService.instance) {
            BookService.instance = new BookService()
        }
        return BookService.instance
    }

    private books: Book[] = [
        new Book('1', 'Clean Code', 'Robert C. Martin', '2008', 5),
        new Book('2', 'The Pragmatic Programmer', 'Andrew Hunt', '1999', 3),
        new Book('3', 'JavaScript: The Good Parts', 'Douglas Crockford', '2008', 4),
        new Book('4', 'You Don’t Know JS', 'Kyle Simpson', '2015', 6),
        new Book('5', 'TypeScript Quickly', 'Yakov Fain', '2020', 2),
        new Book('6', 'Refactoring', 'Martin Fowler', '2012', 4),
        new Book('7', 'Design Patterns', 'Erich Gamma', '1994', 5),
        new Book('8', 'Domain-Driven Design', 'Eric Evans', '2003', 3),
        new Book('9', 'Effective JavaScript', 'David Herman', '2012', 1),
        new Book('10', 'Introduction to Algorithms', 'Thomas H. Cormen', '2009', 2),
    ]
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
        let index = this.books.findIndex(book => book.id === id)
        if (index === -1)
            return false;
        this.books[index] = updatedBook;
        return true
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