import { BookService } from "../services/book.service";
import { BorrowedBookService } from "../services/borrowedBook.sevice";
import { UserService } from "../services/user.service";
import { BookView } from "../views/book.view";
import { BorrowedView } from "../views/borrowed.view";
import { UserView } from "../views/user.view";
import { BookController } from "./book.controller";
import { BorrowedController } from "./borrowed.controller";
import { UserController } from "./user.controller";

export class LibraryController {
    private bookController: BookController
    private userController: UserController
    private borrowController: BorrowedController;
    constructor() {
        const bookService = BookService.getInstance();
        const bookView = new BookView();
        this.bookController = new BookController(bookService, bookView);

        const userService = UserService.getInstance();
        const userView = new UserView()
        this.userController = new UserController(userService, userView);

        const borrowService = BorrowedBookService.getInstance();
        const borrowView = new BorrowedView()
        this.borrowController = new BorrowedController(borrowService, borrowView, bookService, userService)

    }


}