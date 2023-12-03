export class Categorias {
  idCategoria;
  nombreCategoria;
  imagenCategoria;

  constructor(
    idCategoria = Number,
    nombreCategoria = "",
    imagenCategoria = ""
  ) {
    this.idCategoria = idCategoria;
    (this.nombreCategoria = nombreCategoria),
    (this.imagenCategoria = imagenCategoria);
  }

  mostrarListadoCategoria() {
    return `
    <article>
          <figure>
        <img
          src="${this.imagenCategoria}"
          alt="${this.nombreCategoria}"
          title="${this.nombreCategoria}"
        />
        <figcaption><h3>${this.nombreCategoria}</h3></figcaption>
      </figure>
   
  </article>
      `;
  }
  
}
