export class Cola {
  constructor() {
    this.turnocliente = [];
  }

  encolarCliente(Cliente) {
    this.turnocliente.push(Cliente);
    console.log("cliente encolado")
  }

  desencolarCliente() {
    if(this.estaVacia()){
        return null 
    }
    return this.turnocliente.shift();
  }

  frente() {
    if(this.estaVacia()){
        return null 
    }
    return this.turnocliente[0];
  }

  estaVacia() {
    return this.turnocliente.length === 0;
  }

  tamaño() {
        return this.turnocliente.length;
    }
}
