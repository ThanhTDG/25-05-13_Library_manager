import { BookController } from "./controllers/book.controller";
import { BookService } from "./services/book.service";
import { BookView } from "./views/book.view";

const bookService = BookService.getInstance();
const bookView = new BookView();
const bookController = new BookController(bookService, bookView);