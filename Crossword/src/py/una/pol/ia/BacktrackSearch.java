package py.una.pol.ia;

public class BacktrackSearch {	

	Dominio dominioActual[];
	Consistencia c;
	Puzzle p = PuzzleLoader.cargar(Puzzle.puzzleB);
	
	//Numero de variables actualmente en el problema
	final int n = p.getNroPalabras();

	//Cada word es una variable. V[i] es el valor asignado a la variable i
	String v[] = new String[n];
	
	public void doIt(){
	
		//Inicializamos las variables
		for(int i = 0; i < v.length; i++){
			v[i] = "";
		}
		
		//El dominio[i] son los posibles valores que puede tomar la variable v[i]
		dominioActual = Util.inicializarDominio(p);
		
//		dominioActual = Util.desordenar(dominioActual, n);
		
		c = new Consistencia(p);
		
		int i=0;

		while(i>= 0 && i < n){
			//Instanciamos la variable
			v[i] = seleccionarValor(i);
			while(!consistent() && v[i].compareTo("Se acabo dominio")!=0){
				v[i] = seleccionarValor(i);
			}

			if(v[i].compareTo("Se acabo dominio")==0){
				habilitar(i);
				v[i]="";
				System.out.println("Backtracking");
				i--;
			}else{
				System.out.println("v["+ i +"] = " + v[i]);
				i++;
			}
		}
		
		System.out.println("Resultado");
		System.out.println(p.toString(v));
		
	}
	
	/*
	 * Nos permite saber si un valor se ha asignado
	 * a una variable.
	 */
	private boolean seAsigno(String temp, int k){
		for(int m = 0; m<k ; m++){
			if(v[m] == temp){
				return true;
			}
		}
		return false;
	}

	/*
	 * Instaciamos nuestra variable con unos de sus posibles valores,
	 * al encontrar una valor que aun no se ha probado que es inconsiste.
	 * Una vez seleccionado un valor, se verifica si aun no se ha asignado
	 * a otra variable previamente.
	 * En caso de no encontrar ningun valor consistente, nos indica que
	 * tenemos que retroceder
	 */
	private String seleccionarValor(int k){
		for(int t = 0 ; t < dominioActual[k].valores.length; t++){
			if (!dominioActual[k].inconsistentes[t]){
				if(!seAsigno(dominioActual[k].valores[t],k)){
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
	private boolean consistent(){
		return c.probarConsitencia(v);
	}
	
	/*
	 * Ponemos disponibles de vuelta todos los valores del dominio de 
	 * una variable en particular
	 */
	private void habilitar(int i){
		for(int k = 0; k <dominioActual[i].valores.length; k++){
			dominioActual[i].inconsistentes[k] = false;
		}
	}
}