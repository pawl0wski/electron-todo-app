import { ipcRenderer } from "electron";

function attachElementsToIpcEvents() {
    console.log("a")
    document.getElementById("add-todo-form").addEventListener("submit", (event) => {
        event.preventDefault();
        ipcRenderer.send("add-todo", (<HTMLInputElement>document.getElementById("todo-input")).value);
        (<HTMLInputElement>document.getElementById("todo-input")).value = "";
    });
}

function receiveIpcEvents() {
    let todoList : { id: any; content: any; }[] = [];
    ipcRenderer.on("refresh-todo", (event, todoRecive: string) => {
        todoList = JSON.parse(todoRecive);
        document.getElementById("todo-list").innerHTML = "";
        if (todoList.length > 0){
            todoList.forEach((todo: { id: any; content: any; }) => {
                document.getElementById("todo-list").innerHTML += `<li class="todo-list-item list-group-item list-group-item-action" id="todo-${todo["id"]}">${todo["content"]}</li>`
            });
        }
        for (let i = 0; i < todoList.length; i++) {
            document.getElementById(`todo-${todoList[i]["id"]}`).addEventListener("click", (ev) => {
                let target: any = ev.target;
                ipcRenderer.send("delete-todo", parseInt(target.id.split("-")[1]))
            });
        }
    })
}

window.onload = () => {
    attachElementsToIpcEvents();
    receiveIpcEvents();
}

