package Java;

/**
 * @author Franz Ludeña
 */

public class MergeSort {

    /*
     * Método encargado de combinar dos subarreglos ordenados
     * en un único arreglo ordenado.
     */
    public void merge_arrays(int[] arr, int l, int m, int r) {

        // Tamaño del subarreglo izquierdo
        int n1 = m - l + 1;

        // Tamaño del subarreglo derecho
        int n2 = r - m;

        // Arreglos auxiliares
        int[] L = new int[n1];
        int[] R = new int[n2];

        // Copiar elementos al arreglo izquierdo
        for (int i = 0; i < n1; i++) {
            L[i] = arr[l + i];
        }

        // Copiar elementos al arreglo derecho
        for (int j = 0; j < n2; j++) {
            R[j] = arr[m + 1 + j];
        }

        // Variables de control
        int i = 0; // Índice del arreglo izquierdo
        int j = 0; // Índice del arreglo derecho
        int k = l; // Índice del arreglo principal

        // Comparar elementos y ordenar
        while (i < n1 && j < n2) {

            // Verifica cuál elemento es menor
            if (L[i] <= R[j]) {

                arr[k] = L[i];
                i++;

            } else {

                arr[k] = R[j];
                j++;
            }

            k++;
        }

        // Copiar elementos restantes del arreglo izquierdo
        while (i < n1) {

            arr[k] = L[i];
            i++;
            k++;
        }

        // Copiar elementos restantes del arreglo derecho
        while (j < n2) {

            arr[k] = R[j];
            j++;
            k++;
        }
    }

    /*
     * Método principal de Merge Sort
     * Divide el arreglo recursivamente
     */
    public void merge_sort(int arr[], int l, int r) {

        // Verifica si el arreglo puede dividirse
        if (l < r) {

            // Calcula el punto medio
            int m = l + (r - l) / 2;

            // Ordena mitad izquierda
            merge_sort(arr, l, m);

            // Ordena mitad derecha
            merge_sort(arr, m + 1, r);

            // Combina ambas mitades
            merge_arrays(arr, l, m, r);
        }
    }

    // Método principal ejecutable
    public static void main(String[] args) {

        // Arreglo de números desordenados
        int[] arr = {5, 1, 6, 2, 4, 3};

        // Crear objeto MergeSort
        MergeSort ms = new MergeSort();

        // Llamada al algoritmo
        ms.merge_sort(arr, 0, arr.length - 1);

        // Mostrar arreglo ordenado
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
