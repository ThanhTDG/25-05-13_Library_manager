import { IBaseService } from "../interfaces/baseService.interface";
import { User } from "../models/user.model";


export class UserService implements IBaseService<User> {
    private users: User[] = []
    private static instance: UserService;
    private constructor() {
    
    }
    static getInstance(): UserService {
        if(!UserService.instance){
            UserService.instance = new UserService()
        }
        return UserService.instance
    }
    getAll(): User[] {
        return this.users
    }
    create(user: User): void {
        this.users.push(user)
    }
    getById(id: string): User | undefined {
        return this.users.find(user => user.id === id)
    }
    update(id: string, updatedUser: User): boolean {
        let index = this.users.findIndex(user => user.id === id)
        if (index === -1)
            return false;
        this.users[index] = updatedUser;
        return true
    }
    delete(id: string): boolean {
        let index = this.users.findIndex(user => user.id === id)
        if (index === -1) {
            return false
        }
        this.users.splice(index, 1);
        return true
    }

}