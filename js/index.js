import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";

import { imprimir, mostrarTodasLasNovedades,mostrarTodasLasOfertas,mostrarMenu,cerrarMenu } from "../utiles.js";

//----------------------variables de mi sitio-------------
const mostrarError = (error) => {
  console.log("Muestro errores");
};
//Listo los artículos con novedades

const listarNovedades = (data) => {
  console.log(data);
  const articulo = data.map(
    (c) =>
      new Articulos(
        c.idArticulo,
        c.categoria,
        c.nombre,
        c.precio,
        c.novedad,
        c.descuento,
        c.porcentajeDto,
        c.descripcion,
        c.imagenPorDefecto
      )
  );
  imprimir("novedades", mostrarTodasLasNovedades(articulo));
};

const listarOfertas = (data) => {
  console.log(data);
  const articulo = data.map(
    (c) =>
      new Articulos(
        c.idArticulo,
        c.categoria,
        c.nombre,
        c.precio,
        c.novedad,
        c.descuento,
        c.porcentajeDto,
        c.descripcion,
        c.imagenPorDefecto
      )
  );
  imprimir("ofertas", mostrarTodasLasOfertas(articulo));
};












//-------------------------------------VALIDAR FORMULARIO AGREGAR ARTICULO--------------------------------------------

//------------------------------------Funciones al cargar el sitio----------------------------------------------------
MiServidor.obtenerOfertas().then(listarOfertas).catch(mostrarError);
MiServidor.obtenerNovedades().then(listarNovedades).catch(mostrarError);

function cantElementoCarrito(){
  let cantCarrito = sessionStorage.getItem("cant");
  if(cantCarrito>0){
    document.getElementById("numeroCarrito").innerHTML =cantCarrito
  }
}

cantElementoCarrito()