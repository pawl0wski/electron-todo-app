import {app, BrowserWindow} from "electron";
import { MainWindowSignals } from "./mainWindowSignals/mainWindowSignals";
import {TodoDatabase} from "./database/todoDatabase";

async function createMainWindow()  {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    await mainWindow.loadFile('html/index.html');

    let db = new TodoDatabase();
    await db.openDB("db.sqlite3")

    let mainWindowSignals = new MainWindowSignals(mainWindow, db);
    mainWindowSignals.receiveSignals();

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        mainWindowSignals.refreshTodo()
    })
}

app.whenReady().then(() => {
     createMainWindow();
})