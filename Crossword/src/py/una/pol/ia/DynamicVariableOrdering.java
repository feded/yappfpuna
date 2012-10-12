package py.una.pol.ia;

public class DynamicVariableOrdering {

	Puzzle p;
	// Numero de variables actualmente en el problema
	int n;

	// Cada word es una variable. V[i] es el valor asignado a la variable i
	String v[];
	Consistencia c;
	Dominio dominioActual[];

	public DynamicVariableOrdering(Puzzle p) {
		this.p = p;
		c = new Consistencia(p);
		n = p.getNroPalabras();
		v = new String[n];
		dominioActual = Util.inicializarDominio(p);
	}

	public void doIt() {

		// Inicializamos las variables
		for (int i = 0; i < v.length; i++) {
			v[i] = "";
		}

		int i = -1;
		while (!encontroSolucion()) {
			// Instanciamos la variable

			i = aInstanciar(i);
			v[i] = seleccionarValor(i);
			while (!consistent() && v[i].compareTo("Se acabo dominio") != 0) {
				v[i] = seleccionarValor(i);
			}

			if (consistent()) {
				limpiar();
			}
			if (v[i].compareTo("Se acabo dominio") == 0) {
				habilitar(i);
				v[i] = "";
				System.out.println("Backtracking");
				// i--;
			} else {
				System.out.println("v[" + i + "] = " + v[i]);
				// i++;
			}
		}

		System.out.println(p.toString(v));
	}

	private void limpiar() {
		for (Dominio d : dominioActual)
			d.visitado = false;
	}

	private int aInstanciar(int anterior) {
		int menor = dominioActual[0].valores.length;
		int t = 0;
		for (int i = 0; i < dominioActual.length && !dominioActual[i].visitado; i++) {
			if (i != anterior) {
				if (v[i].compareTo("") == 0) {
					if (menor >= dominioActual[i].valores.length) {
						menor = dominioActual[i].valores.length;
						t = i;
					}
				}
			}

		}
		dominioActual[t].visitado = true;
		return t;
	}

	private boolean encontroSolucion() {
		for (int i = 0; i < n; i++) {
			if (v[i].compareTo("") == 0) {
				return false;
			}
		}
		return true;
	}

	/*
	 * Nos permite saber si un valor se ha asignado a una variable.
	 */
	private boolean seAsigno(String temp, int k) {
		for (int m = 0; m < n; m++) {
			if (v[m] == temp) {
				return true;
			}
		}
		return false;
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
	 * Nos permite saber si estamos en un estado consistente
	 */
	private boolean consistent() {
		return c.probarConsitencia(v);
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

}