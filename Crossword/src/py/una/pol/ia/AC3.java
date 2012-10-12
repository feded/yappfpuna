package py.una.pol.ia;

public class AC3 {

    
    public AC3(Puzzle p) {
        this.p = p;
        
    }
    Dominio dominioActual[];
    Consistencia c;
    Puzzle p;
    int n;
    ConflictDirectedBackjumping cdb;
    String v[];

    public void doIt() {

        n = p.getNroPalabras();
        v = new String[n];
        c = new Consistencia(p);

        // Inicializamos las variables
        for (int i = 0; i < v.length; i++) {
            v[i] = "";
        }

       // dominioActual = Util.inicializarDominio(p) ;
        dominioActual = Util.desordenar(Util.inicializarDominio(p), n);
        dominioActual = eliminarInconsistencia();
        cdb = new ConflictDirectedBackjumping(p, dominioActual);
        cdb.doIt();
        v = cdb.palabras;
/*
        int i = 0;
        long veces = 0;
        while (i >= 0 && i < n) {
            // Instanciamos la variable
            v[i] = seleccionarValor(i);
            while (!consistent() && v[i].compareTo("Se acabo dominio") != 0) {
                v[i] = seleccionarValor(i);
            }

            if (v[i].compareTo("Se acabo dominio") == 0) {
                habilitar(i);
                v[i] = "";
                veces++;
                i--;
            } else {
//				System.out.println("v[" + i + "] = " + v[i]);
                i++;
            }
        }
*/
        System.out.println("Resultado");
        System.out.println(p.toString(v));
    }

    /*
     * Ponemos disponibles de vuelta todos los valores del dominio de una
     * variable en particular
     */
    private void habilitar(int i) {
        for (int k = 0; k < dominioActual[i].valores.length; k++) {
            dominioActual[i].inconsistentes[k] = false;
        }
    }

    /*
     * Nos permite saber si estamos en un estado consistente
     */
    private boolean consistent() {
        return c.probarConsitencia(v);
    }

    /*
     * Instaciamos nuestra variable con unos de sus posibles valores, al
     * encontrar una valor que aun no se ha probado que es inconsiste. Una vez
     * seleccionado un valor, se verifica si aun no se ha asignado a otra
     * variable previamente. En caso de no encontrar ningun valor consistente,
     * nos indica que tenemos que retroceder
     */
    private String seleccionarValor(int k) {
        for (int t = 0; t < dominioActual[k].valores.length; t++) {
            if (!dominioActual[k].inconsistentes[t]) {
                if (!seAsigno(dominioActual[k].valores[t], k)) {
                    dominioActual[k].inconsistentes[t] = true;
                    return dominioActual[k].valores[t];
                }
            }
        }
        return "Se acabo dominio";
    }

    /*
     * Nos permite saber si un valor se ha asignado a una variable.
     */
    private boolean seAsigno(String temp, int k) {
        for (int m = 0; m < k; m++) {
            if (v[m] == temp) {
                return true;
            }
        }
        return false;
    }

    private Dominio[] eliminarInconsistencia() {

        int palabraX = 0;
        int palabraY = 0;
        int indiceX = 0;
        int indiceY = 0;
        String pX;
        String pY;
        int x;
        int y;
        boolean flg;

        for (int i = 0; i < p.filas; i++) {
            for (int j = 0; j < p.columnas; j++) {
                palabraX = p.getPalabraX(i, j);
                if (palabraX < 1) {
                    continue;
                }
                palabraY = p.getPalabraY(i, j);
                if (palabraY < 1) {
                    continue;
                }
                x = palabraX - 1;
                y = palabraY - 1;
                indiceX = p.getPalabraXindice(i, j);
                indiceY = p.getPalabraYindice(i, j);
                // aca vamos a estar solamente si hay palabras
                // en X
                for (int k = 0; k < dominioActual[x].valores.length; k++) {

                    pX = dominioActual[x].valores[k];
                    flg = false;
                    for (int l = 0; l < dominioActual[y].valores.length; l++) {
                        pY = dominioActual[y].valores[l];
                        if (pX.charAt(indiceX) == pY.charAt(indiceY)) {
                            flg = true;
                        }
                    }
                    if (!flg) {
                        dominioActual[x].inconsistentes[k] = true;
                    }
                }
                for (int k = 0; k < dominioActual[y].valores.length; k++) {
                    pY = dominioActual[y].valores[k];
                    flg = false;
                    for (int l = 0; l < dominioActual[x].valores.length; l++) {
                        pX = dominioActual[x].valores[l];
                        if (pY.charAt(indiceY) == pX.charAt(indiceX)) {
                            flg = true;
                        }
                    }
                    if (!flg) {
                        dominioActual[y].inconsistentes[k] = true;
                    }
                }
            }
        }
        Dominio dominio[] = Util.acotar(dominioActual, true);

        return dominio;
    }
}