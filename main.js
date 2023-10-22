document.addEventListener("DOMContentLoaded", function() {
  // Recuperar el carrito guardado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  //AGREGAR AL CARRITO
    const carritoDom = document.getElementById("carrito");
    renderizarCarrito();
    //PRODUCTOS
  // CONSTRUCTOR DE PRODUCTOS
  class nuevoProducto {
    constructor(id, nombre, precio, descripcion, img) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.cantidad = 1;
      this.img = img;
    }
  }
  // PRODUCTOS DISPONIBLES
  const PRODUCTO1 = new nuevoProducto(1, "YERBA MATE", 1200, 'Mañanita - 1kg', "./assets/img/yerbanueva.jpg");
  const PRODUCTO2 = new nuevoProducto(2, "ARROZ", 600, 'Doble Carolina - 1kg', "./assets/img/arroznueva.jpg")
  const PRODUCTO3 = new nuevoProducto(3, "JABON LIQUIDO", 1800, 'Skip - 5lts', "./assets/img/jabonnueva.jpg");
  const PRODUCTO4 = new nuevoProducto(4, "ACEITE", 1000, 'Natura - 900ml', "./assets/img/aceitenueva.jpg");
  const PRODUCTO5 = new nuevoProducto(5, "LECHE", 900, 'La Serenísima 3% - 1lt', "./assets/img/lechenueva.jpg");

  const productos = [PRODUCTO1, PRODUCTO2, PRODUCTO3, PRODUCTO4, PRODUCTO5];

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
  }

    const btnAgregado = document.querySelectorAll(".agregado");
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
  
  }
  function eliminarDelCarrito(id) {
    const producto = carrito.find(producto=> producto.id ===parseInt(id));
    if(producto){
      if(producto.cantidad >1){
        producto.cantidad-=1;
      }else{
        carrito= carrito.filter(item => item.id !== parseInt(id));
      }
      renderizarCarrito();
    }
    
  }
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
  }}
  
  
  const btnVaciarCarrito = document.querySelector("#vaciarCarrito"));

  btnVaciarCarrito.addEventListener(click, (e)=>{
    
  })