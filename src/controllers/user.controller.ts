import { User,IUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserView } from '../views/user.view';

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
        this.userView.renderUsers(users, this.handleRowClick.bind(this), this.handleDeleteUser.bind(this));
    }

    private handleSaveUser(newUser: User): void {
        const existingUser = this.userService.getById(newUser.id);
        if (existingUser) {
            this.userService.update(newUser.id, newUser);
        } else {
            this.userService.create(newUser);
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