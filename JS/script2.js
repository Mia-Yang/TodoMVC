var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");
var filter = document.querySelector(".filter");
var clear = document.querySelector(".clear");

var allList = [];

addBtn.addEventListener('click', addTodo);
clear.addEventListener('click', clearAll);
filter.addEventListener('click', filterTodo);

function addTodo(e) {
    e.preventDefault();
    var itemContent = input.value.trim();
    input.value = "";
    var newTodo = {
        text: itemContent,
        status: "unfinished",
        id: allList.length,
    }
    if (itemContent.length) {
        allList.push(newTodo);
        filterTodo();
    }
}

function changeStatus(id) {
    if (allList[id].status === "unfinished") {
        allList[id].status = "finished";
    } else {
        allList[id].status = "unfinished";
    }
    filterTodo();
}

function filterTodo() {
    var filterTag = getFilterTag();

    var activeList = [];
    var completedList = [];

    completedList = allList.filter(item => item.status === "finished");
    activeList = allList.filter(item => item.status === "unfinished");

    switch (filterTag) {
        case "all":
            renderList(allList);
            break;
        case "completed":
            renderList(completedList);
            break;
        case "active":
            renderList(activeList);
            break;
    }
}

function getFilterTag() {
    var value;
    var radios = document.getElementsByName("filter-option");
    for (radio of radios) {
        if (radio.checked) {
            value = radio.value;
        }
    }
    return value;
}

function removeTodo(id) {
    allList.splice(id, 1);
    updateId(allList);
    filterTodo();
}

function updateId() {
    for (var i = 0; i < allList.length; i++) {
        allList[i].id = i;
    }
}

function clearAll() {
    allList = [];
    renderList(allList);
}

function renderList(data) {
    var listHtml = '';
    for (var i = 0; i < data.length; i++) {
        var checkedOrNot = data[i].status === "finished" ? "checked" : "";
        listHtml +=
            '<li class=' + data[i].status +
            '><input type="checkbox" onclick="changeStatus(' + data[i].id + ')"' + checkedOrNot +
            '><span>' + data[i].text +
            '</span><button onclick="removeTodo(' + data[i].id + ')" class="del"><i class="fas fa-trash"></i></button></li>';
    }
    list.innerHTML = listHtml;
}