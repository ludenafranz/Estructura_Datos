package APE07;
public class Paquete {
    private int id;
    private int codigoPostal;

    public Paquete() {
    }

    public Paquete(int id, int codigoPostal){
        this.id = id;
        this.codigoPostal =codigoPostal;
    }

    public int getcodigoPostal(){
        return codigoPostal;
    }

    public void setCodigoPostal(int codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Paquete{" +
                "id=" + id +
                ", codigoPostal=" + codigoPostal +
                '}';
    }
}