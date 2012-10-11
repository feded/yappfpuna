package py.una.pol.ia;

import java.util.ArrayList;

public class Puzzle {

	public static final char NULO = '/';
	public static final char ESPACIO = ' ';

	static String puzzleA = "C:/Users/Arturo/Desktop/puzzleA.txt";
	static String puzzleB = "C:/Users/Arturo/Desktop/puzzleB.txt";
	static String puzzleC = "C:/Users/Arturo/Desktop/puzzleC.txt";
	static String puzzleD = "C:/Users/Arturo/Desktop/puzzleD.txt";

	int nroPalabras = 0;
	int filas;
	int columnas;
	int[][] palabraX;
	int[][] palabraXindice;
	int[][] palabraY;
	int[][] palabraYindice;

	ArrayList<String> palabras;
	ArrayList<Dominio> dominios;

	char[][] matriz;

	public Puzzle(int filas, int columnas) {
		this.filas = filas;
		this.columnas = columnas;
		matriz = new char[filas][columnas];
		palabraX = new int[filas][columnas];
		palabraY = new int[filas][columnas];
		palabraXindice = new int[filas][columnas];
		palabraYindice = new int[filas][columnas];
		palabras = new ArrayList<String>();
		dominios = new ArrayList<Dominio>();

	}

	public char[][] getMatriz() {
		return matriz;
	}

	public void set(int fila, int columna, char letra) {
		matriz[fila][columna] = letra;
	}

	public char get(int fila, int columna) {
		return matriz[fila][columna];
	}

	public void nular(int fila, int columna) {
		matriz[fila][columna] = NULO;
	}

	public String toString(String[] palabras) {
		StringBuilder sb = new StringBuilder();
		sb.append("EN X\n");
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				if (get(i, j) == NULO) {
					sb.append(NULO);
				} else {
					if (getPalabraX(i, j) < 1
							|| palabras[getPalabraX(i, j) - 1] == null
							|| palabras[getPalabraX(i, j) - 1].equals("")) {
						sb.append(ESPACIO);
					} else {
						sb.append(palabras[getPalabraX(i, j) - 1]
								.charAt(getPalabraXindice(i, j)));
					}
				}
				if (j != columnas)
					sb.append(ESPACIO);
			}
			sb.append("\n");
		}
		sb.append("EN Y\n");
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				if (get(i, j) == NULO) {
					sb.append(NULO);
				} else {
					if (getPalabraY(i, j) < 1
							|| palabras[getPalabraY(i, j) - 1] == null
							|| palabras[getPalabraY(i, j) - 1].equals("")) {
						sb.append(ESPACIO);
					} else {
						sb.append(palabras[getPalabraY(i, j) - 1]
								.charAt(getPalabraYindice(i, j)));
					}
				}
				if (j != columnas)
					sb.append(ESPACIO);
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < filas; i++) {
			for (int j = 0; j < columnas; j++) {
				sb.append(matriz[i][j]);
				// sb.append("[");
				// sb.append(palabraX[i][j]);
				// sb.append("|");
				// sb.append(palabraXindice[i][j]);
				// sb.append("]");
				if (j != columnas)
					sb.append(ESPACIO);
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	public int getPalabraX(int i, int j) {
		return palabraX[i][j];
	}

	public void setPalabraX(int i, int j, int palabraX, int indice) {
		this.palabraX[i][j] = palabraX;
		this.palabraXindice[i][j] = indice;
	}

	public int getPalabraY(int i, int j) {
		return palabraY[i][j];
	}

	public void setPalabraY(int i, int j, int palabraY, int indice) {
		this.palabraY[i][j] = palabraY;
		this.palabraYindice[i][j] = indice;
	}

	public int getPalabraXindice(int i, int j) {
		return palabraXindice[i][j];
	}

	public int getPalabraYindice(int i, int j) {
		return palabraYindice[i][j];
	}

	int contador = 0;

	public void addDominio(Dominio dominio) {
		System.out.println("Agregando dominio con longitud " + contador++
				+ ": " + dominio.longitud);
		dominios.add(dominio);
		for (String palabra : palabras) {
			if (palabra.length() == dominio.longitud)
				dominio.add(palabra);
		}
	}

	public void addPalabra(String palabra) {
		if (palabra.equals(""))
			return;
		nroPalabras++;
		System.out.println("Agregando palabra " + palabra);
		palabras.add(palabra);
		for (Dominio dominio : dominios) {
			if (palabra.length() == dominio.longitud)
				dominio.add(palabra);
		}
	}

	public int getNroPalabras() {
		return nroPalabras;
	}

}