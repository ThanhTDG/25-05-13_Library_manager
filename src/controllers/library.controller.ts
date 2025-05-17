import { BookService } from "../services/book.service";
import { BorrowedService } from "../services/borrowed.service";
import { UserService } from "../services/user.service";
import { Singleton } from "../singleton";
import { BookView } from "../views/book.view";
import { BorrowedView } from "../views/borrowed.view";
import { UserView } from "../views/user.view";
import { BookController } from "./book.controller";
import { BorrowedController } from "./borrowed.controller";
import { UserController } from "./user.controller";
@Singleton
export class LibraryController {
	private bookController: BookController;
	private userController: UserController;
	private borrowController: BorrowedController;

	constructor() {
		const bookService = BookService.getInstance();
		const bookView = new BookView();
		this.bookController = new BookController(bookService, bookView);

		const userService = UserService.getInstance();
		const userView = new UserView();
		this.userController = new UserController(userService, userView);

		const borrowService = BorrowedService.getInstance();
		const borrowView = new BorrowedView();
		this.borrowController = new BorrowedController(
			borrowService,
			borrowView,
			bookService,
			userService
		);

		this.initTabs();
	}

	public openTab(evt: Event, tabName: string): void {
		const tabContents = document.querySelectorAll(".tab-content");
		tabContents.forEach((content) => {
			content.classList.remove("active");
			content.setAttribute("style", "display: none;");
		});

		const tabLinks = document.querySelectorAll(".tab-link");
		tabLinks.forEach((link) => {
			link.classList.remove("active");
		});

		const selectedTab = document.getElementById(tabName);
		if (selectedTab) {
			selectedTab.classList.add("active");
			selectedTab.setAttribute("style", "display: block;");
		}
		(evt.currentTarget as HTMLElement).classList.add("active");
	}

	private initTabs(): void {
		document.addEventListener("DOMContentLoaded", () => {
			const firstActiveTabButton = document.querySelector(
				".tabs-nav .tab-link.active"
			) as HTMLElement | null;

			if (firstActiveTabButton) {
				const tabId = firstActiveTabButton.dataset.tab;
				if (tabId) {
					const firstTab = document.getElementById(tabId);
					if (firstTab) {
						firstTab.style.display = "block";
						firstTab.classList.add("active");
					}
				}
			} else {
				const firstTabButton = document.querySelector(
					".tabs-nav .tab-link"
				) as HTMLElement | null;
				if (firstTabButton) {
					firstTabButton.dispatchEvent(new Event("click"));
				}
			}
		});
	}
}
