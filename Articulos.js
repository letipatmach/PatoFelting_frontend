export class Articulos {
  idArticulo;
  nombre;
  precio;

  constructor(idArticulo = number, nombre = "", precio = number) {
    this.idArticulo = idArticulo;
    this.nombre = nombre;
    this.precio = precio;
  }

  mostrarListadoArticulos() {
    return `
    <tr>
    <td>${this.idArticulo}</td>
    <td>${this.nombre}</td>
    <td>${this.precio}</td>
    </tr>
      `;
  }
}
