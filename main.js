//DOM INDEX
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

const carrito = document.getElementById("carrito");
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
  carrito.appendChild(divCarrito);
});
};
//AGREGAR AL CARRITO




