document.addEventListener("DOMContentLoaded", function() {

  // Recuperar el carrito guardado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  //AGREGAR AL CARRITO
    const carritoDom = document.getElementById("carrito");
    renderizarCarrito();

  //DOM
  const cardBody = document.getElementById("card-body");

  //LISTA DE PRODUCTOS
  for (const producto of productos) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="card-product">
        <div class="card-content">
          <div class="imgProducto">
          <img src=${producto.img}>
          </div>
          <span class="card-title">${producto.nombre}</span>
          <p>${producto.descripcion}</p>
          <p>$${producto.precio}</p>
          <button class="agregado" id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    `;
    cardBody.appendChild(div);
  };

    const btnAgregado = document.querySelectorAll(".agregado");

    //agregar al carrito
    btnAgregado.forEach((elegido) => {
    elegido.addEventListener('click', (e) => {
      // Obtener el id del producto del botón
      const idProducto = e.target.id;
      // Llamar a la función agregarAlCarrito con el id del producto
      agregarAlCarrito(idProducto);
      Toastify({

        text:"Se añadió 1 producto al carrito",
        style: {
          background: "#A7D397"
        },
        duration: 3000
        
        }).showToast();
    })});

    //eliminar del carrito
    const btnEliminar = document.querySelectorAll(".eliminar");
    btnEliminar.forEach((elegido) => {
    elegido.addEventListener('click', (e) => {
      // Obtener el id del producto del botón
      const idProducto = e.target.id;
      eliminarDelCarrito(idProducto);
    })});

  // Función para agregar al carrito
  function agregarAlCarrito(id) {
    const existe = carrito.some(producto => producto.id === parseInt(id));
    if (existe) {
      carrito.map(producto => {
        if (producto.id === parseInt(id)) {
          producto.cantidad += 1;
        }
          return producto;
      });
    } else {
          let productoEncontrado = productos.find(producto => producto.id === parseInt(id));
      carrito.push(productoEncontrado);
    };
    renderizarCarrito();
  
  };

  //funcion para eliminar del carrito
  function eliminarDelCarrito(id) {
    const producto = carrito.find(producto=> producto.id ===parseInt(id));
    if(producto){
      if(producto.cantidad >1){
        producto.cantidad-=1;
      }else{
        carrito= carrito.filter(item => item.id !== parseInt(id));
      };
      renderizarCarrito();
    }
    
  };

  //renderizar carrito
  function renderizarCarrito(){
        // Actualizar el contenido del carrito
          carritoDom.innerHTML = "";
          let total = 0;
            carrito.forEach(producto => {
            let divCarrito = document.createElement('div');
            divCarrito.innerHTML = `
              <div class="card-product">
                <div class="card-content">
                  <div class="imgProducto">
                    <img src=${producto.img}>
                  </div>
                  <span class="card-title">${producto.nombre}</span>
                  <p>${producto.descripcion}</p>
                  <p>$${producto.precio}</p>
                  <p>Cantidad: ${producto.cantidad}</p>
                  <button class="eliminar">Eliminar</button>
                </div>
              </div>
            `;
            carritoDom.appendChild(divCarrito);
            total += producto.precio * producto.cantidad;
          });
          let divTotal = document.createElement('div');
          divTotal.innerHTML = `Total de mi carrito: $${total}`;
          carritoDom.appendChild(divTotal);
          // Almacenar en localStorage
          localStorage.setItem('carrito', JSON.stringify(carrito));
  };
  
  
  //vaciar carrito
  const btnVaciarCarrito = document.querySelector("#vaciarCarrito");
  btnVaciarCarrito.addEventListener('click', (e)=>{
  localStorage.clear();
  carrito=[];
  renderizarCarrito();
});


//aca cierra el domcontentloaded
});
