document.addEventListener("DOMContentLoaded", function() {
  //PRODUCTOS
  // CONSTRUCTOR DE PRODUCTOS
  class nuevoProducto {
    constructor(id, nombre, precio, descripcion) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = "$" + precio;
      this.cantidad = 1;
    }
  }

  // PRODUCTOS DISPONIBLES
  const PRODUCTO1 = new nuevoProducto(1, "YERBA MATE", 1200, 'Mañanita - 1kg');
  const PRODUCTO2 = new nuevoProducto(2, "ARROZ", 600, 'Doble Carolina - 1kg')
  const PRODUCTO3 = new nuevoProducto(3, "JABON LIQUIDO", 1800, 'Skip - 5lts');
  const PRODUCTO4 = new nuevoProducto(4, "ACEITE", 1000, 'Natura - 900ml');
  const PRODUCTO5 = new nuevoProducto(5, "LECHE", 900, 'La Serenísima 3% - 1lt');

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
          </div>
          <span class="card-title">${producto.nombre}</span>
          <p>${producto.descripcion}</p>
          <p>${producto.precio}</p>
          <button class="agregado" id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    `;
    cardBody.appendChild(div);
  }

  //AGREGAR AL CARRITO
  const carritoDom = document.getElementById("carrito");
  let carrito = [];

  // Función para agregar al carrito
  function agregarAlCarrito(id) {
    const existe = carrito.some(producto => producto.id === parseInt(id));

    if (existe) {
      carrito.map(producto => {
        if (producto.id === parseInt(id)) {
          producto.cantidad += 1;
        }
      });
    } else {
      let productoEncontrado = productos.find(producto => producto.id === parseInt(id));
      carrito.push(productoEncontrado);
    }
    
    // Actualizar el contenido del carrito
    if (carritoDom) {
      carritoDom.innerHTML = "";
      let total = 0;

      carrito.forEach(producto => {
        let divCarrito = document.createElement('div');
        divCarrito.innerHTML = `
          <div class="card-product">
            <div class="card-content">
              <div class="imgProducto">
                <img src="">
              </div>
              <span class="card-title">${producto.nombre}</span>
              <p>${producto.descripcion}</p>
              <p>${producto.precio}</p>
              <p>Cantidad: ${producto.cantidad}</p>
            </div>
          </div>
        `;
        carritoDom.appendChild(divCarrito);

        total += producto.precio * producto.cantidad;
      });

      let divTotal = document.createElement('div');
      divTotal.innerHTML = `Total: $${total}`;
      carritoDom.appendChild(divTotal);

      // Almacenar en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));

    } else {
      console.error("El elemento con ID 'carrito' no existe en el DOM");
    }
  };

  const btnAgregado = document.querySelectorAll(".agregado");
  btnAgregado.forEach((elegido) => {
    elegido.addEventListener('click', (e) => {
      // Obtener el id del producto del botón
      const idProducto = e.target.id;
      // Llamar a la función agregarAlCarrito con el id del producto
      agregarAlCarrito(idProducto);
    });
  });
  

  // Recuperar el carrito guardado en localStorage
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    // Actualizar el contenido del carrito en el DOM
    agregarAlCarrito();
  }
});
