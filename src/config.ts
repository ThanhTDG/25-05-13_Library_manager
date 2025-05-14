import * as path from "path";

export class Config {
    static bookJsonPath: string = path.resolve(process.cwd(), "src/data/books.json");
}