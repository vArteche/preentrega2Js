// FUNCION PARA SALUDAR
let saludar = (usuario) => alert("Comencemos la compra " + usuario + "!");

// CONSTRUCTOR DE PRODUCTOS
class nuevoProducto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = "$" + precio;
  }
}

// PRODUCTOS DISPONIBLES
const PRODUCTO1 = new nuevoProducto(1, "ARROZ", 700);
const PRODUCTO2 = new nuevoProducto(2, "YERBA MATE", 1200);
const PRODUCTO3 = new nuevoProducto(3, "JABON LIQUIDO", 1800);
const PRODUCTO4 = new nuevoProducto(4, "ACEITE", 1000);
const PRODUCTO5 = new nuevoProducto(5, "LECHE", 900);

const productos = [PRODUCTO1, PRODUCTO2, PRODUCTO3, PRODUCTO4, PRODUCTO5];

const carrito = [];

for (let i = 0; i < productos.length; i++) {
  console.log(productos[i]);
}

let usuario = prompt("Bienvenido, ingresa tu nombre:");
saludar(usuario);
alert("Presionando la tecla F12 podrás ver los productos disponibles.");

let agregarProductos = true;

while (agregarProductos) {
  let idProductoDeseado = parseInt(prompt('Ingrese el ID del producto que desea agregar al carrito:'));
  let cantidadProducto = parseInt(prompt('Ingrese la cantidad del producto que desea agregar:'));

  function agregarProductoAlCarrito(idProductoDeseado, cantidadProducto) {
    const productoElegido = productos.find(producto => producto.id === idProductoDeseado);

    if (productoElegido) {
      const itemCompra = {
        producto: productoElegido.nombre,
        cantidad: cantidadProducto,
        precio: productoElegido.precio,
      };
      carrito.push(itemCompra);
      console.log(`Producto "${itemCompra.producto}" (${cantidadProducto} unidades) agregado al carrito.`);
      totalCarrito();
    } else {
      console.log('Producto no encontrado con el ID proporcionado.');
    }
  }

  agregarProductoAlCarrito(idProductoDeseado, cantidadProducto);

  let respuesta = prompt('¿Desea agregar más productos al carrito? (Sí/No)');
  if (respuesta.toLowerCase() === 'no') {
    agregarProductos = false;
  }
}

console.log('Carrito actual:', carrito);

function totalCarrito() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    total += item.cantidad * parseInt(item.precio.substring(1));
  }
  console.log('Total del carrito:', total);
}

totalCarrito();
