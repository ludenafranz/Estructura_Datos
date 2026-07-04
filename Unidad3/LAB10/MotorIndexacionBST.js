class NodoBusqueda {
    constructor(keyword, urlCache) {
        this.keyword = keyword; // Llave de búsqueda (ej."estructura de datos")
        this.urlCache = urlCache; // Valor (ej."es.wikipedia.org/...")
        this.visitas = 1; // Frecuencia de búsqueda;
        this.izquierdo = null;
        this.derecho = null;
    }
}

// Implementación del TDA Árbol Binario de Búsqueda
class MotorIndexacionBST {
    constructor() {
        this.raiz = null;
    }
    // Indexar nueva consulta en el historial
    indexar(keyword, urlCache) {
        const nuevoNodo = new NodoBusqueda(keyword, urlCache);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this.insertarNodo(this.raiz, nuevoNodo);
        }
    }

    insertarNodo(nodoActual, nuevoNodo) {
        // TAREA DEL ESTUDIANTE: Implementar comparaciónalfabética(localeCompare).
        // Si el 'keyword' ya existe, incremente el contador'visitas' en 1.
        if (nuevoNodo.keyword.localeCompare(nodoActual.keyword) === 0) {
            nodoActual.visitas++;
            return;
        }
        if (nuevoNodo.keyword.localeCompare(nodoActual.keyword) < 0) {
            if (nodoActual.izquierdo === null) {
                nodoActual.izquierdo = nuevoNodo;
                return;
            }
            return this.insertarNodo(nodoActual.izquierdo, nuevoNodo)
        } else {
            if (nodoActual.derecho === null) {
                nodoActual.derecho = nuevoNodo;
                return;
            }
            return this.insertarNodo(nodoActual.derecho, nuevoNodo)
        }

    }

    //Buscar una palabra clave en el historial (O(log n)esperado)
    buscar(keyword) {
        let actual = this.raiz;
        while (actual !== null) {
            if (keyword.localeCompare(actual.keyword) === 0) {
                return actual;
            }
            if (keyword.localeCompare(actual.keyword) < 0) {
                actual = actual.izquierdo;
            } else {
                actual = actual.derecho;
            }
        }
        return null;
    }

    buscarCiclosCPU(keyword) {
        let actual = this.raiz;
        let ciclosCPU = 0;
        while (actual !== null) {
            ciclosCPU++;
            if (keyword.localeCompare(actual.keyword) === 0) {
                console.log("Ciclos de CPU:", ciclosCPU);
                return ciclosCPU;
            }
            if (keyword.localeCompare(actual.keyword) < 0) {
                actual = actual.izquierdo;
            } else {
                actual = actual.derecho;
            }
        }
        console.log("Ciclos de CPU:", ciclosCPU);
        return ciclosCPU;
    }

    // Recorrido Inorden: Exportar el historial ordenado alfabéticamente (A-Z)
    exportarHistorial(nodo = this.raiz) {
        if (nodo !== null) {
            this.exportarHistorial(nodo.izquierdo);
            console.log(nodo.keyword);
            this.exportarHistorial(nodo.derecho);
        }
    }
}

//Simulación del Peor Escenario 
let palabras = [];
for (let i = 1; i <= 20000; i++) {
    palabras.push("palabra" + i);
}
let motorDegenerado = new MotorIndexacionBST();
for (let i = 0; i < palabras.length; i++) {
    motorDegenerado.indexar(
        palabras[i],
        "https://google.com/" + palabras[i]
    );

}

let ciclosDegenerado = motorDegenerado.buscarCiclosCPU("palabra19999");

console.log(
    "Búsqueda en árbol degenerado:",
    ciclosDegenerado,
    "ciclos de CPU"
);

//Refactorización Sostenible
//Algoritmo de barajado 
function fisherYates(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let auxiliar = arreglo[i];
        arreglo[i] = arreglo[j];
        arreglo[j] = auxiliar;
    }
}

let palabrasAleatorias = [...palabras];
fisherYates(palabrasAleatorias);
let motorBalanceado = new MotorIndexacionBST();

for (let i = 0; i < palabrasAleatorias.length; i++) {
    motorBalanceado.indexar(
        palabrasAleatorias[i],
        "https://google.com/" + palabrasAleatorias[i]
    );
}

let ciclosBalanceado = motorBalanceado.buscarCiclosCPU("palabra19999");

console.log(
    "Búsqueda en árbol pseudo-balanceado:",
    ciclosBalanceado,
    "ciclos de CPU"
);

let ahorro =
    ((ciclosDegenerado - ciclosBalanceado)
        / ciclosDegenerado)
    * 100;

console.log(
    "Porcentaje de ahorro:",
    ahorro.toFixed(2) + "%"
);

