const manejarErrores = (error = new Error("Error desconocido")) => {
  console.error("Ha ocurrido un error a nivel cliente: ", error.message);

  throw error.message;
};

const obtenerUrl = (ruta) => `${MiServidor.urlBase}/${ruta}`;

const procesarRespuesta = (res) => {   
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.mensaje);
    }

    return data.mensaje;
  });
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export class MiServidor {
  // static urlBase = "http://localhost:3000";
  static urlBase ="https://patofelting-api.onrender.com";

  //================================================HOME ===============================================================

  //GET /Obtengo listado de articulos en novedades

  static obtenerNovedades() {
    return fetch(obtenerUrl("novedades"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  //GET/ Obtengo listado de articulos en ofertas
  static obtenerOfertas() {
    return fetch(obtenerUrl("ofertas"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }
  //================================================CATALOGO ===============================================================

  //GET/ Obtengo listado de categoria
  static obtenerCategorias() {
    return fetch(obtenerUrl("categorias"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // GET /Obtengo listado de todos los articulos

  static obtenerListadoArticulos(opciones = {}) {
    const queryParams = new URLSearchParams({});
    
    if (opciones.filtroCategoria == "") {
    } else if (opciones.filtroCategoria) {
      queryParams.set("categoria", opciones.filtroCategoria);
    }

    if (opciones.precioMinimo == "") {    
    } else if (opciones.precioMinimo) {
       queryParams.set("precioMinimo", opciones.precioMinimo);
    }

    if (opciones.precioMaximo == "") {    
    } else if (opciones.precioMaximo) {
       queryParams.set("precioMaximo", opciones.precioMaximo);
    }
    
    return fetch(obtenerUrl("listaArticulos?"+queryParams))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // GET /Obtengo detalle de un articulo particular

  static obtenerDetalleArticulo(idArticulo) {
    console.log("Buscando el articulo: "+idArticulo)
    console.log("Ruta: "+obtenerUrl(`detalleArticulo/${idArticulo}`))
   
    return fetch(obtenerUrl(`detalleArticulo/${idArticulo}`))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }


  static obtenerImagenes(opciones = {}) {

    const queryParams = new URLSearchParams({});     
    queryParams.set("idArticulo", opciones);
   
    return fetch(obtenerUrl("listaImagen?"+queryParams))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }
 

  //*******************************************comentario
}
