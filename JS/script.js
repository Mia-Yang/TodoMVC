var input = document.querySelector(".new-item");
var addBtn = document.querySelector(".add-btn");
var list = document.querySelector(".todo-list");

addBtn.addEventListener('click', addItem);

function addItem() {
    var itemContent = input.value;
    input.value = "";
    var item = document.createElement("li");
    var itemText = document.createElement("span");
    var checked = document.createElement("button");
    var trash = document.createElement("button");

    itemText.textContent = itemContent;

    item.appendChild(checked);
    itemText.appendChild(trash);
    item.appendChild(itemText);
    list.appendChild(item);


}