package py.una.pol.ia;

public class ForwardChecking {
	//Numero de variables actualmente en el problema
	final int n = 10;
	
	//Cada word es una variable. V[i] es el valor asignado a la variable i
	String v[] = new String[n];

	Dominio dominioActual[];
	
	public void doIt(){
		
		//Inicializamos las variables
		for(int i = 0; i < v.length; i++){
			v[i] = "";
		}
		
		//El dominio[i] son los posibles valores que puede tomar la variable v[i]
		dominioActual = Util.inicializarDominio(PuzzleLoader.cargar(Puzzle.puzzleA));
		int i=0;
		while(i>= 0 && i < 10){
			//Instanciamos la variable
			v[i] = seleccionarValor(i);
			if(v[i].compareTo("Se acabo dominio")==0){
				habilitar(i);
				v[i]="";
				System.out.println("Backtracking");
				i--;
			}else{
				forwardCheck(i);
				System.out.println("v["+ i +"] = " + v[i]);
				i++;
			}
		}
		System.out.println("Resultado");
		for(int p=0; p<10; p++){
			System.out.println("v["+ p +"] = " + v[p]);
		}
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
	
	private void forwardCheck(int i){
		String valor = v[i];
		for(int j = i+1 ; j<10 ; j++){
			for(int m = 0; m<dominioActual[j].valores.length; m++)
			{
				if(dominioActual[j].valores[m].compareTo(valor)==0){
					dominioActual[j].inconsistentes[m]=true;
				}
			}
		}
		eliminarInconsistencias();
		
	}
	
	
	private void eliminarInconsistencias(){
		//Restriciones para la primera variable
		
		String v7;
		for(int i= 0; i < dominioActual[7].valores.length; i++){
			v7 = dominioActual[7].valores[i];
			if(v[0].charAt(0) != v7.charAt(0)){
				dominioActual[7].inconsistentes[i] = true;
			}
		}
		
		
		String v8;
		for(int i= 0; i < dominioActual[8].valores.length; i++){
			v8 = dominioActual[8].valores[i];
			if(v[0].charAt(1) != v8.charAt(0)){
				dominioActual[8].inconsistentes[i] = true;
			}
		}
		
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
	 * Nos permite saber si un valor se ha asignado
	 * a una variable.
	 */
	private boolean seAsigno(String temp, int k){
		for(int m = 0; m<k ; m++){
			if(v[m].compareTo(temp)==0){
				return true;
			}
		}
		return false;
	}
}