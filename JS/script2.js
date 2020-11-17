var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");
var filter = document.querySelector(".filter");
var clear = document.querySelector(".clear");

var listData = [];

addBtn.addEventListener('click', addTodo);
clear.addEventListener('click', clearAll);
filter.addEventListener('click', filterTodo);

function addTodo(e) {
    e.preventDefault();
    var itemContent = input.value.trim();
    input.value = "";
    var newTodo = {
        text: itemContent,
        status: "unfinished"
    }
    if (itemContent.length !== 0) {
        listData.push(newTodo);
        filterTodo();
    }
}

function finished(i) {
    if (listData[i].status === "unfinished") {
        listData[i].status = "finished";
    } else {
        listData[i].status = "unfinished";
    }
    filterTodo();
}

function filterTodo() {
    var filterOption = getValue();
    var activeList = [];
    var completedList = [];

    completedList = listData.filter(item => item.status === "finished");
    activeList = listData.filter(item => item.status === "unfinished");

    switch (filterOption) {
        case "all":
            renderList(listData);
            break;
        case "completed":
            renderList(completedList);
            break;
        case "active":
            renderList(activeList);
            break;
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

function remove(i) {
    listData.splice(i, 1);
    filterTodo();
}

function clearAll() {
    listData = [];
    renderList(listData);
}

function renderList(data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html +=
            '<li class=' +
            data[i].status +
            // '><input type="checkbox" onclick="finished(' + i +
            // ')" id="status"></label ><span>' +
            '><button id="status" onclick="finished(' + i + ')" class="btn-' +
            data[i].status + '"><a>&#10004</a></button><span>' +
            data[i].text +
            '</span><button onclick="remove(' + i + ')" class="del"><i class="fas fa-trash"></i></button></li>';
    }
    list.innerHTML = html;
}