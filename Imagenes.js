export class Imagenes{
    idImagen;
    idArticulo;
    rutaImagen;
  
    constructor(
      idImagen = number,
      idArticulo =number,
      rutaImagen = ""
    ) {
      this.idImagen = idImagen;
      this.idArticulo = idArticulo;
      this.rutaImagen = rutaImagen;
    } 

    mostrarImagenes() {
      return`    
      <img class="imgMin" id="${this.idImagen}"
        src="${this.rutaImagen}"
        alt="descripcion de articulo"
      />
     
    
      `      
    };

}