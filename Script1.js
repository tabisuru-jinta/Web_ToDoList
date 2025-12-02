// JavaScript source code
console.log("hello world");

const addbtn = document.getElementById("addbtn");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addbtn.addEventListener("click", addTask);

taskList.addEventListener("click", e => {
    const item = e.target.closest("li");
    if (!item) return;
    if (e.target.classList.contains("delete")) {
        item.remove();
    } else {
        item.classList.toggle("done");
    }

});

function addTask() {
    console.log("add");
    const text = input.value.trim();
    if (text == "") return;
    const li = document.createElement("li");
    const delbtn = document.createElement("button");
    li.textContent = text;
    li.classList.add("list");
    delbtn.textContent = "delete";
    delbtn.classList.add("delete");
    li.appendChild(delbtn);
    taskList.appendChild(li);
    input.value = "";
    SaveTasks();
}
function SaveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function LoadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (!data) return;
    data.forEach(task => {
        const li = document.createElement("li");
        const delbtn = document.createElement("button");
        li.textContent = task.text;
        if (task.done) li.classList.add("done");
        delbtn.textContent = "delete";
        delbtn.classList.add("delete");
        li.appendChild(delbtn);
        taskList.appendChild(li);
    });
}

LoadTasks();