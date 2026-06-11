package Java;

/**
 * @author Franz Ludeña
 */

public class QuickSort {
    // Método principal del algoritmo QuickSort
    public static void quickSort(int[] arr, int low, int high) {

        // Verifica si todavía existen elementos por ordenar
        if (low < high) {

            // Obtiene la posición correcta del pivote
            int pivotIndex = partition(arr, low, high);

            // Ordena la parte izquierda del pivote
            quickSort(arr, low, pivotIndex - 1);

            // Ordena la parte derecha del pivote
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    // Método para dividir el arreglo usando un pivote
    public static int partition(int[] arr, int low, int high) {

        // Selecciona el último elemento como pivote
        int pivot = arr[high];

        // Índice del elemento menor
        int i = low - 1;

        // Recorre el arreglo desde low hasta high - 1
        for (int j = low; j < high; j++) {

            // Verifica si el elemento actual es menor al pivote
            if (arr[j] < pivot) {

                // Avanza el índice del elemento menor
                i++;

                // Intercambio de elementos
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Coloca el pivote en su posición correcta
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        // Retorna la posición final del pivote
        return i + 1;
    }

    public static void main(String[] args) {

        // Arreglo de números desordenados
        int[] arr = {5, 1, 6, 2, 4, 3};

        // Llamada al algoritmo QuickSort
        quickSort(arr, 0, arr.length - 1);

        // Muestra el arreglo ordenado
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
