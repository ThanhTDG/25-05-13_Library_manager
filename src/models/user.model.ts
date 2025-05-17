import { generateId } from "../utils";

export interface IUser {
	id: string;
	name: string;
	dayCreated: Date;
}

export class User implements IUser {
	public name: string;
	public id: string;
	public dayCreated: Date;

	constructor(id: string, name: string, dateCreated: Date) {
		this.id = id;
		this.name = name;
		this.dayCreated = dateCreated;
	}
	static formIUser(user: Partial<IUser>): User {
		const id = user.id || generateId();
		const name = user.name || "Unknown";
		const dayCreated = user.dayCreated ? new Date(user.dayCreated) : new Date();
		return new User(id, name, dayCreated);
	}
	static fromJson(json: any): User {
		return new User(json.id, json.name, new Date(json.dayCreated));
	}
}
