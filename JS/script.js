var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");
var filter = document.querySelector(".filter");

addBtn.addEventListener('click', addItem);
filter.addEventListener('click', filterTodo);


function addItem(e) {
    e.preventDefault();
    var itemContent = input.value;
    input.value = "";
    var item = document.createElement("li");
    var itemText = document.createElement("span");
    var checkbox = document.createElement("input");
    checkbox.setAttribute('type', 'checkbox');
    checkbox.onclick = finished;
    var trash = document.createElement("button");

    itemText.textContent = itemContent;
    trash.textContent = "x";

    item.appendChild(checkbox);
    item.appendChild(itemText);
    item.appendChild(trash);
    list.appendChild(item);

    trash.onclick = function() {
        list.removeChild(item);
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
    console.log(filterOption);
    var todos = list.children;

    for (i = 0; i < todos.length; i++) {

        switch (filterOption) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains("finished")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "active":
                if (todos[i].classList.contains("finished")) {
                    todos[i].style.display = "none";
                } else {
                    todos[i].style.display = "flex";
                }
                break;
        }
    }
}

function getValue() {
    var value;
    var obj = document.getElementsByName("option")
    for (var i = 0; i < obj.length; i++) { //遍历Radio 
        if (obj[i].checked) {
            value = obj[i].value;
        }
    }
    return value;

}