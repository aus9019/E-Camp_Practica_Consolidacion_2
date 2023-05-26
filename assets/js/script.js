let url = "https://digimon-api.vercel.app/api/digimon";
let contenidoTabla = document.querySelector("#contenidoTabla");
let selectDigimon = document.querySelector("#selectDigimon");
let botonOpening = document.querySelector('#botonOpening');

// FETCH para procesar los datos en la Tabla Completa
fetch(url)
  .then((Respuesta) => Respuesta.json())
  .then((datos) => {
    tabla(datos);
    console.log(datos);
  })
  .catch((error) => console.log(error));

// Funcion para generar la Tabla Completa con los Digimon
function tabla(datos) {
  for (let elemento of datos) {
    contenidoTabla.innerHTML += `
        <tr>
        <td class="nombre col-4 fs-4">${elemento.name}</td>
        <td class="nivel col-2 fs-4">${elemento.level}</td>
        <td class="nivel col-4"><img src="${elemento.img}" alt="LogoDigimon" class="img-fluid" style="max-width: 50px; max-height: 50px;"></td>
        </td>
        </tr>
        `;
  }
}

// FETCH para Obtener la lista de Digimones
fetch(url)
  .then((Respuesta) => Respuesta.json())
  .then((datos) => {
    let opciones = "<option value='0'> - ELIGE UN DIGIMON - </option>";
    datos.forEach((datos) => {
      opciones += `<option>${datos.name}</option>`;
    });
    selectDigimon.innerHTML = opciones;
    console.log(datos);
  })
  .catch((error) => console.log(error));

// Función para obtener un digimon específico por su nombre mediante Fetch
function obtenerDigimon(nombre) {
  let urlName = "https://digimon-api.vercel.app/api/digimon/name/" + nombre;
  fetch(urlName)
    .then((response) => response.json())
    .then((datos) => {
      datosDigimon(datos[0]);
    })
    .catch((error) => console.log(error));
}

// PRIMER EVENTO: Realiza el cambio al elemento selectDigimon
selectDigimon.addEventListener("change", function () {
  obtenerDigimon(selectDigimon.value);
});

// Función para mostrar los datos en la Card
function datosDigimon(datos) {
  let imagenCard = document.querySelector("#cardDigimon img");
  imagenCard.setAttribute("src", datos.img);
  imagenCard.setAttribute("alt", datos.name);

  document.querySelector("#nombreDigimon").innerText = `NOMBRE: ${datos.name}`;
  document.querySelector("#nivelDigimon").innerText = `NIVEL: ${datos.level}`;
}


//SEGUNDO EVENTO: Reproducir el Opening al presionar le Boton
botonOpening.addEventListener('click', reproducirPausar);

let audio = new Audio('./assets/audio/opening_Digimon.mp3');
let reproduciendo = false;

// Funcion para poner Play y Pausar el Opening
function reproducirPausar() {
  if (reproduciendo) {
    audio.pause();
    reproduciendo = false;
  } else {
    audio.play();
    reproduciendo = true;
  }
}



