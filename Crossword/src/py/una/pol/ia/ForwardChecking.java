package py.una.pol.ia;

import java.util.Arrays;

public class ForwardChecking {

	Puzzle p;
	int n;
	String v[];
	Dominio dominioActual[];

	public ForwardChecking(Puzzle p) {
		this.p = p;
		this.n = p.getNroPalabras();
		v = new String[n];
		// El dominio[i] son los posibles valores que puede tomar la variable
		// v[i]
		dominioActual = Util.inicializarDominio(p);
		Arrays.fill(v, "");
	}

	// Cada word es una variable. V[i] es el valor asignado a la variable i
	public void doIt() {

		int i = 0;
		while (i >= 0 && i < n) {
			// Instanciamos la variable
			v[i] = seleccionarValor(i);
			if (v[i].compareTo("Se acabo dominio") == 0) {
				habilitar(i);
				v[i] = "";
				System.out.println("Backtracking");
				i--;
			} else {
				System.out.println("v[" + i + "] = " + v[i]);
				forwardCheck(i);
				i++;
			}
		}
		System.out.println("Resultado");
		for (int p = 0; p < n; p++) {
			System.out.println("v[" + p + "] = " + v[p]);
		}
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

	private void forwardCheck(int i) {
		String valor = v[i];
		for (int j = i + 1; j < 10; j++) {
			for (int m = 0; m < dominioActual[j].valores.length; m++) {
				if (dominioActual[j].valores[m] == valor) {
					dominioActual[j].inconsistentes[m] = true;
				}
			}
		}
		eliminarInconsistencias(i);

	}

	private void eliminarInconsistencias(int nroPalabra) {
		// Restriciones para la primera variable
		String actual = v[nroPalabra];

		int dominioX = 0;
		int dominioY = 0;
		int indiceX = 0;
		int indiceY = 0;
		for (int i = 0; i < p.filas; i++) {
			for (int j = 0; j < p.columnas; j++) {
				if (p.getPalabraX(i, j) - 1 != nroPalabra
						&& p.getPalabraY(i, j) - 1 != nroPalabra) {
					continue;
				}
				dominioX = p.getPalabraX(i, j) - 1;
				dominioY = p.getPalabraY(i, j) - 1;
				if (dominioX < 0 || dominioY < 0)
					continue;
				indiceX = p.getPalabraXindice(i, j);
				indiceY = p.getPalabraYindice(i, j);

				// si yo soy X
				if (dominioX == nroPalabra) {
					for (int k = 0; k < dominioActual[dominioY].valores.length; k++) {
						if (actual.charAt(indiceX) != dominioActual[dominioY].valores[k]
								.charAt(indiceY)) {
							dominioActual[dominioY].inconsistentes[k] = true;
						}
					}
				} else {
					for (int k = 0; k < dominioActual[dominioX].valores.length; k++) {
						System.out.println(actual);

						char uno = actual.charAt(indiceY);
						char dos = dominioActual[dominioX].valores[k]
								.charAt(indiceX);
						if (uno != dos) {
							dominioActual[dominioX].inconsistentes[k] = true;
						}
					}
				}

			}
		}
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
}