let input = document.querySelector(".new-item");
let addBtn = document.querySelector(".add-btn");
let list = document.querySelector(".todo-list");
let filter = document.querySelector(".filter");
let clear = document.querySelector(".clear");

let allList = [];

const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getData = (key) => {
    if (localStorage.getItem(key) !== null) {
        allList = JSON.parse(localStorage.getItem(key));
    } else {
        allList = [];
    }
    return allList;
}

const removeData = (key) => {
    localStorage.removeItem(key);
}

const addTodo = (e) => {
    e.preventDefault();
    let itemContent = input.value.trim();
    itemContent = sanitizeHtml(itemContent);
    console.log(itemContent);
    input.value = "";
    let newTodo = {
        id: allList.length,
        text: itemContent,
        status: "unfinished",
    }
    if (itemContent.length !== 0) {
        allList.push(newTodo);
        filterTodo();
    }
    saveData("allList", allList);
}

const changeStatus = (id) => {
    if (allList[id].status === "unfinished") {
        allList[id].status = "finished";
    } else {
        allList[id].status = "unfinished";
    }
    filterTodo();
}

const filterTodo = () => {
    let filterTag = getFilterTag();

    let activeList = [];
    let completedList = [];

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

const getFilterTag = () => {
    let radioValue;
    let radios = document.getElementsByName("filter-option");
    for (radio of radios) {
        if (radio.checked) {
            radioValue = radio.value;
        }
    }
    return radioValue;
}

const updateId = () => {
    for (let i = 0; i < allList.length; i++) {
        allList[i].id = i;
    }
}

const removeTodo = (id) => {
    removeData("allList");
    allList.splice(id, 1);
    updateId(allList);
    saveData("allList", allList);
    filterTodo();
}

const clearAll = () => {
    removeData("allList");
    renderList(getData("allList"))
}

const renderList = (data) => {
    var listHtml = '';
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let checkedOrNot = item.status === "finished" ? "checked" : "";
        listHtml +=
            '<li class="' + item.status +
            '"><input type="checkbox" onclick="changeStatus(' + item.id + ')"' + checkedOrNot +
            '><span>' + item.text +
            '</span><button onclick="removeTodo(' + item.id + ')" class="del"><i class="fas fa-trash"></i></button></li>';
    }
    list.innerHTML = listHtml;
}

window.addEventListener("load", renderList(getData("allList")));
addBtn.addEventListener('click', addTodo);
clear.addEventListener('click', clearAll);
filter.addEventListener('click', filterTodo);