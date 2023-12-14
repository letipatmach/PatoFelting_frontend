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
  static urlBase = "http://localhost:3000";
  // static urlBase ="https://patofelting-api.onrender.com";



  //============================================= USUARIO =============================================================
  // POST /ingreso usuario

  static ingresousu(email, contrasenia) {
    const body = JSON.stringify({ email, contrasenia });
    console.log("ingresando por mi servidor")
    return fetch(obtenerUrl("ingresousu"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  //POST /salir usuario

  static salirusu() {
    return fetch(obtenerUrl("salirusu"), { method: "POST" })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }
  //POST ingreso nuevo usuario

  static registrousu(
    nombreUsu,
    apellidoUsu,
    email,
    contrasenia,
    repetirContrasenia
  ) {
    const body = JSON.stringify({
      nombreUsu,
      apellidoUsu,
      email,
      contrasenia,
      repetirContrasenia,
    });

    return fetch(obtenerUrl("registrousu"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

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
    if (opciones.filtroTamano == "") {    
    } else if (opciones.filtroTamano) {
       queryParams.set("filtroTamano", opciones.filtroTamano);
    }
    
    if (opciones.filtroDescuento == "false") {    
    } else if (opciones.filtroDescuento) {
       queryParams.set("filtroDescuento", opciones.filtroDescuento);
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
 
  static obtenerSugerencias(opciones = {}) {
    const queryParams = new URLSearchParams({});
    
    if (opciones.idBuscar == "") {
    } else if (opciones.idBuscar) {
      queryParams.set("idArticulo", opciones.idBuscar);
    }

    console.log("sugerencia en mi servidor")
    return fetch(obtenerUrl("sugerencia"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  //********************LLENAR CARRIT

  static cargarCarrito(  
              codigoVta  ,
              usuario    ,
              idArticulo ,
              cantidad   ,
              precio     ,
              total      ,
              rutaImagen ,
              nombre     ,
              altura       ) {
    const body = JSON.stringify({
                codigoVta  ,
                usuario    ,
                idArticulo ,
                cantidad   ,
                precio     ,
                total      ,
                rutaImagen ,
                nombre     ,
                altura     
    });

    return fetch(obtenerUrl("llenarCarrito"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  static obtenerDetalleCarrito(codigoVta) {  
      console.log("Codigo Rebido:"+codigoVta)
    console.log("Ruta: "+obtenerUrl(`carrito/${codigoVta}`))   
    return fetch(obtenerUrl(`carrito/${codigoVta}`))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }


}
