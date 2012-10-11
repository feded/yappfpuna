package py.una.pol.ia;

import java.util.ArrayList;
import java.util.Arrays;

public class Util {

	public static Dominio[] inicializarDominio(Puzzle p) {
		Dominio[] vector = new Dominio[p.dominios.size()];
		int i = 0;
		for (Dominio d : p.dominios) {
			d.convertir();
			vector[i] = d;
			i++;
		}
		return vector;
	}

	public static void volcar(Object[] veuctor) {
		int length = veuctor.length;
		for (int i = 0; i < veuctor.length / 2; i++) {
			Object temp = veuctor[length - (i + 1)];
			veuctor[length - (i + 1)] = veuctor[i];
			veuctor[i] = temp;
		}
	}

	public static String imprimirDominio(Dominio[] dominios) {
		StringBuilder sb = new StringBuilder();
		int i = 0;
		for (Dominio d : dominios)
			sb.append(i++).append(": ").append(d).append("\n");
		return sb.append("\n").toString();
	}

	public static Dominio[] acotar(Dominio[] dominios, boolean aEliminar) {
		for (Dominio d : dominios) {
			d = acotar(d, aEliminar);
		}
		return dominios;
	}

	public static Dominio[] desordenar(Dominio[] dominioActual, int cantPalabras) {
		Dominio[] desordenado = new Dominio[cantPalabras];

		for (int i = 0; i < cantPalabras; i++) {
			desordenado[i] = new Dominio(dominioActual[i].valores.length);
			for (int j = 0; j < dominioActual[i].valores.length; j++) {
				desordenado[i].valores[dominioActual[i].valores.length - j - 1] = dominioActual[i].valores[j];
				desordenado[i].inconsistentes[dominioActual[i].valores.length
						- j - 1] = false;
			}
		}

		return desordenado;
	}

	public static Dominio acotar(Dominio dominio, boolean aEliminar) {
		// ArrayList<String> aBorrar = new ArrayList<String>();
		// for (int i = 0; i < dominio.valores.length; i++) {
		// if (dominio.inconsistentes[i] == aEliminar)
		// aBorrar.add(dominio.valores[i]);
		// }
		// for (String s : aBorrar) {
		// dominio.valoresDinamicos.remove(s);
		// }
		// dominio.convertir();
		ArrayList<String> acotados = new ArrayList<String>();
		for (int i = 0; i < dominio.valores.length; i++) {
			if (dominio.inconsistentes[i] == !aEliminar)
				acotados.add(dominio.valores[i]);
		}
		dominio.valores = new String[acotados.size()];
		for (int i = 0; i < dominio.valores.length; i++) {
			dominio.valores[i] = acotados.get(i);
		}

		Arrays.fill(dominio.inconsistentes, !aEliminar);
		return dominio;
	}
}
