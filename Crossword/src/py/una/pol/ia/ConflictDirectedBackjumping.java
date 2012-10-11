package py.una.pol.ia;

import java.util.Arrays;

public class ConflictDirectedBackjumping {

	Puzzle p;
	Consistencia c;
	Dominio[] dominio;
	int aSaltar;
	int nroPalabras;
	String[] palabras;

	public ConflictDirectedBackjumping(Puzzle puzzle) {
		this.p = puzzle;
		this.c = new Consistencia(p);
		dominio = Util.inicializarDominio(p);
		nroPalabras = p.getNroPalabras();
		for (Dominio d : dominio)
			Util.volcar(d.valores);

	}

	public void doIt() {
		palabras = new String[nroPalabras];
		Arrays.fill(palabras, "");

		int i = 0;
		while (i >= 0 && i < nroPalabras) {
			palabras[i] = "";
			if (palabras[0].equals("aaa") && palabras[1] != null
					&& palabras[1].equals("ababa") && palabras[2] != null
					&& palabras[2].equals("debauch") && palabras[3] != null
					&& palabras[3].equals("bare")) {
				System.out.println(palabras[i]);
			}
			if (i == nroPalabras - 1) {
				i = nroPalabras - 1;
			}
			boolean valor;
			aSaltar = 0;
			int temp;
			do {
				palabras[i] = seleccionarValor(i);
				valor = c.probarConsitencia(palabras);

				if (!valor) {
					temp = probar(i);
					if (aSaltar < temp)
						aSaltar = temp;
				}
			} while (!valor && palabras[i] != null);
			if (palabras[i] == null) {
				System.out.println("BAAACK - " + i);
				if (aSaltar == 0)
					i--;
				else
					i = aSaltar;
				limpiar(i + 1);
			} else {
				i++;
			}
		}
		System.out.println(p.toString(palabras));
	}

	private String seleccionarValor(int orden) {
		for (int i = 0; i < dominio[orden].valores.length; i++) {
			if (!dominio[orden].inconsistentes[i]) {
				// if (!yaUsado(dominio[orden].valores[i], orden)) {
				dominio[orden].inconsistentes[i] = true;
				return dominio[orden].valores[i];
				// }
			}
		}
		return null;
	}

	private void limpiar(int orden) {
		for (int i = orden; i < p.getNroPalabras(); i++) {
			palabras[i] = null;
			for (int k = 0; k < dominio[i].valores.length; k++) {
				dominio[i].inconsistentes[k] = false;
			}
		}
	}

	private int probar(int nroPalabra) {
		for (int i = 0; i < p.filas; i++) {
			for (int j = 0; j < p.columnas; j++) {
				if (p.get(i, j) == Puzzle.NULO)
					continue;
				int palabraEnX = p.getPalabraX(i, j) - 1;
				int palabraEnY = p.getPalabraY(i, j) - 1;
				if (palabraEnX != nroPalabra && palabraEnY != nroPalabra)
					continue;
				if (!test(palabras[palabraEnX]))
					continue;
				if (!test(palabras[palabraEnY]))
					continue;
				int indiceX = p.getPalabraXindice(i, j);
				int indiceY = p.getPalabraYindice(i, j);
				if (palabras[palabraEnX].charAt(indiceX) != palabras[palabraEnY]
						.charAt(indiceY))
					return (palabraEnX == nroPalabra) ? palabraEnY : palabraEnX;
			}
		}

		return -1;
	}

	public boolean test(String palabras) {
		if (palabras != null && !palabras.equals(""))
			return true;
		return false;
	}
}
