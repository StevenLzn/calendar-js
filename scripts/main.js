var actual = new Date();
var day = actual.getDate();
var month = actual.getMonth() + 1;
var year = actual.getFullYear();
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
    document.getElementById("month").textContent = MONTHS[month - 1].description;
    document.getElementById("year").textContent = year;
    ListDays();
}

function ListDays(){
    var day = 1;
    var counter = 0;
    var container = document.getElementById("day-list");

    if (month >= 3) {
        month -= 2;
    } else {
        month += 10;
    }
    if ((month === 11) || (month === 12)) {
        year--;
    }

    const k = year % 100;
    const j = parseInt(year / 100);

    let d = parseInt(2.6 * month - .2);
    d += parseInt(1 + k);
    d += k / 4;
    d = parseInt(d);
    d += parseInt(j / 4);
    d -= parseInt(2 * j);
    d %= 7;

    if (year >= 1700 && year <= 1751) {
        d -= 3;
    } else {
        if (year <= 1699) {
            d -= 4;
        }
    }
    if (d < 0) {
        d += 7;
    }
    for (let i = 0; i < 5; i++) {
        var row = document.createElement("tr")
        for (let j = 0; j < 7; j++) {
            if (i == 0 && j < d) {
                var cell = document.createElement("td")
                row.appendChild(cell)
            } else {
                if (counter < MONTHS[month - 1].days) {
                    counter++;
                    var cell = document.createElement("td")
                    var cellText = document.createTextNode(day)
                    cell.classList.add("cell-day")
                    cell.appendChild(cellText)
                    row.appendChild(cell)
                    day += 1;
                }
            }
        }
        container.appendChild(row)
    }
}