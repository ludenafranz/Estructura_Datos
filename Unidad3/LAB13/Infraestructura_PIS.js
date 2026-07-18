// Implementación del Grafo mediante Listas de Adyacencia en JS
class GrafoInfraestructura {
    constructor() {
        this.listaAdyacencia = new Map();
        this.nombresAreas = new Map();
    }
    registrarArea(id, nombre) {
        this.nombresAreas.set(id, nombre);
        if (!this.listaAdyacencia.has(id)) {
            this.listaAdyacencia.set(id, []);
        }
    }
    agregarRuta(origen, destino, distancia) {
        this.listaAdyacencia.get(origen).push({ nodo: destino, distancia });
        this.listaAdyacencia.get(destino).push({ nodo: origen, distancia });
    }
    imprimirMapaRutas() {
        for (let [areaId, conexiones] of this.listaAdyacencia) {
            const nombre = this.nombresAreas.get(areaId);
            const rutas = conexiones.map(c => `${this.nombresAreas.get(c.nodo)} (${c.distancia}m)`).join(", ");
            console.log(`${nombre} está conectado con: ${rutas}`);
        }
    }
}

const red = new GrafoInfraestructura();
const centros = ["Centro de Producción", "Centro de Acopio", "Centro de Distribución", "Almacén", "Punto de Entrega"];
centros.forEach((nombre, i) => red.registrarArea(i, nombre));
red.agregarRuta(0, 3, 15); // Producción a Almacén
red.agregarRuta(0, 1, 30); // Producción a Acopio
red.agregarRuta(1, 2, 10); // Acopio a Distribución
red.agregarRuta(4, 2, 20); // Punto de Entrega a Distribución
red.agregarRuta(3, 4, 25); // Almacén a Punto de Entrega
red.imprimirMapaRutas();

const redSimple = new GrafoInfraestructura();
redSimple.registrarArea(0, "Centro de Producción");
redSimple.registrarArea(3, "Almacén");
redSimple.agregarRuta(0, 3, 15); // Producción a Almacén (15 km)
redSimple.imprimirMapaRutas();