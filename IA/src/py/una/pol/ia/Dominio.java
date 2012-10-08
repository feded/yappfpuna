package py.una.pol.ia;

public class Dominio {
	String[] valores;
	boolean inconsistentes[];
	
	Dominio(int n){
		this.valores = new String[n];
		this.inconsistentes = new boolean[n];
	}

	public void set(int i, String valor, boolean inconsistente)
	{
		this.valores[i] = valor;
		this.inconsistentes[i] = inconsistente;
	}

	public String toString(){
		String temp = "";
		
		for(int i = 0; i < this.valores.length; i++){
			temp += this.valores[i] + " ";
		}

		return temp;
		
	}
}