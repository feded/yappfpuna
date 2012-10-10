package py.una.pol.ia;

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
}
