import { BrowserWindow, ipcMain } from "electron";
import {TodoDatabase} from "../database/todoDatabase";

export class MainWindowSignals {
    window: BrowserWindow;
    todoDatabase: TodoDatabase;

    constructor(window: BrowserWindow, todoDatabase: TodoDatabase) {
        this.window = window;
        this.todoDatabase = todoDatabase;
    }

    async refreshTodo(){
        let todoList = await this.todoDatabase.getTodos();
        this.window.webContents.send("refresh-todo", JSON.stringify(todoList));
    }

    receiveSignals() {
        ipcMain.on("add-todo", async (event, todo) => {
            await this.todoDatabase.insertTodo(todo);
            await this.refreshTodo();
        });

        ipcMain.on("delete-todo", async (event, todoId) => {
            this.todoDatabase.deleteTodo(todoId);
            await this.refreshTodo();
        })
    }
}
