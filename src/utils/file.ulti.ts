
import * as fs from "fs";
import { booksData } from "../data/books_data";
export function readJsonFile<T>(): T | null {
    console.log(booksData)
    return booksData as T
}

export function writeJsonFile<T>(filePath: string, data: T): void {

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    } catch (error) {
        // consolel
    }
}