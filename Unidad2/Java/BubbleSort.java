package Java;

/**
 * @author Franz Ludeña
 */

public class BubbleSort {
    public static void bubbleSort(int[] nums) {

        int size = nums.length;
        int temp;

        // Bucle principal
        for (int i = 0; i < size - 1; i++) {

            // Compara elementos vecinos
            for (int j = 0; j < size - i - 1; j++) {

                // Intercambia posiciones
                if (nums[j] > nums[j + 1]) {

                    temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
        }
    }
    public static void main(String[] args) {

        int[] nums = {5, 1, 6, 2, 4, 3};

        bubbleSort(nums);

        // Mostrar arreglo ordenado
        for (int num : nums) {
            System.out.print(num + " ");
        }
    }
}
