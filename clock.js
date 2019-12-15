const clock = document.getElementById("js-clock");

function loadDate() {
    const currentDate = new Date(),
        getYear = currentDate.getFullYear(),
        getMonth = currentDate.getMonth() + 1,
        getDate = currentDate.getDate(),
        getHour = currentDate.getHours(),
        getMinute = currentDate.getMinutes(),
        getSecond = currentDate.getSeconds();

        clock.innerText =
        `${getYear}/${getMonth < 10 ? `0${getMonth}` : getMonth}/${getDate < 10 ? `0${getDate}` : getDate}
        ${getHour < 10 ? `0${getHour}` : getHour}:${getMinute < 10 ? `0${getMinute}` : getMinute}:${getSecond < 10 ? `0${getSecond}` : getSecond}
        `;
}

function init() {
    loadDate();
    setInterval(loadDate, 1000);
}

init();