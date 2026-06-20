import { Producto } from "./Producto.js";
import { ItemCarrito } from "./ItemCarrito.js";
import { Carrito } from "./Carrito.js";

const producto1 = new Producto(1,"Laptop",1200,10);

const producto2 = new Producto(2,"Mouse",25,50);

const producto3 = new Producto(3,"Teclado",45,20);

const item1 = new ItemCarrito(producto1, 2);
const item2 = new ItemCarrito(producto2, 3);
const item3 = new ItemCarrito(producto3, 1);

const carrito = new Carrito();

carrito.agregarItem(item1);
carrito.agregarItem(item2);
carrito.agregarItem(item3);

console.log("=== Productos en el carrito ===");

carrito.obtenerListaItems().forEach(item => {
    console.log(
        `${item.producto.nombre} | Cantidad: ${item.cantidad} | Subtotal: $${item.getSubtotal()}`
    );
});

console.log("\n=== Resumen ===");
console.log( "Cantidad total:", carrito.obtenerCantidadTotal());

console.log("Total a pagar: $",carrito.obtenerTotal());

carrito.eliminarProducto(item2);

console.log("\n=== Después de eliminar Mouse ===");
console.log("Cantidad total:",carrito.obtenerCantidadTotal());

console.log("Total a pagar: $",carrito.obtenerTotal());