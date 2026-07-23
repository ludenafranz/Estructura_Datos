/**
 * Clase encargada de gestionar la topología
 * de los centros de acopio de la red UNLD.
 *
 * @class AuditoriaRedUrbana
 */
class AuditoriaRedUrbana {

    /**
     * Constructor de la clase.
     * Inicializa la estructura de almacenamiento.
     *
     * Complejidad temporal: O(1)
     */
    constructor() {
        this.centrosAcopio = new Map();
    }


    /**
     * Ejecuta una simulación de carga estocástica
     * sobre la red mediante eventos aleatorios.
     *
     * @param {number} eventos Cantidad de eventos simulados.
     *
     * Complejidad temporal: O(n)
     */
    simularCargaEstocastica(eventos) {
        console.log("Iniciando auditoría de estrés sobre red UNLD...");
        for (let i = 0; i < eventos; i++) {
            const nodoId = Math.floor(Math.random() * 100);
            if (!this.centrosAcopio.has(nodoId)) {
                this.centrosAcopio.set(nodoId, []);
            }
            this.centrosAcopio.get(nodoId)
                .push(`Paquete-Eco-${i}`);
        }
        console.log(
            `Auditoría finalizada: ${this.centrosAcopio.size} nodos procesados.`
        );
    }
}


const unlD = new AuditoriaRedUrbana();
unlD.simularCargaEstocastica(10000);