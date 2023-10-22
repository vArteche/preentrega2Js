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