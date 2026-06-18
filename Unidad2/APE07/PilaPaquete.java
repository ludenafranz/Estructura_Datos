package APE07;

public class PilaPaquete {
    private Paquete[] stack;
    private int top;

    public PilaPaquete(int capacidad) {
        this.stack = new Paquete[capacidad];
        this.top = -1;
    }

    public void push(Paquete p) {
        if (top < stack.length - 1) {
            top ++;
            stack[top] = p;
        } else {
            throw new IllegalStateException("Pila llena no se puede ingresar datos");
        }
    }

    public Paquete pop() {
        if (isEmpty())
            throw  new IllegalStateException("Pila vacia");
        Paquete p = stack[top];
        stack[top] = null;
        top --;
        return p;
    }

    public boolean isEmpty (){
        if (top < 0){
            return true;
        }
        return false;
    }


}
