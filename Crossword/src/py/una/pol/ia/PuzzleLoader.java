package py.una.pol.ia;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class PuzzleLoader {

	public static char NULO = '/';
	public static char ESPACIO = '_';

	public static Puzzle cargar(String nombre) {
		try {
			StringBuilder palabra = new StringBuilder();
			File f = new File(nombre);
			FileReader fr = new FileReader(f);
			BufferedReader br = new BufferedReader(fr);
			int filas = Integer.parseInt(br.readLine());
			int columnas = Integer.parseInt(br.readLine());
			Puzzle p = new Puzzle(filas, columnas);
			char letra;
			int palabraX = 0;
			int c = 0;
			boolean hayX = false;

			for (int i = 0; i < filas; i++) {
				String partes[] = br.readLine().split(ESPACIO + "");

				for (int j = 0; j < columnas; j++) {
					letra = partes[j].charAt(0);
					if (letra == NULO) {
						p.nular(i, j);
						hayX = false;
						if (palabra.length() > 0) {
							p.addPalabra(palabra.toString());
							p.addDominio(new Dominio(new Integer(c)));
							palabra = new StringBuilder();
						}
						c = 0;
					} else {
						if (!hayX) {
							hayX = true;
							palabraX++;
						}
						p.setPalabraX(i, j, palabraX, c++);
						p.set(i, j, letra);
						palabra.append(letra);
					}
				}
				if (hayX) {
					hayX = false;
					if (palabra.length() > 0) {
						p.addPalabra(palabra.toString());
						p.addDominio(new Dominio(new Integer(c)));
						palabra = new StringBuilder();
					}
				}
				c = 0;
			}
			int palabraY = palabraX;
			c = 0;
			boolean hayY = false;
			for (int j = 0; j < columnas; j++) {

				for (int i = 0; i < filas; i++) {
					letra = p.get(i, j);
					if (letra == NULO) {
						hayY = false;
						if (palabra.length() > 0) {
							p.addPalabra(palabra.toString());
							p.addDominio(new Dominio(new Integer(c)));
							palabra = new StringBuilder();
						}
						c = 0;
					} else {
						if (!hayY) {
							hayY = true;
							palabraY++;
						}
						p.setPalabraY(i, j, palabraY, c++);
						palabra.append(letra);
					}
				}
				if (hayY) {
					hayY = false;
					if (palabra.length() > 0) {
						p.addPalabra(palabra.toString());
						p.addDominio(new Dominio(new Integer(c)));
						palabra = new StringBuilder();
					}
				}
				c = 0;
			}
			br.close();
			fr.close();
			return p;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
