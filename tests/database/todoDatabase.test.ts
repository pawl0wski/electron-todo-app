import {TodoDatabase} from "../../database/todoDatabase";

test("Should be able to insert todo", async () => {
    // Create new database
    let db = new TodoDatabase();
    await db.openDB(":memory:")
    // Insert new item to it
    let id = await db.insertTodo("New todoItem");
    // Check if id is auto icremented number
    expect(typeof (id)).toBe("number");
    expect(id).toBeGreaterThan(0);
    // Get todo's from db and check if a new item exists
    db.getTodos().then((val) => {
        expect(val.length).toBeGreaterThan(0);
        expect(val[0]["content"]).toBe("New todoItem")
    });
})

test("Should be able to delete inserted todo", async () => {
    // Create new database
    let db = new TodoDatabase();
    await db.openDB(":memory:");
    // Insert new item to it
    let id = await db.insertTodo("New todoItem");
    // Check if id is auto icremented number
    expect(typeof (id)).toBe("number");
    expect(id).toBeGreaterThan(0);
    // Delete item from database
    db.deleteTodo(id);
    // Check if item is removed
    db.getTodos().then((table) => {
        expect(table.length).toBe(0);
    })
})