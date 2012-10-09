package py.una.pol.ia;

public class AC3 {
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
		dominioActual = Util.inicializarDominio();
		eliminarInconsistencia();
		
		for(int i=0; i < dominioActual[0].valores.length; i++){
			if(!dominioActual[0].inconsistentes[i]){
				System.out.println("V[0] = " + dominioActual[0].valores[i]);
			}
		}
		
		for(int i=0; i < dominioActual[1].valores.length; i++){
			if(!dominioActual[1].inconsistentes[i]){
				System.out.println("V[1] = " + dominioActual[1].valores[i]);
			}
		}
		
		for(int i=0; i < dominioActual[2].valores.length; i++){
			if(!dominioActual[2].inconsistentes[i]){
				System.out.println("V[2] = " + dominioActual[2].valores[i]);
			}
		}
		
		for(int i=0; i < dominioActual[3].valores.length; i++){
			if(!dominioActual[3].inconsistentes[i]){
				System.out.println("V[3] = " + dominioActual[3].valores[i]);
			}
		}
		
		for(int i=0; i < dominioActual[4].valores.length; i++){
			if(!dominioActual[4].inconsistentes[i]){
				System.out.println("V[4] = " + dominioActual[4].valores[i]);
			}
		}
		for(int i=0; i < dominioActual[5].valores.length; i++){
			if(!dominioActual[5].inconsistentes[i]){
				System.out.println("V[5] = " + dominioActual[5].valores[i]);
			}
		}
		for(int i=0; i < dominioActual[6].valores.length; i++){
			if(!dominioActual[6].inconsistentes[i]){
				System.out.println("V[6] = " + dominioActual[6].valores[i]);
			}
		}
		for(int i=0; i < dominioActual[7].valores.length; i++){
			if(!dominioActual[7].inconsistentes[i]){
				System.out.println("V[7] = " + dominioActual[7].valores[i]);
			}
		}
		for(int i=0; i < dominioActual[8].valores.length; i++){
			if(!dominioActual[8].inconsistentes[i]){
				System.out.println("V[8] = " + dominioActual[8].valores[i]);
			}
		}
		for(int i=0; i < dominioActual[9].valores.length; i++){
			if(!dominioActual[9].inconsistentes[i]){
				System.out.println("V[9] = " + dominioActual[9].valores[i]);
			}
		}
	}
	
	private void eliminarInconsistencia(){
		
		//de la variable 1
		String v0;
		String v7;
		boolean flg = false;
		for(int i=0; i < dominioActual[0].valores.length; i++){
			v0 = dominioActual[0].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[7].valores.length; j++){
				v7 = dominioActual[7].valores[j];
				if(v0.charAt(0) == v7.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[0].inconsistentes[i]= true;
			}
			
		}
		
		String v8;
		for(int i=0; i < dominioActual[0].valores.length; i++){
			v0 = dominioActual[0].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[8].valores.length; j++){
				v8 = dominioActual[8].valores[j];
				if(v0.charAt(1) == v8.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[0].inconsistentes[i]= true;
			}
			
		}
		
		String v9;
		for(int i=0; i < dominioActual[0].valores.length; i++){
			v0 = dominioActual[0].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[9].valores.length; j++){
				v9 = dominioActual[9].valores[j];
				if(v0.charAt(2) == v9.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[0].inconsistentes[i]= true;
			}
			
		}
		
		//de la variable 2
		String v1;
		String v6;
		for(int i=0; i < dominioActual[1].valores.length; i++){
			v1 = dominioActual[1].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[6].valores.length; j++){
				v6 = dominioActual[6].valores[j];
				if(v1.charAt(0) == v6.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[1].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[1].valores.length; i++){
			v1 = dominioActual[1].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[7].valores.length; j++){
				v7 = dominioActual[7].valores[j];
				if(v1.charAt(1) == v7.charAt(1)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[1].inconsistentes[i]= true;
			}
		}
		
		//de la variable 3
		String v2;
		String v5;
		for(int i=0; i < dominioActual[2].valores.length; i++){
			v2 = dominioActual[2].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[5].valores.length; j++){
				v5 = dominioActual[5].valores[j];
				if(v2.charAt(0) == v5.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[2].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[2].valores.length; i++){
			v2 = dominioActual[2].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[6].valores.length; j++){
				v6 = dominioActual[6].valores[j];
				if(v2.charAt(1) == v6.charAt(1)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[2].inconsistentes[i]= true;
			}
		}

		//de la variable 4
		String v3;
		for(int i=0; i < dominioActual[3].valores.length; i++){
			v3 = dominioActual[3].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[5].valores.length; j++){
				v5 = dominioActual[5].valores[j];
				if(v3.charAt(0) == v5.charAt(1)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[3].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[3].valores.length; i++){
			v3 = dominioActual[3].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[6].valores.length; j++){
				v6 = dominioActual[6].valores[j];
				if(v3.charAt(1) == v6.charAt(2)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[3].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[3].valores.length; i++){
			v3 = dominioActual[3].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[7].valores.length; j++){
				v7 = dominioActual[7].valores[j];
				if(v3.charAt(2) == v7.charAt(3)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[3].inconsistentes[i]= true;
			}
		}
		
		//de la variable 5
		String v4;
		for(int i=0; i < dominioActual[4].valores.length; i++){
			v4 = dominioActual[4].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[5].valores.length; j++){
				v5 = dominioActual[5].valores[j];
				if(v4.charAt(0) == v5.charAt(2)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[4].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[4].valores.length; i++){
			v4 = dominioActual[4].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[6].valores.length; j++){
				v6 = dominioActual[6].valores[j];
				if(v4.charAt(1) == v6.charAt(3)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[4].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[4].valores.length; i++){
			v4 = dominioActual[4].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[7].valores.length; j++){
				v7 = dominioActual[7].valores[j];
				if(v4.charAt(2) == v7.charAt(4)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[4].inconsistentes[i]= true;
			}
		}
		
		//de la variable 6
		for(int i=0; i < dominioActual[5].valores.length; i++){
			v5 = dominioActual[5].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[2].valores.length; j++){
				v2 = dominioActual[2].valores[j];
				if(v5.charAt(0) == v2.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[5].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[5].valores.length; i++){
			v5 = dominioActual[5].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[3].valores.length; j++){
				v3 = dominioActual[3].valores[j];
				if(v5.charAt(1) == v3.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[5].inconsistentes[i]= true;
			}
		}
		
		//de la variable 7
		for(int i=0; i < dominioActual[6].valores.length; i++){
			v6 = dominioActual[6].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[1].valores.length; j++){
				v1 = dominioActual[1].valores[j];
				if(v6.charAt(0) == v1.charAt(0)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[6].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[6].valores.length; i++){
			v6 = dominioActual[6].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[2].valores.length; j++){
				v2 = dominioActual[2].valores[j];
				if(v6.charAt(1) == v2.charAt(1)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[6].inconsistentes[i]= true;
			}
		}
		
		//de la variable 9
		for(int i=0; i < dominioActual[8].valores.length; i++){
			v8 = dominioActual[8].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[0].valores.length; j++){
				v0 = dominioActual[0].valores[j];
				if(v8.charAt(0) == v0.charAt(1)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[8].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[8].valores.length; i++){
			v8 = dominioActual[8].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[1].valores.length; j++){
				v1 = dominioActual[1].valores[j];
				if(v8.charAt(1) == v1.charAt(2)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[8].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[8].valores.length; i++){
			v8 = dominioActual[8].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[2].valores.length; j++){
				v2 = dominioActual[2].valores[j];
				if(v8.charAt(2) == v2.charAt(3)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[8].inconsistentes[i]= true;
			}
		}
		//de la variable 10
		for(int i=0; i < dominioActual[9].valores.length; i++){
			v9 = dominioActual[9].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[0].valores.length; j++){
				v0 = dominioActual[0].valores[j];
				if(v9.charAt(0) == v0.charAt(2)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[9].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[9].valores.length; i++){
			v9 = dominioActual[9].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[1].valores.length; j++){
				v1 = dominioActual[1].valores[j];
				if(v9.charAt(1) == v1.charAt(3)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[9].inconsistentes[i]= true;
			}
		}
		
		for(int i=0; i < dominioActual[9].valores.length; i++){
			v9 = dominioActual[9].valores[i];
			flg = false;
			for(int j = 0; j<dominioActual[2].valores.length; j++){
				v2 = dominioActual[2].valores[j];
				if(v9.charAt(2) == v2.charAt(4)){
					flg = true;
				}
			}
			if(!flg){
				dominioActual[9].inconsistentes[i]= true;
			}
		}
	}	
}