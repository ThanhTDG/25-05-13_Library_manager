import * as fs from "fs";
import { booksData } from "./data/books_data";
export function readJsonFile<T>(): T | null {
	console.log(booksData);
	return booksData as T;
}

export function writeJsonFile<T>(filePath: string, data: T): void {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
	} catch (error) {}
}
export function generateId(): string {
	return Date.now().toString();
}

export function stringToDate(dateString: string): Date {
	return new Date(dateString);
}

export function dateToString(date: Date): string {
	if (!date) return "-";
	if (typeof date === "string") {
		date = new Date(date);
	}
	console.log(date);
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new Error("Invalid date provided to dateToString");
	}
	return date.toISOString().slice(0, 16);
}

export function saveToLocalStorage(key: string, data: any): void {
	try {
		const jsonData = JSON.stringify(data);
		localStorage.setItem(key, jsonData);
	} catch (error) {
		console.error("Failed to save to localStorage:", error);
	}
}

export function loadFromLocalStorage<T>(key: string): T | null {
	try {
		const jsonData = localStorage.getItem(key);
		return jsonData ? (JSON.parse(jsonData) as T) : null;
	} catch (error) {
		console.error("Failed to load from localStorage:", error);
		return null;
	}
}
