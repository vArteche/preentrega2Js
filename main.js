//PRODUCTOS
// CONSTRUCTOR DE PRODUCTOS
class nuevoProducto {
  constructor(id, nombre, precio, descripcion) {
    this.id=id;
    // this.img = img;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = "$" + precio;
  };
}

// PRODUCTOS DISPONIBLES
const PRODUCTO1 = new nuevoProducto(1, "YERBA MATE", 1200, 'Mañanita - 1kg');
const PRODUCTO2 = new nuevoProducto(2, "ARROZ", 600, 'Doble Carolina - 1kg')
const PRODUCTO3 = new nuevoProducto(3, "JABON LIQUIDO", 1800, 'Skip - 5lts');
const PRODUCTO4 = new nuevoProducto(4, "ACEITE", 1000, 'Natura - 900ml');
const PRODUCTO5 = new nuevoProducto(5, "LECHE", 900, 'La Serenísima 3% - 1lt');

const productos = [PRODUCTO1, PRODUCTO2, PRODUCTO3, PRODUCTO4, PRODUCTO5];


//DOM
const cardBody = document.querySelector(".card-body");

//LISTA DE PRODUCTOS
for (const producto of productos){
  const div = document.createElement('div');
  div.innerHTML = `
  <div class = "card-product">
      <div class="card-content">
      <div class="imgProducto">
      <img  src="${producto.img}">
      </div>
        <span class="card-title">${producto.nombre}</span>
          <p>${producto.descripcion}</p>
          <p>${producto.precio}</p>
          <button class="agregar" id="${producto.id}">Agregar al carrito</button>
      </div>
    `;
  cardBody.appendChild(div);
};
//AGREGAR AL CARRITO
const carrito = document.getElementById("carrito");

for(const producto of productos){
  const botonAgregado = document.getElementById(`${producto.id}`);
botonAgregado.addEventListener('click', (e)=>{
  let divCarrito = document.createElement("div");
  divCarrito.innerHTML = `
    <div class="card-product">
      <div class="card-content">
        <div class="imgProducto">
          <img src="${producto.img}">
        </div>
        <span class="card-title">${producto.nombre}</span>
        <p>${producto.descripcion}</p>
        <p>${producto.precio}</p>
        <p> Cantidad: </p>
      </div>
    </div>
  `;
  document.appendChild(divCarrito);
});
};


