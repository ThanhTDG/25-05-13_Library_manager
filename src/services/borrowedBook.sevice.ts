import { BaseService } from "./base.serivce";
import { BorrowedBook } from "../models/borrowedBook.model";
import { borrowData } from "../data/borrow_data";


export class BorrowedBookService extends BaseService<BorrowedBook> {
    private static instance: BorrowedBookService;

    private constructor() {
        super("borrowedBooks");
        if (this.getAll().length === 0) {
            const initialData = borrowData.map(borrow => new BorrowedBook(borrow.id, borrow.bookId, borrow.userId));
            initialData.forEach(borrow => this.create(borrow));
        }
    }

    static getInstance(): BorrowedBookService {
        if (!BorrowedBookService.instance) {
            BorrowedBookService.instance = new BorrowedBookService();
        }
        return BorrowedBookService.instance;
    }

}