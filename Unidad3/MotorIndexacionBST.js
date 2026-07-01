const { act } = require("react");

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
        if (nuevoNodo.keyword === nodoActual.keyword) {
            nodoActual.visitas++;
            return;
        }
        if (nuevoNodo.keyword < nodoActual.keyword) {
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

    // Buscar una palabra clave en el historial (O(log n)esperado)
    buscar(keyword) {
        let actual = this.raiz;
        while (actual !== null) {
            if (keyword === actual.keyword) {
                return actual;
            }
            if (keyword < actual.keyword) {
                actual = actual.izquierdo;
            } else {
                actual = actual.derecho;
            }
        }
        return null;
    }
    // Recorrido Inorden: Exportar el historial ordenado alfabéticamente (A-Z)
    exportarHistorial(nodo = this.raiz) {
        if (nodo !== null) {
            this.inorder(nodo.izquierdo);
            console.log(nodo.keyword);
            this.inorder(nodo.derecho);
        }
    }
}
