const toDoContainer = document.getElementById("js-toDoContainer"),
    greetingTitle = document.getElementById("js-greetingTitle"),
    greetingForm = document.getElementById("js-greetingForm"),
    greetingInput = document.getElementById("js-greetingInput"),
    USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
    e.preventDefault();
    const userName = greetingInput.value;
    saveName(userName);
    paintGreeting(userName);
}

function getName() {
    greetingForm.classList.remove(SHOWING_CN);
    toDoContainer.classList.add(SHOWING_CN);
    greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    const currentHours = new Date().getHours();
    greetingForm.classList.add(SHOWING_CN);
    toDoContainer.classList.remove(SHOWING_CN);
    greetingTitle.innerText = `Good ${currentHours >= 6 && currentHours < 12 ? `morning` : currentHours < 18 ? `afternoon` : `evening`}, ${text}!`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        getName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();