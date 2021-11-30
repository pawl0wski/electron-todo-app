import {app, BrowserWindow} from "electron";

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    })

    mainWindow.loadFile('html/index.html')

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    })
}

app.whenReady().then(() => {
    createMainWindow()
})