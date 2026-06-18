package APE07;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;

public class CentroDistribucion {
    private ArrayList<Paquete> inventario;
    private Queue<Paquete> paquetes;

    public CentroDistribucion() {
        this.inventario = new ArrayList<>();
    }

    public void recibirCajaCamion(Paquete p) {
        this.inventario.add(p);
    }

    public Paquete despacharAlCliente() {
        if (!this.paquetes.isEmpty()) {
            return this.paquetes.poll();
        }
        return null;
    }
    
    /*
    Metodo de busqueda lineal Tarea APE07
    */
    public int buscarLineal(Paquete[] lista, int id) {
        for (int i = 0; i < lista.length; i++) {
            if (lista[i].getId() == id)
                return i;
        }
        return -1;
    }

    /*
    Metodo de busqueda binaria Tarea APE07
    */
    public int buscarBinario(Paquete[] lista, int id) {
        int bajo = 0, alto = lista.length - 1;
        while (bajo <= alto) {
            int medio = bajo + (alto - bajo) / 2;
            if (lista[medio].getId() == id)
                return medio;
            if (lista[medio].getId() < id)
                bajo = medio + 1;
            else
                alto = medio - 1;
        }
        return -1;
    }

    public void ordenarPaquetes() {
        merge_sort(0, this.inventario.size() - 1);
        enviarPaquete();
    }

    private void enviarPaquete() {
        paquetes = new ArrayDeque<>();
        paquetes.addAll(this.inventario);
        this.inventario.clear();
    }

    private void merge_arrays(int l, int m, int r) {

        int n1 = m - l + 1;
        int n2 = r - m;

        Paquete[] L = new Paquete[n1];
        Paquete[] R = new Paquete[n2];

        for (int i = 0; i < n1; i++) {
            L[i] = this.inventario.get(l + i);
        }

        for (int j = 0; j < n2; j++) {
            R[j] = this.inventario.get(m + 1 + j);
        }

        int i = 0;
        int j = 0;
        int k = l;

        while (i < n1 && j < n2) {

            if (L[i].getcodigoPostal() >= R[j].getcodigoPostal()) {
                this.inventario.set(k, L[i]);
                i++;
            } else {
                this.inventario.set(k, R[j]);
                j++;
            }
            k++;
        }

        while (i < n1) {
            this.inventario.set(k, L[i]);
            i++;
            k++;
        }

        while (j < n2) {
            this.inventario.set(k, R[j]);
            j++;
            k++;
        }
    }

    private void merge_sort(int l, int r) {

        if (l < r) {
            int m = l + (r - l) / 2;

            merge_sort(l, m);
            merge_sort(m + 1, r);
            merge_arrays(l, m, r);
        }
    }

}
