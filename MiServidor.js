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
  


 

  //================================================ARTICULOS ===============================================================



  // GET /Obtengo listado de todos los articulos

  static obtenerListadoArticulos() {   
    return fetch(obtenerUrl("listaArticulos"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  //GET /Obtengo listado de articulos en novedades

  static obtenerNovedades() {   
    return fetch(obtenerUrl("novedades"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  


 
//*******************************************comentario
 
}

