

export class Carrito {
    constructor() {
        this.items = new Map();
    }

    agregarItem(itemCarrito) {
        if (this.items.has(itemCarrito.producto.id)) {
            console.log(
                `El producto ${itemCarrito.producto.nombre} ya está en el carrito`
            );
        } else {
            this.items.set(itemCarrito.producto.id, itemCarrito);
        }
    }

    eliminarProducto(itemCarrito) {
        let idProducto = itemCarrito.producto.id;
        this.items.delete(idProducto);
    }

    obtenerListaItems() {
        return Array.from(this.items.values());
    }

    obtenerCantidadTotal() {
        return this.obtenerListaItems().reduce(
            (total, item) => total + item.cantidad,0);
    }

    obtenerTotal() {
        return this.obtenerListaItems().reduce(
            (total, item) => total + item.getSubtotal(),0);
    }

    vaciarCarrito() {
        this.items.clear();
    }
}
