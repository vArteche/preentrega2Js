document.addEventListener("DOMContentLoaded", function() {

  // Recuperar el carrito guardado en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  //AGREGAR AL CARRITO
    const carritoDom = document.getElementById("carrito");
    renderizarCarrito();

  //DOM
  const cardBody = document.getElementById("card-body");
  
  // fetch para productos
  fetch("productos.json")
        .then(Response => Response.json())
        .then(data => mostrarProductos(data));
        


  //LISTA DE PRODUCTOS
  function mostrarProductos(productos){
    productos.forEach(producto =>{const div = document.createElement('div');
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
  }); 
  };

  
    const btnAgregado = document.querySelectorAll(".agregado");
    //agregar al carrito
    btnAgregado.forEach((elegido) => {
    elegido.addEventListener('click', (e) => {
      // Obtener el id del producto del botón
      const idProducto = e.target.id;
      console.log(idProducto)
      // Llamar a la función agregarAlCarrito con el id del producto
      agregarAlCarrito(idProducto);
      Toastify({

        text:"Se añadió 1 producto al carrito",
        style: {
          background: "#F9B572"
        },
        duration: 3000
        
        }).showToast();
    })});

    //eliminar del carrito
    function prodEliminado(){
          const btnEliminar = document.querySelectorAll(".eliminar");
    btnEliminar.forEach((elegido) => {
    elegido.addEventListener('click', (e) => {
      // Obtener el id del producto del botón
      const idProducto = e.target.id;
      console.log(idProducto);
      eliminarDelCarrito(idProducto);
    })});
    }


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
    };
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
                  <button id= ${producto.id} class="eliminar">Eliminar</button>
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
          prodEliminado();
  };
  
  
  //vaciar carrito
  const btnVaciarCarrito = document.querySelector("#vaciarCarrito");
  btnVaciarCarrito.addEventListener('click', (e)=>{
    Swal.fire({
      title: 'Deseas vaciar el carrito?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vacíalo!',
      cancelButtonText : 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          localStorage.clear();
          carrito=[];
          renderizarCarrito();
        Swal.fire(
          'Carrito eliminado',
          'Ahora puedes iniciar una nueva compra',
        );
      }
    })


});

//finalizar compra
const btnFinalizar= document.querySelector('#checkout');
btnFinalizar.addEventListener('click', (e)=>{
  Swal.fire({
    title: 'Ingresa tu usuario de GitHub, necesitamos validar tu identidad.',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Gracias por tu compra, ${result.value.login}!`,
        imageUrl: result.value.avatar_url
      })
    }
  })
  DOWNLOAD 
});


//aca cierra el domcontentloaded
});
