
export class ItemCarrito {
    constructor(producto, cantidad) {
        this.cantidadSuficiente(cantidad, producto);

        this.producto = producto;
        this.cantidad = cantidad;
    }

    getSubtotal() {
        return this.producto.precio * this.cantidad;
    }

    actualizarCantidad(cantidad) {
        this.cantidadSuficiente(cantidad, this.producto);
        this.cantidad = cantidad;
    }

    cantidadSuficiente(cantidad, producto) {
        if (cantidad > producto.stock) {
            throw new Error("Stock insuficiente");
        }
    }
}
