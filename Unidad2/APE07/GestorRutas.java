package APE07;

public class GestorRutas {
    public static void ordenar(Paquete[] datos) {
        int n = datos.length;
        Paquete temp;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (datos[j].getcodigoPostal() > datos[j + 1].getcodigoPostal()) {
                    temp = datos[j];
                    datos[j] = datos[j + 1];
                    datos[j + 1] = temp;
                }
            }
        }
    }
}
