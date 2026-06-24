class ColaPedidos {
  
  constructor() {
    this.pedidos = [];
    this.contadorId = 0;
  }

  encolarPedido(cliente, platillo) {
    this.contadorId++;
    const pedido = { id: this.contadorId, cliente, platillo, hora: new Date().toLocaleTimeString(),};
    this.pedidos.push(pedido);
    console.log(`Pedido #${pedido.id} registrado: ${cliente} - ${platillo}`);
    return pedido;
  }

  atenderPedido() {
    if (this.estaVacia()) {
      console.log("No hay pedidos pendientes.");
      return null;
    }
    const pedido = this.pedidos.shift();
    console.log(`Preparando pedido #${pedido.id}: ${pedido.platillo} para ${pedido.cliente}`);
    return pedido;
  }

  estaVacia() {
    return this.pedidos.length === 0;
  }

  totalPendientes() {
    return this.pedidos.length;
  }

  verTodos() {
    if (this.estaVacia()) {
      console.log("La cola está vacía.");
      return;
    }
    this.pedidos.forEach((p) => {
      console.log(`#${p.id} - ${p.cliente} - ${p.platillo} (${p.hora})`);
    });
  }
}

const cocina = new ColaPedidos();

cocina.encolarPedido("Mesa 3", "arroz con pollo");
cocina.encolarPedido("Mesa 5", "ceviche de camaron");
cocina.encolarPedido("Mesa 1", "pechuga a la plancha");

cocina.verTodos();

cocina.atenderPedido();
cocina.atenderPedido();

cocina.encolarPedido("Mesa 7", "pollo con arroz");

cocina.verTodos();

console.log("Pendientes: ", cocina.totalPendientes());

cocina.atenderPedido();
cocina.atenderPedido();
cocina.atenderPedido();

