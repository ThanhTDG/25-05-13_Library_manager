import { BookService } from "./services/book.service";
import { BookView } from "./views/book.view";
import { BookController } from "./controllers/book.controller";

const bookService = BookService.getInstance();
const bookView = new BookView();
const bookController = new BookController(bookService, bookView);