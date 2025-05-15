import { BaseService } from "./base.serivce";
import { User } from "../models/user.model";
import { usersData } from "../data/users_data";

export class UserService extends BaseService<User> {
    private static instance: UserService;

    private constructor() {
        super("users");
        if (this.getAll().length === 0) {
            usersData.forEach(user => this.create(user));
        }
    }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}