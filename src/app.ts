import { BookService } from "./services/book.service";
import { BookView } from "./views/book.view";
import { BookController } from "./controllers/book.controller";
import { LibraryController } from "./controllers/library.controller";
import { UserView } from "./views/user.view";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

export default function main() {
	const libraryController = new LibraryController();
	(window as any).openTab = libraryController.openTab.bind(libraryController);
}
