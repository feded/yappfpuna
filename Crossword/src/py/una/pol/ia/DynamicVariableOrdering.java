package py.una.pol.ia;

public class DynamicVariableOrdering {	

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
		int i=-1;
		while(!encontroSolucion()){
			//Instanciamos la variable
			
			i = aInstanciar(i);
			v[i] = seleccionarValor(i);
			while(!consistent() && v[i].compareTo("Se acabo dominio")!=0){
				v[i] = seleccionarValor(i);
			}

			if(v[i].compareTo("Se acabo dominio")==0){
				habilitar(i);
				v[i]="";
				System.out.println("Backtracking");
//				i--;
			}else{
				System.out.println("v["+ i +"] = " + v[i]);
//				i++;
			}
		}
		
		System.out.println("Resultado");
		for(int p=0; p<10; p++){
			System.out.println("v["+ p +"] = " + v[p]);
		}
		
		
	}
	
	private int aInstanciar(int anterior){
		int menor = dominioActual[0].valores.length;
		int t = 0;
		for(int i = 0; i<dominioActual.length; i++){
			if(i != anterior){
				if(v[i].compareTo("")==0){
					if(menor>=dominioActual[i].valores.length){
						menor=dominioActual[i].valores.length;
						t=i;
					}
				}
			}
			
		}
		return t;
	}
	
	private boolean encontroSolucion(){
		for(int i = 0; i < 10; i++){
			if(v[i].compareTo("")==0){
				return false;
			}
		}
		return true;
	}
	
	
	/*
	 * Nos permite saber si un valor se ha asignado
	 * a una variable.
	 */
	private boolean seAsigno(String temp, int k){
		for(int m = 0; m<10 ; m++){
			if(v[m].compareTo(temp)==0){
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
		
		//Restriciones para la primera variable
		if(v[0].compareTo("")!=0 && v[7].compareTo("")!=0){
			if(v[0].charAt(0) != v[7].charAt(0)){
				System.out.println("La variable 1("+v[0]+") es inconsistente con la variable 8("+v[7]+")");
				return false;
			}
		}
		
		if(v[0].compareTo("")!=0 && v[8].compareTo("")!=0){
			if(v[0].charAt(1) != v[8].charAt(0)){
				System.out.println("La variable 1("+v[0]+") es inconsistente con la variable 9("+v[8]+")");
				return false;
			}
		}
		
		if(v[0].compareTo("")!=0  && v[9].compareTo("")!=0){
			if(v[0].charAt(2) != v[9].charAt(0)){
				System.out.println("La variable 1("+v[0]+") es inconsistente con la variable 10("+v[9]+")");
				return false;
			}
		}
		
		//Restriciones para la segunda variable
		if(v[1].compareTo("")!=0  && v[6].compareTo("")!=0){
			if(v[1].charAt(0) != v[6].charAt(0)){
				System.out.println("La variable 2("+v[1]+") es inconsistente con la variable 7("+v[6]+")");
				return false;
			}
		}
		
		if(v[1].compareTo("")!=0 && v[7].compareTo("")!=0){
			if(v[1].charAt(1) != v[7].charAt(1)){
				System.out.println("La variable 2("+v[1]+") es inconsistente con la variable 8("+v[7]+")");
				return false;
			}
		}
		
		
		return true;
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