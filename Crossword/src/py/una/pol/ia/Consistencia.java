package py.una.pol.ia;

public class Consistencia {

	Puzzle base;

	public Consistencia(Puzzle base) {
		this.base = base;
	}

	public boolean probarConsitencia(String[] palabras) {
		for (int i = 0; i < base.filas; i++) {
			for (int j = 0; j < base.columnas; j++) {
				if (base.get(i, j) == Puzzle.NULO)
					continue;
				int palabraEnX = base.getPalabraX(i, j) - 1;
				if (!test(palabras[palabraEnX]))
					continue;
				int palabraEnY = base.getPalabraY(i, j) - 1;
				if (!test(palabras[palabraEnY]))
					continue;
				int indiceX = base.getPalabraXindice(i, j);
				int indiceY = base.getPalabraYindice(i, j);
				if (palabras[palabraEnX].charAt(indiceX) != palabras[palabraEnY]
						.charAt(indiceY))
					return false;
			}
		}

		return true;
	}

	public boolean test(String palabras) {
		if (palabras != null && !palabras.equals(""))
			return true;
		return false;
	}

	public boolean probarConsistencia(String[] palabras, Llamada llamanda) {
		return llamanda.probar();
	}

	public static interface Llamada {
		boolean probar();
	}

}
