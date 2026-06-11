package Java;

/**
 * @author Franz Ludeña
 */

public class InsertSort {
     public static void insertionSort(int[] arr) {

        // Recorre el arreglo desde el segundo elemento
        for (int i = 1; i < arr.length; i++) {

            int key = arr[i];
            int j = i - 1;

            // Desplaza elementos mayores
            while (j >= 0 && arr[j] > key) {

                arr[j + 1] = arr[j];
                j--;
            }

            // Inserta la clave
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {

        int[] arr = {5, 2, 4, 6, 1, 3};

        insertionSort(arr);

        // Mostrar arreglo ordenado
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
