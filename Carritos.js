

export class Carritos {
    idCarrito ;
    codigoVta ;
    usuario   ;
    idArticulo;
    cantidad  ;
    precio    ;
    total     ;
    rutaImagen;
    nombre    ;
    altura    ;
  
    constructor(
      idCarrito ="",
      codigoVta ="",
      usuario   ="",
      idArticulo="",
      cantidad  ="",
      precio    ="",
      total     ="",
      rutaImagen="",
      nombre    ="",
      altura    =""
    ) {
      this.idCarrito =idCarrito ;
      this.codigoVta =codigoVta ;
      this.usuario   =usuario   ;
      this.idArticulo=idArticulo;
      this.cantidad  =cantidad  ;
      this.precio    =precio    ;
      this.total     =total     ;
      this.rutaImagen=rutaImagen;
      this.nombre    =nombre    ;
      this.altura    =altura    ;
    }


    mostrarListado() {
       
      return `
      <article>
      <figure>
        <img
          src="./${this.rutaImagen}"
          alt="squirtle"
        />
      </figure>
      <div class="descripcionCarrito">
        <div>
          <h3>${this.nombre}</h3>
          <div class="precioMobile">${this.precio}</div>
          <p>Tamaño: <span class="tamano">${this.altura}</span></p>
          <p>
            Cantidad
            <i class="iconsax menuIconos" icon-name="minus-circle"></i>
            <span class="numeroCantidad">${this.cantidad}</span>
            <i class="iconsax menuIconos" icon-name="add-circle"></i>
          </p>
        </div>
        <div class="bototesEliminarFav">
          <p id="btnEliminar">Eliminar de Carrito |</p>
          <p id="btnAgregarFav">Añadir a Lista de deseos</p>
        </div>
      </div>
      <div class="precioDesktop">$${this.precio}</div>
    </article>
      `;


  }
  
///---- FIN CLASE
}