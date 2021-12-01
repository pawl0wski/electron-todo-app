import { ipcRenderer } from "electron";

function attachElementsToIpcEvents() {
    document.getElementById("add-todo-form").addEventListener("submit", (event) => {
        event.preventDefault();
        ipcRenderer.send("add-todo", (<HTMLInputElement>document.getElementById("todo-input")).value);
        (<HTMLInputElement>document.getElementById("todo-input")).value = "";
    });
}

function reciveIpcEvents() {
    ipcRenderer.on("refresh-todo", (event, todoRecive: string) => {
        console.log(todoRecive);
        let todoList : { id: any; content: any; }[] = JSON.parse(todoRecive);
        document.getElementById("todo-list").innerHTML = "";
        if (todoList.length > 0){
            todoList.forEach((todo: { id: any; content: any; }) => {
                document.getElementById("todo-list").innerHTML += `<li class="list-group-item list-group-item-action" id="todo-${todo["id"]}">${todo["content"]}</li>`
            });
        }
    })
}

(() => {
    attachElementsToIpcEvents();
    reciveIpcEvents();
})();