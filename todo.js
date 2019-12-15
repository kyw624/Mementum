const toDoForm = document.getElementById("js-toDoForm"),
    toDoInput = document.getElementById("js-toDoInput"),
    pendingList = document.getElementById("js-pendingList"),
    finishedList = document.getElementById("js-finishedList"),
    PENDING_LS = "pending",
    FINISHED_LS = "finished";

let penArr = [],
    finArr = [];

function saveFn() {
    localStorage.setItem(PENDING_LS, JSON.stringify(penArr));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finArr));
}

function toggleFn(e) {
    const btn = e.target,
        li = btn.parentNode;

    if (li.parentNode == pendingList) {
        finishedList.appendChild(li);
        btn.innerText = "🔄";
        const cleanArr = penArr.filter(function(element) {
            if (parseInt(li.id) == element.id) {
                toggleArr = {
                    text: element.text,
                    id : element.id
                };
            }
            return parseInt(li.id) != element.id;
        });
        penArr = cleanArr;
        finArr.push(toggleArr);
    } else {
        pendingList.appendChild(li);
        btn.innerText = "✅";
        const cleanArr = finArr.filter(function(element) {
            if (parseInt(li.id) == element.id) {
                toggleArr = {
                    text: element.text,
                    id : element.id
                };
            }
            return parseInt(li.id) != element.id;
        });
        finArr = cleanArr;
        penArr.push(toggleArr);
    }
    saveFn();
}

function delFn(e) {
    const btn = e.target,
        li = btn.parentNode;
    
    if (li.parentNode == pendingList) {
        pendingList.removeChild(li);
        const cleanArr = penArr.filter(function(element) {
            return parseInt(li.id) != element.id;
        });
        penArr = cleanArr;
    } else {
        finishedList.removeChild(li);
        const cleanArr = finArr.filter(function(element) {
            return parseInt(li.id) != element.id;
        });
        finArr = cleanArr;
    }
    saveFn();
}

function paintFinished(text, id) {
    const li = document.createElement("li"),
        span = document.createElement("span"),
        delBtn = document.createElement("button"),
        toggleBtn = document.createElement("button");

    li.id = id;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(toggleBtn);
    span.innerText = `${text} `;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delFn);
    toggleBtn.innerText = "🔄";
    toggleBtn.addEventListener("click", toggleFn);
    finishedList.appendChild(li);

    const obj = {
        text: text,
        id: id
    };

    finArr.push(obj);
    saveFn();
}

function paintToDos(text, id) {
    const li = document.createElement("li"),
        span = document.createElement("span"),
        delBtn = document.createElement("button"),
        toggleBtn = document.createElement("button");

    li.id = id;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(toggleBtn);
    span.innerText = `${text} `;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delFn);
    toggleBtn.innerText = "✅";
    toggleBtn.addEventListener("click", toggleFn);
    pendingList.appendChild(li);
    
    const obj = {
        text: text,
        id: id
    };

    penArr.push(obj);
    saveFn();
}

function loadToDos() {
    const pendingValue = localStorage.getItem(PENDING_LS),
        finishedValue = localStorage.getItem(FINISHED_LS);

        if (pendingValue != null) {
            const pendingParse = JSON.parse(pendingValue);
            pendingParse.forEach(function(element) {
                paintToDos(element.text, element.id);
            });
        }

        if (finishedValue != null) {
            const finishedParse = JSON.parse(finishedValue);
            finishedParse.forEach(function(element) {
                paintFinished(element.text, element.id);
            });
        }
}

function handleSubmit(e) {
    e.preventDefault();
    const inputValue = toDoInput.value,
        newId = Math.round(Math.random() * 100000000);
    paintToDos(inputValue, newId);
    toDoInput.value = "";
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();