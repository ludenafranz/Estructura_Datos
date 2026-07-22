/**
 * @fileoverview Sistema de enrutamiento eco-eficiente para logística verde.
 * Implementa Dijkstra optimizado con Min-Heap para minimizar huella de carbono y consumo energético.
 */

/**
 * Representa una Cola de Prioridad basada en un Min-Heap binario.
 * Optimiza la extracción del nodo con menor consumo energético a O(log N).
 * @template T
 */
class MinHeapPriorityQueue {
  constructor() {
    /** @type {Array<{val: T, priority: number}>} */
    this.heap = [];
  }

  /**
   * Obtiene la cantidad de elementos en la cola.
   * @returns {number}
   */
  get size() {
    return this.heap.length;
  }

  /**
   * Verifica si la cola está vacía.
   * @returns {boolean}
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Inserta un elemento con su costo/prioridad asociada.
   * @param {T} val - Identificador del nodo o centro logístico.
   * @param {number} priority - Costo acumulado (ej. kWh, kg CO2e).
   */
  enqueue(val, priority) {
    this.heap.push({ val, priority });
    this._bubbleUp();
  }

  /**
   * Extrae el elemento con la menor prioridad (menor impacto/consumo).
   * @returns {{val: T, priority: number}|undefined}
   */
  dequeue() {
    if (this.isEmpty()) return undefined;
    if (this.size === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._sinkDown();
    return min;
  }

  /** @private */
  _bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];

      if (element.priority >= parent.priority) break;

      this.heap[idx] = parent;
      this.heap[parentIdx] = element;
      idx = parentIdx;
    }
  }

  /** @private */
  _sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }
}

/**
 * Modela la red de distribución logística para el cálculo de rutas eco-eficientes.
 */
class LogisticaGrafo {
  /**
   * @param {number} numNodos - Cantidad total de centros de acopio/distribución.
   */
  constructor(numNodos) {
    this.numNodos = numNodos;
    /** @type {Array<Array<{nodo: number, peso: number}>>} */
    this.adyacencia = Array.from({ length: numNodos }, () => []);
  }

  /**
   * Registra un tramo vial/transporte con su costo ecológico asociado.
   * @param {number} u - Centro origen.
   * @param {number} v - Centro destino.
   * @param {number} consumoEnergetico - Consumo en kWh, litros de combustible o emisiones CO2.
   */
  agregarRuta(u, v, consumoEnergetico) {
    this.adyacencia[u].push({ nodo: v, peso: consumoEnergetico });
  }

  /**
   * Calcula la ruta de mínimo impacto ecológico entre dos puntos mediante el algoritmo de Dijkstra.
   * Complejidad Temporal: O((V + E) log V) gracias al Min-Heap.
   *
   * @param {number} inicio - ID del centro de acopio de origen.
   * @param {number} fin - ID del centro de acopio de destino.
   * @returns {{consumoTotal: number, ruta: number[]}} Objeto con el consumo óptimo y la secuencia de nodos.
   */
  dijkstra(inicio, fin) {
    const distancias = new Float64Array(this.numNodos).fill(Infinity);
    const predecesores = new Int32Array(this.numNodos).fill(-1);
    const pq = new MinHeapPriorityQueue();

    distancias[inicio] = 0;
    pq.enqueue(inicio, 0);

    while (!pq.isEmpty()) {
      const { val: u, priority: d } = pq.dequeue();

      // Early exit al alcanzar el destino deseado
      if (u === fin) break;
      if (d > distancias[u]) continue;

      const vecinos = this.adyacencia[u];
      for (let i = 0; i < vecinos.length; i++) {
        const { nodo: v, peso } = vecinos[i];
        const nuevoConsumo = distancias[u] + peso;

        if (nuevoConsumo < distancias[v]) {
          distancias[v] = nuevoConsumo;
          predecesores[v] = u;
          pq.enqueue(v, nuevoConsumo);
        }
      }
    }

    return {
      consumoTotal: distancias[fin],
      ruta: this._reconstruirRuta(predecesores, fin)
    };
  }

  /**
   * Reconstruye el trayecto óptimo de manera eficiente en tiempo O(K).
   * @param {Int32Array} predecesores - Arreglo de nodos previos.
   * @param {number} nodoFin - Nodo de llegada.
   * @returns {number[]} Secuencia en orden cronológico de la ruta optimizada.
   * @private
   */
  _reconstruirRuta(predecesores, nodoFin) {
    if (predecesores[nodoFin] === -1 && nodoFin !== 0) return [];

    const ruta = [];
    let actual = nodoFin;

    while (actual !== -1) {
      ruta.push(actual);
      actual = predecesores[actual];
    }

    return ruta.reverse();
  }
}

// --- Pruebas de simulación ---
const redLogistica = new LogisticaGrafo(5);
redLogistica.agregarRuta(0, 1, 4);
redLogistica.agregarRuta(0, 2, 2);
redLogistica.agregarRuta(1, 3, 5);
redLogistica.agregarRuta(2, 1, 1);
redLogistica.agregarRuta(2, 4, 8);
redLogistica.agregarRuta(3, 4, 3);

const resultado = redLogistica.dijkstra(0, 4);

console.log("Ruta óptima eco-eficiente:");
console.log("Centros visitados:", resultado.ruta.join(" -> "));
console.log("Consumo total estimado:", resultado.consumoTotal, "kWh");