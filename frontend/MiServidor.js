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
  static urlBase ="http://localhost:3000";
  //"https://vivero-nature-backend.onrender.com" direccion backen deployada


 

  //================================================ARTICULOS ===============================================================



  // GET /Obtengo listado de todos los articulos

  static obtenerListadoArticulos() {
    console.log("no entender ni mierda");
    return fetch(obtenerUrl("listaArticulos"))
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  


 
//*******************************************comentario largo
 
}

