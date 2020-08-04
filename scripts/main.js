//Declaraci+on de bariables
var actual = new Date(); //Fecha actual
var day = actual.getDate(); //Día de la fecha actual
var month = actual.getMonth() + 1; //Mes de la fecha actual
var year = actual.getFullYear(); //Año de la fecha actual
var page = 0; //Pagina para la lista de años
let next = false; //Booleano para saber si el usuario hizo click en el botón siguiente
let prev = false;//Booleano para saber si el usuario hizo click en el botón anterior
//Objeto de meses donde se guarda la lista de meses con su id, titulo, descripcion y total de días
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

//Función que se carga al inicio
window.onload = function init() {
    document.getElementById("year").textContent = year; //Ponemos la variable year con el año actual, en el texto del elemento html 'year'
    var body = document.createElement('tbody'); //Creamos el cuerpo de la tabla, que contendrá inicialmente los días del mes
    body.classList.add("list"); //Agregamos una clase al cuerpo de la lista
    let container = document.getElementById("list-container"); //Obtenemos el elemento de html, en este caso es la tabla
    container.appendChild(body); //Ponemos nuestro cuerpo de tabla creado anteriormente, dentro de la tabla
    ListDays(); //Ejecutamos la función que nos acomoda la lista de días
}

//Función que se encarga de organizar los días del mes y año correspondiente
function ListDays() {
    var day = 1; //variable que nos indica que día arranca en 1 
    var counter = 0; //establecemos un contador
    var selectedYear = year; //inicialmente el año seleccionado es igual al año actual
    var daysQuantity = MONTHS[month - 1].days; //Obtenemos del objeto de meses, la cantidad de días. nota: le restamos 1 a month porque es la posición de la matriz y esta arranca en 0
    var body = document.getElementsByClassName("list")[0]; //Obtenemos el elemento del cuerpo de la tabla
    document.getElementsByClassName("list")[0].innerHTML = ''; //Limpiamos este cuerpo de cualquier elemento que pueda tener, ya que este cuerpo contendra los días pero también meses y años.
    document.getElementById("month").textContent = MONTHS[month - 1].description; //Establecemos el titulo del calendario en el elemento html
    //Algoritmo para calcular a que día de la semana corresponde una fecha, con este algoritmo sabremos en que día arranca nuestra fecha. Este algoritmo tiene el nombre de 'congruencia de Zeller', fue tomado de internet y adaptado a javascript
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
    //Hacemos un ciclo con la información procesada por el algoritmo
    for (let i = 0; i < 6; i++) {
        var row = document.createElement("tr") //Creamos 6 filas, que corresponden a las posibles 6 semanas que pueda tener un mes
        for (let j = 0; j < 7; j++) {
            //Comprobamos con la información procesada por el algoritmo, en que día arranca la fecha, para los días anteriores a este, se crearán celdas vacías
            if (i == 0 && j < d) {
                var cell = document.createElement("td")
                row.appendChild(cell)
            } else {
                //Comprobamos que la la cantidad de días sea mayor al contador
                if (counter < daysQuantity) {
                    var cell = document.createElement("td") //Creamos una celda
                    var cellText = document.createTextNode(day) //Agregamos el número del día correspondiente
                    if (j == 0) { //Cuando j es 0 significa que es domingo, por tanto, se agrega una clase diferente para cambiar el color
                        cell.classList.add("cell-sunday")
                    }
                    cell.classList.add("cell-day")//Se agrega una clase a cada celda
                    cell.appendChild(cellText)//Se agrega el texto a la celda
                    row.appendChild(cell) //Se agrega la celda a la fila
                    day++; //Aumenta 1 el día
                    counter++; //Aumenta 1 el contador
                }
            }
        }
        body.appendChild(row) //Se agrega la fila al cuerpo de la tabla
    }
}

//Función encargada de capturar el evento de click en la etiqueta que contiene el titulo del mes
function monthsClick() {
    let counter = 0; //Creamos un contador
    let body = document.getElementsByClassName("list")[0]; //Obtenemos el cuerpo de la tabla
    let container = document.getElementById("list-container"); //Obtenemos la tabla
    document.getElementsByClassName("list")[0].innerHTML = ''; //Limpiamos el cuerpo de la tabla
    document.getElementsByClassName("days-title")[0].style.display = "none"; //Ocultamos el encabezado que tiene el titulo de los días
    document.getElementById("month").style.display = "none"; //Ocultamos el elemento que contiene el titulo del mes
    document.getElementById("year").textContent = year;

    container.appendChild(body);
    //Creamos un ciclo para poner los meses en el cuerpo de la tabla
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr")//Creamos 4 filas
        for (let j = 0; j < 3; j++) { //Cada fila tendrá 3 celdas
            let cell = document.createElement("td") //Creamos la celda
            let cellText = document.createTextNode(MONTHS[counter].description) //En la celda ponemos la descripción del mes(nombre del mes)
            cell.addEventListener("click", monthClick)//Pasamos un evento click a cada celda con la función 'monthClick'
            cell.param = counter; //Pasamos el contador como parametro en la celda
            cell.classList.add("cell-month"); //Agregamos una clase a la celda
            cell.appendChild(cellText); //Agregamos el texto a la celda
            row.appendChild(cell); //Agregamos la celda a la fila
            counter++;
        }
        body.appendChild(row)
    }
}

//Función encargada de capturar el evento de click en la etiqueta que contiene el año
function yearsClick() {
    //Creamos una serie de variables que hemos visto en anteriores funciones
    let counter = 0;
    let body = document.getElementsByClassName("list")[0];
    let container = document.getElementById("list-container");
    document.getElementsByClassName("list")[0].innerHTML = '';
    document.getElementsByClassName("days-title")[0].style.display = "none";
    //A diferencia de las otras, aquí ocultamos todo el titulo y en cambio, ponemos dos flechas que nos servirán para navegar en la lista de años
    document.getElementById("month").style.display = "none";
    document.getElementById("year").style.display = "none";
    document.getElementById("prev").style.display = "inline-block";
    document.getElementById("next").style.display = "inline-block";

    container.appendChild(body)
    //Este ciclo funciona igual que el de la lista de meses, con la diferencia que hacemos uso de las variables 'prev' y 'next', para comprobar si el usuario clickea alguna de las dos
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
            if ((!prev && !next) || (prev && !next)) {//Si ambas son falsas o 'prev' es verdadero, entonces los años disminuyen
                year--;
            } else if (!prev && next) { //Si 'next' es verdadero, entonces los años aumentan
                year++;
            }

        }
        body.appendChild(row)
    }
}

//Función encargada de capturar el evento click de las celdas de los meses(Este evento fue creado en el ciclo de la función 'monthsClick'), se toma el parametro del evento
function monthClick(e) {
    document.getElementsByClassName("days-title")[0].style.display = "table-row"; //Una vez clickeado el mes, se vuelven a mostrar el encabezado de al tabla, que contiene el titulo de los días
    document.getElementById("month").style.display = "inline-block"; //Se vuelve a mostrar el titulo del mes, en este caso muestra el que seleccionó el usuario
    month = e.target.param + 1; //La variable month queda con el valor del parametro que tenía la celda clickeada, se le suma 1 debido a que el contador comienza en 0
    ListDays(); //Se ejecuta la función para que muestre la lista de días con el nuevo mes seleccionado
}

//Función encargada de capturar el evento click de las celdas de los años(Este evento fue creado en el ciclo de la función 'yearsClick'), se toma el parametro del evento
function yearClick(e) {
    //Una vez clickeado el año deseado, se pasa a la lista de seleccionar meses
    document.getElementById("year").style.display = "inline-block";  //Se muestra de nuevo el titulo del año, con el año seleccionado anteriormente
    document.getElementById("prev").style.display = "none"; //Se ocultan ambas flechas de navegación
    document.getElementById("next").style.display = "none";
    year = e.target.param; //La variable 'year' queda con el valor que llega por parametro de la celda de años
    monthsClick(); //Se ejecuta la función para que muestre la lista de meses
}

//Función que captura el evento de click al botón 'prev', para recorrer la lista de años hacia atrás
function prevClick() {
    if (year > 1900) { //Ponemos un limite que es 1900, para que el usuario no pueda navegar mas atras
        if (!prev && next) { //En caso de que next sea verdadero, al año se le restan 13, esto es por si el usuario anteriormente dió click a 'next' y luego a 'prev', esto ajusta la lista para que siga el orden correcto
            year -= 13; 
        }
        next = false; //La variable 'next' pasa a ser false
        prev = true; //La variable 'prev' pasa a ser verdadero
        yearsClick()//Se ejecuta de nuevo la función de la lista de años
    }
}

//Función que captura el evento de click al botón 'next', para recorrer la lista de años hacia delante
function nextClick() {
    if (year < 2100) { //Ponemos como limite 2100, para que el usuario no pueda navegar mas hacia delante
        if ((!prev && !next) || (prev && !next)) { //En caso de que ambas variables sea falsas o 'prev' sea verdadero, se le suma 13 a la variable year, esto para cuando el usuario da click en 'prev' y luego en 'next'
            year += 13;
        }
        next = true; //La variable 'next' pasa a ser verdadero
        prev = false;//La variable 'prev' pasa a ser false
        yearsClick()//Se ejecuta de nuevo la función de la lista de años
    }
}
