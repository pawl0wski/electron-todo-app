import {app, BrowserWindow} from "electron";
import { MainWindowSignals } from "./main_window_signals/main_window_signals";
import { TodoDatabase } from "./todo_database/todo_database";

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('html/index.html');

    let db = new TodoDatabase();
    db.openDB("db.sqlite3")

    let mainWindowSignals = new MainWindowSignals(mainWindow, db);
    mainWindowSignals.reciveSignals();

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        mainWindowSignals.refreshTodo()
    })
}

app.whenReady().then(() => {
    createMainWindow();
})