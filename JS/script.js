var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");
var filter = document.querySelector(".filter");
var clear = document.querySelector(".clear")

addBtn.addEventListener('click', addItem);
filter.addEventListener('click', filterTodo);
clear.addEventListener('click', clearAll);

function addItem(e) {
    e.preventDefault();
    var itemContent = input.value.trim();
    input.value = "";
    if (itemContent !== null && itemContent !== "" && itemContent !== undefined) {
        var item = document.createElement("li");
        var itemText = document.createElement("span");
        var checkbox = document.createElement("input");
        checkbox.setAttribute('type', 'checkbox');
        checkbox.onclick = finished;
        var trash = document.createElement("button");

        itemText.textContent = itemContent;
        trash.innerHTML = '<i class="fas fa-trash"></i>';

        item.appendChild(checkbox);
        item.appendChild(itemText);
        item.appendChild(trash);
        list.appendChild(item);

        trash.onclick = function() {
            list.removeChild(item);
        }
    }
    filterTodo();
}

function finished(e) {
    var checked = e.target;
    var todo = checked.parentElement;
    todo.classList.toggle("finished");
    filterTodo();
}

function filterTodo() {
    var filterOption = getValue();
    var todos = list.children;

    for (todo of todos) {
        switch (filterOption) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("finished")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "active":
                if (todo.classList.contains("finished")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    }
}

function getValue() {
    var value;
    var radios = document.getElementsByName("option");
    for (radio of radios) {
        if (radio.checked) {
            value = radio.value;
        }
    }
    return value;
}

function clearAll() {
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }
}