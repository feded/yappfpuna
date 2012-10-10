package py.una.pol.ia;

import java.util.ArrayList;

public class Dominio {
	String[] valores;
	boolean inconsistentes[];
	int ultimo = 0;
	int longitud;
	ArrayList<String> valoresDinamicos;
	ArrayList<Boolean> inconsistenciaDinamica;

	public Dominio(Integer longitud) {
		this.longitud = longitud;
		valoresDinamicos = new ArrayList<String>();
		inconsistenciaDinamica = new ArrayList<Boolean>();
	}

	Dominio(int n) {
		this.valores = new String[n];
		this.inconsistentes = new boolean[n];

	}

	public void set(int i, String valor, boolean inconsistente) {
		this.valores[i] = valor;
		this.inconsistentes[i] = inconsistente;
	}

	public void add(String valor) {
		valoresDinamicos.add(valor);
		inconsistenciaDinamica.add(false);
	}

	public void convertir() {
		valores = new String[valoresDinamicos.size()];
		int i = 0;
		for (Object o : valoresDinamicos.toArray()) {
			valores[i] = (String) o;
			i++;
		}
		inconsistentes = new boolean[inconsistenciaDinamica.size()];
		i = 0;
		for (Object o : inconsistenciaDinamica.toArray()) {
			inconsistentes[i] = (Boolean) o;
			i++;
		}
	}

	public String toString() {
		String temp = "";

		for (int i = 0; i < this.valores.length; i++) {
			temp += this.valores[i] + " ";
		}

		return temp;

	}
}