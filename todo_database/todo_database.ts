import { open, Database } from "sqlite";
import * as sqlite3 from "sqlite3";

export class TodoDatabase {
    db: Database;
    constructor() {

    }

    async openDB(dbPath: string) {
        this.db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        await this._createTable();
    }

    async _createTable() {
        await this.db.run(
            "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY, content TEXT)"
        );
    }

    async insertTodo(content: string): Promise<number> {
        let runResult = await this.db.run(
            "INSERT INTO todo (content) VALUES (?)",
            [content],
        )
        return runResult.lastID;
    }

    deleteTodo(id: number) {
        this.db.run(
            "DELETE FROM todo WHERE id = ?",
            [id],
        );
    }

    async getTodos(): Promise<{ id: any; content: any; }[]> {
        let todoList: { id: any; content: any; }[] = [];

        await this.db.each("SELECT * FROM todo;", (e, row) => {
            todoList.push({ id: row["id"], content: row["content"] });
        });

        return todoList;
    }
}
