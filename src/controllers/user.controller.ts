import { User, IUser } from "../models/user.model";
import { UserService } from "../services/user.service";
import { Singleton } from "../singleton";
import { UserView } from "../views/user.view";

@Singleton
export class UserController {
	private userService: UserService;
	private userView: UserView;

	constructor(userService: UserService, userView: UserView) {
		this.userService = userService;
		this.userView = userView;

		this.init();
	}

	private init(): void {
		this.renderUsers();
		this.userView.bindCreateUserFormEvent();
		this.userView.bindCancelUserFormEvent();
		this.userView.setAddUserHandler(this.handleSaveUser.bind(this));
	}

	private renderUsers(): void {
		const users = this.userService.getAll();
		console.log(users);
		this.userView.renderUsers(
			users,
			this.handleRowClick.bind(this),
			this.handleDeleteUser.bind(this)
		);
	}
	private handleRowClick(user: User): void {
		this.userView.populateForm(user);
	}

	private handleSaveUser(user: User): void {
		const existingUser = this.userService.getById(user.id);
		if (existingUser) {
			this.userService.update(user.id, user);
		} else {
			this.userService.create(user);
		}
		this.renderUsers();
	}

	private handleDeleteUser(userId: string): void {
		const isDeleted = this.userService.delete(userId);
		if (isDeleted) {
			this.renderUsers();
		} else {
			alert("Failed to delete the user.");
		}
	}
}
