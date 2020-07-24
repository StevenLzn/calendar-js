var actual = new Date();
var day = actual.getDate();
var month = actual.getMonth() + 1;
var year = actual.getFullYear();
var page = 0;
let next = false;
let prev = false;
var MONTHS = [
    { id: "1", title: "ENERO", description: "Enero", days: 31 },
    { id: "2", title: "FEBRERO", description: "Febrero", days: 28 },
    { id: "3", title: "MARZO", description: "Marzo", days: 31 },
    { id: "4", title: "ABRIL", description: "Abril", days: 30 },
    { id: "5", title: "MAYO", description: "Mayo", days: 31 },
    { id: "6", title: "JUNIO", description: "Junio", days: 30 },
    { id: "7", title: "JULIO", description: "Julio", days: 31 },
    { id: "8", title: "AGOSTO", description: "Agosto", days: 31 },
    { id: "9", title: "SEPTIEMBRE", description: "Septiembre", days: 30 },
    { id: "10", title: "OCTUBRE", description: "Octubre", days: 31 },
    { id: "11", title: "NOVIEMBRE", description: "Noviembre", days: 30 },
    { id: "12", title: "DICIEMBRE", description: "Diciembre", days: 31 },
]

window.onload = function init() {
    document.getElementById("year").textContent = year;
    var body = document.createElement('tbody');
    body.classList.add("list");
    let container = document.getElementById("list-container");
    container.appendChild(body);
    ListDays();
}

function ListDays() {
    var day = 1;
    var counter = 0;
    var selectedYear = year;
    var daysQuantity = MONTHS[month - 1].days;
    var body = document.getElementsByClassName("list")[0];
    document.getElementsByClassName("list")[0].innerHTML = '';
    document.getElementById("month").textContent = MONTHS[month - 1].description;

    if (month >= 3) {
        month -= 2;
    } else {
        month += 10;
    }
    if ((month == 11) || (month == 12)) {
        selectedYear--;
    }
    const k = selectedYear % 100;
    const j = parseInt(selectedYear / 100);

    let d = parseInt(2.6 * month - .2);
    d += parseInt(1 + k);
    d += k / 4;
    d = parseInt(d);
    d += parseInt(j / 4);
    d -= parseInt(2 * j);
    d %= 7;

    if (selectedYear >= 1700 && selectedYear <= 1751) {
        d -= 3;
    } else {
        if (selectedYear <= 1699) {
            d -= 4;
        }
    }
    if (d < 0) {
        d += 7;
    }
    for (let i = 0; i < 6; i++) {
        var row = document.createElement("tr")
        for (let j = 0; j < 7; j++) {
            if (i == 0 && j < d) {
                var cell = document.createElement("td")
                row.appendChild(cell)
            } else {
                if (counter < daysQuantity) {
                    var cell = document.createElement("td")
                    var cellText = document.createTextNode(day)
                    if (j == 0) {
                        cell.classList.add("cell-sunday")
                    }
                    cell.classList.add("cell-day")
                    cell.appendChild(cellText)
                    row.appendChild(cell)
                    day++;
                    counter++;
                }
            }
        }
        body.appendChild(row)
    }
}

function monthsClick() {
    let counter = 0;
    let body = document.getElementsByClassName("list")[0];
    let container = document.getElementById("list-container");
    document.getElementsByClassName("list")[0].innerHTML = '';
    document.getElementsByClassName("days-title")[0].style.display = "none";
    document.getElementById("month").style.display = "none";
    document.getElementById("year").textContent = year;


    container.appendChild(body);
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("td")
            let cellText = document.createTextNode(MONTHS[counter].description)
            cell.addEventListener("click", monthClick)
            cell.param = counter;
            cell.classList.add("cell-month");
            cell.appendChild(cellText);
            row.appendChild(cell);
            counter++;
        }
        body.appendChild(row)
    }
}

function yearsClick() {
    let counter = 0;
    let body = document.getElementsByClassName("list")[0];
    let container = document.getElementById("list-container");
    document.getElementsByClassName("list")[0].innerHTML = '';
    document.getElementsByClassName("days-title")[0].style.display = "none";
    document.getElementById("month").style.display = "none";
    document.getElementById("year").style.display = "none";
    document.getElementById("prev").style.display = "inline-block";
    document.getElementById("next").style.display = "inline-block";
    container.appendChild(body)
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("td")
            let cellText = document.createTextNode(year)
            cell.addEventListener("click", yearClick)
            cell.param = year;
            cell.classList.add("cell-month");
            cell.appendChild(cellText);
            row.appendChild(cell);
            counter++;
            if ((!prev && !next) || (prev && !next)) {
                year--;
            } else if (!prev && next) {
                year++;
            }

        }
        body.appendChild(row)
    }
}


function monthClick(e) {
    document.getElementsByClassName("days-title")[0].style.display = "table-row";
    document.getElementById("month").style.display = "inline-block";
    month = e.target.param + 1;
    ListDays()
}

function yearClick(e) {
    document.getElementById("year").style.display = "inline-block";
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "none";
    year = e.target.param;
    monthsClick();
}

function prevClick() {
    if (year > 1900) {
        if (!prev && next) {
            year -= 13;
        }
        next = false;
        prev = true;
        yearsClick()
    }
}

function nextClick() {
    if (year < 2100) {
        if ((!prev && !next) || (prev && !next)) {
            year += 13;
        }
        next = true;
        prev = false;
        yearsClick()
    }
}
