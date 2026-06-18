package APE07;

import java.util.Arrays;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        CentroDistribucion centro = new CentroDistribucion();
        Random ram = new Random();
        Paquete[] paquetes = new Paquete[10000];

        for (int i = 0; i < 10000; i++) {
            paquetes[i] = new Paquete(ram.nextInt(10000), i + 1001);
        }

        int idObjetivo = paquetes[9999].getId();

        long inicio = System.nanoTime();
        centro.buscarLineal(paquetes, idObjetivo);
        System.out.println("Tiempo Lineal: " + (System.nanoTime() - inicio) / 1e9 + " segundos");

        Arrays.sort(paquetes, (a, b) -> Integer.compare(a.getId(), b.getId()));
        inicio = System.nanoTime();
        centro.buscarBinario(paquetes, idObjetivo);
        System.out.println("Tiempo Binario: " + (System.nanoTime() - inicio) / 1e9 + " segundos");

        // Random ram = new Random(42);
        // System.out.println("General semilla de 1000 paquetes");

        // for (int i = 0; i < 1000000; i++) {
        // int cp = ram.nextInt(50) + 110101;
        // centro.recibirCajaCamion(new Paquete(i, cp));
        // }

        // long first = System.currentTimeMillis();
        // centro.ordenarPaquetes();
        // long end = System.currentTimeMillis();

        // double tiemposegundo = (end - first) / 1000.0;
        // System.out.println(tiemposegundo);

        // System.out.println("Despachar los paquetes a los clientes: ");
        // Paquete despacho = new Paquete();

        // if (despacho != null) {
        // despacho = centro.despacharAlCliente();
        // System.out.println("Paquete entregado: " + despacho.toString());
        // despacho = centro.despacharAlCliente();
        // System.out.println("Paquete entregado: " + despacho.toString());
        // }

    }
}