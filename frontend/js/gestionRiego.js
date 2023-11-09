import { MiServidor } from "../MiServidor.js";
import { Planta } from "../Planta.js";
import { Categoria } from "../Categoria.js";
import { GestionRiego } from "../GestionRiego.js";
import {
  eventoClickCerrarSesion,
  validarSesion,
  obtenerDatosDelClima,
  imprimir,
  fechaActual,
  mostrarPlantasARegar,
  mostrarTodasLasCategorias,
  obtenerNombreApellidoUsu
} from "../utiles.js";
 

validarSesion();
eventoClickCerrarSesion();

imprimir("usuarioLogueado",obtenerNombreApellidoUsu())

const mostrarError = (error) => {
  console.log("Muestro errores");
};

//defino constantes y asigno evento
const cbCategoria = document.querySelector("#categoria");
let ordenarPorCategoria = "asc";
let filtroEstado = "No Regado";

cbCategoria.addEventListener("click", actuTabla);

//API-CLIMA
let humedadMeteo;
//Obtengo listado de plantas segun humedad de API CLIMA (Meteo),que debe ser regada (Humedad de la planta >= Humedad API CLIMA)
const listarPlantasRegar = (data) => {
  const plantas = data.map(
    (c) =>
      new Planta(
        c.idPlanta,
        c.categoria,
        c.nombre,
        c.precio,
        c.humedad,
        c.imagen,
        c.tipoCaracteristica,
        c.caracteristica
      )
  );

  plantas.forEach((c) => {
    const fecha = fechaActual();

    let codigo = c.idPlanta + "" + fecha+""+humedadMeteo;
    let categoria = c.categoria;
    let planta = c.nombre;
    let humedadPlanta = Number(c.humedad);
    let humedadAPI = Number(humedadMeteo);
    let estado = "No Regado";

    cargarRiego(codigo, categoria, planta, humedadPlanta, humedadAPI, estado);
  });
};

//guardo las plantas que tengo pendientes a regar
function cargarRiego(  codigo,  categoria,  planta,  humedadPlanta,  humedadAPI,  estado){
  MiServidor.crearRiego(
    codigo,
    categoria,
    planta,
    humedadPlanta,
    humedadAPI,
    estado
  );
actuTabla();
}
//muestro listado pendiente de riego

const listarPlantasAGestionarRiego = (data) => {
  const plantasARegar = data.map(
    (c) =>
      new GestionRiego(
        c.idRiego,
        c.codigo,
        c.categoria,
        c.planta,
        c.humedadPlanta,
        c.humedadAPI,
        c.estado
      )
  );
  imprimir("plantasARegar", mostrarPlantasARegar(plantasARegar));

  document.querySelectorAll(".btnRegado").forEach((item) => {
    item.addEventListener("click", (e) => {
      regado(item.id);
    });
  });
};

obtenerDatosDelClima(-34.9, -56.19, "temperature_2m,relativehumidity_2m").then(
  (datosClima) => {
    //Obtengo La Humedad siemprea las 9 am,cuando abre el vivero
    let hora = 9;
    asignarHumedad(datosClima.humedad[hora]);
  }
);
function asignarHumedad(humedad) {
  humedadMeteo = humedad;
  MiServidor.obtenerListadoRiego(humedadMeteo).then(listarPlantasRegar).catch();
}


//actualizo estado de No regado a regado en la pantalla Gestion Riego

function regado(id) {
  
  const codigo = id;
  const estado = "SI";
  MiServidor.actualizarRiego(codigo, estado)
    .then(actuTabla())
    .catch(mostrarError);
}

//Muestro la tabla actualizada

function actuTabla() {
  let filtroCategoria = cbCategoria.value;

  MiServidor.obtenerListadoGestionarRiego({
    ordenarPorCategoria,
    filtroEstado,
    filtroCategoria,
  })
    .then(listarPlantasAGestionarRiego)
    .catch(mostrarError);
}

//Cargar Select Categorias para filtrar en pantalla

const listarCategoriaFiltro = (data) => {
  const categoria = data.map(
    (c) => new Categoria(c.idCategoria, c.nomCategoria)
  );
  imprimir("categoria", mostrarTodasLasCategorias(categoria));
};

MiServidor.obtenerListadoCategoria()
  .then(listarCategoriaFiltro)
  .catch(mostrarError);

actuTabla();


