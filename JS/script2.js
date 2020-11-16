var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");
var filter = document.querySelector(".filter");
var clear = document.querySelector(".clear");
var listData = [];

addBtn.addEventListener('click', addTodo);

function addTodo(e) {
    e.preventDefault();
    var itemContent = input.value.trim();
    input.value = "";
    var newTodo = {
        text: itemContent,
        checked: false
    }
    console.log(newTodo);
    if (itemContent !== null && itemContent !== "" && itemContent !== undefined) {
        listData.push(newTodo);
        console.log(listData);
        renderList(listData);
    }
}

function renderList(data) {
    var html = '';
    for (var i = 0; i < listData.length; i++) {
        html += '<li><input type="checkbox"><span>' +
            data[i].text + '</span><button><i class="fas fa-trash"></i></button></li>'
    }
    list.innerHTML = html;
}