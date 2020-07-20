window.onload = function dayList(){
    var day = 1;
    var container = document.getElementById("day-list")
    for (let i = 0; i < 5; i++) {
        var row = document.createElement("tr")
        for (let i = 0; i < 7; i++) {
            var cell = document.createElement("td")
            var cellText = document.createTextNode(day)
            cell.appendChild(cellText)
            row.appendChild(cell)
            day += 1;
        }
        container.appendChild(row)
    }
}