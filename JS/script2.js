var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");
var filter = document.querySelector(".filter");
var clear = document.querySelector(".clear");

var listData = [];

addBtn.addEventListener('click', addTodo);
clear.addEventListener('click', clearAll);
filter.addEventListener('click', filterTodo);
checkboxs.addEventListener('click', finished);


function addTodo(e) {
    e.preventDefault();
    var itemContent = input.value.trim();
    input.value = "";
    var newTodo = {
        text: itemContent,
        checked: "unfinished"
    }
    if (itemContent !== null && itemContent !== "" && itemContent !== undefined) {
        listData.push(newTodo);
        filterTodo();
    }
}

function renderList(data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += ('<li class=' + data[i].checked + '><input type="checkbox" class="status"><span>' +
            data[i].text + '</span><button><i class="fas fa-trash"></i></button></li>')
    }
    list.innerHTML = html;
}

function filterTodo() {
    var filterOption = getValue();
    var activeList = [];
    var completedList = [];
    for (var i = 0; i < listData.length; i++) {
        if (listData[i].checked == "finished") {
            completedList.push(listData[i]);
        } else {
            activeList.push(listData[i]);
        }
    }

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

function finished(e) {
    var checked = e.target;
    var data = checked.nextSibling;
    data.checked = true;
    filterTodo();
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
    listData = [];
    renderList(listData);
}