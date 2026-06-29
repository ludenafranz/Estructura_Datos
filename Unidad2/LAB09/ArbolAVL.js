// Estructura del Nodo AVL para el registro energético
class NodoAVL {
    constructor(idSensor, lectura) {
        this.idSensor = idSensor;
        this.lectura = lectura;
        this.altura = 1; // Un nodo hoja inicialmente tiene altura 1
        this.izquierdo = null;
        this.derecho = null;
    }
}

// Implementación Parcial del TDA AVL
class ArbolAVLSensores {
    constructor() {
        this.raiz = null;
    }

    // Método utilitario para obtener la altura (seguro contra null)
    getAltura(nodo) {
        if (nodo === null) return 0;
        return nodo.altura;
    }

    // Cálculo del Factor de Equilibrio  
    getBalance(nodo) {  
        if (nodo === null) return 0;  
        return this.getAltura(nodo.derecho) - this.getAltura(nodo.izquierdo);  
    }  
  
    // Rotación Simple a la Derecha (Right Rotation)  
    rotacionDerecha(y) {  
        let x = y.izquierdo;  
        let T2 = x.derecho;  
  
        // Realizar la rotación  
        x.derecho = y;  
        y.izquierdo = T2;  
  
        // Actualizar alturas (primero y, luego x)  
        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;  
        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;  
  
        return x; // Retornar la nueva raíz del subárbol  
    }  
  
    // Tarea del estudiante: Implementar rotacionIzquierda(x)
    rotacionIzquierda(x){
        let y = x.derecho;
        let T1 = y.izquierdo;

        y.izquierdo = x;
        x.derecho = T1
        
        x.altura = Math.max(this.getAltura(x.derecho), this.getAltura(x.izquierdo)) + 1;  
        y.altura = Math.max(this.getAltura(y.derecho), this.getAltura(y.izquierdo)) + 1; 

        return y;
    }

    //Metodo de insercion base con llamado a metodo insertarNodo
    insertar(idSensor, lectura){
        this.raiz = this.insertarNodo(this.raiz,idSensor, lectura);
    }
    //Insercion de nodo para recursividad
    insertarNodo(nodo,idSensor, lectura){
        if (nodo === null) {
            return new NodoAVL(idSensor, lectura);
        }

        //Revisa si el id es menor al nodo 
        if (idSensor < nodo.idSensor){
            nodo.izquierdo = this.insertarNodo(nodo.izquierdo, idSensor, lectura);
        }
        //Revisa si el id es menor al nodo 
        if (idSensor > nodo.idSensor){
            nodo.derecho = this.insertarNodo(nodo.derecho, idSensor, lectura);
        }

        nodo.altura = Math.max(
            this.getAltura(nodo.izquierdo),
            this.getAltura(nodo.derecho)
        ) + 1;

        let balance = this.getBalance(nodo)

         // Caso Izquierda-Izquierda (LL)
        if (balance < -1 && idSensor < nodo.izquierdo.idSensor) {
            return this.rotacionDerecha(nodo);
        }

        // Caso Derecha-Derecha (RR)
        if (balance > 1 && idSensor > nodo.derecho.idSensor) {
            return this.rotacionIzquierda(nodo);
        }

        // Caso Izquierda-Derecha (LR)
        if (balance < -1 && idSensor > nodo.izquierdo.idSensor) {
            nodo.izquierdo = this.rotacionIzquierda(nodo.izquierdo);
            return this.rotacionDerecha(nodo);
        }

        // Caso Derecha-Izquierda (RL)
        if (balance > 1 && idSensor < nodo.derecho.idSensor) {
            nodo.derecho = this.rotacionDerecha(nodo.derecho);
            return this.rotacionIzquierda(nodo);
        }

        return nodo;
    }

    //Metodo para buscar por el IdSensor
    buscar(idSensor) {
    let actual = this.raiz;
    while (actual !== null) {
        //Encuentra la coincidencia 
        if (idSensor === actual.idSensor) {
            return actual;
        }
        //Recorre y compara los nodos
        if (idSensor < actual.idSensor) {
            actual = actual.izquierdo;
        } else {
            actual = actual.derecho;
        }
    }

    return null;
    }
}

class RegistroEnergia {
    constructor() {
        // Generación de un registro de energía ficticio (ej. 110V a 240V)
        this.voltaje = +(110 + Math.random() * 130).toFixed(2);
    }
}

// Clase para la simulación principal
class SimulacionSmartGrid {
    static ejecutarPrueba() {
        const redElectrica = new ArbolAVLSensores();
        const numSensores = 100000;
        console.log(`Iniciando despliegue de ${numSensores} sensores inteligentes...`);
        // 1 y 2. Inserción completamente secuencial 
        // (Esto provocaría el peor caso O(n) en un BST normal)
        for (let i = 0; i < numSensores; i++) {
            let lectura = new RegistroEnergia(); 
            // TAREA DEL ESTUDIANTE: Descomentar la siguiente línea cuando 
            // el método insertar esté implementado.
            redElectrica.insertar(i, lectura); 
        }
        console.log("Red eléctrica AVL construida y balanceada con éxito.");
        // 3. Medición del tiempo de búsqueda
        const idBuscado = 99999;
        // Capturamos el tiempo con precisión submilisegundo en JS
        const inicioBusqueda = performance.now();
        // TAREA DEL ESTUDIANTE: Descomentar para ejecutar la búsqueda
        const resultado = redElectrica.buscar(idBuscado);
        
        const finBusqueda = performance.now();
        const tiempoMs = finBusqueda - inicioBusqueda;
        console.log(`Tiempo de búsqueda del Sensor ID ${idBuscado}: ${tiempoMs.toFixed(4)} ms.`);
    }
}
// Iniciar simulación
SimulacionSmartGrid.ejecutarPrueba();
