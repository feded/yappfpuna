package py.una.pol.ia;

public class Util {

	public static Dominio[] inicializarDominio(){
		Dominio dominio[] =  new Dominio[10];
		
		dominio[0] = new Dominio(4);
		dominio[0].set(0, "ave",false);
		dominio[0].set(2, "cbs",false);
		dominio[0].set(1, "cdc",false);
		dominio[0].set(3, "edt",false);
		
		dominio[1] = new Dominio(4);
		dominio[1].set(3,"dyad",false);
		dominio[1].set(2,"dare",false);
		dominio[1].set(1,"drab",false);
		dominio[1].set(0,"vase",false);
	
		dominio[2] = new Dominio(2);
		dominio[2].set(1,"crest",false);
		dominio[2].set(0,"ayers",false);

		dominio[3] = new Dominio(4);
		dominio[3].set(3,"dyad",false);
		dominio[3].set(2,"dare",false);
		dominio[3].set(1,"drab",false);
		dominio[3].set(0,"vase",false);
		
		dominio[4] = new Dominio(4);
		dominio[4].set(3, "ave",false);
		dominio[4].set(2, "cbs",false);
		dominio[4].set(1, "cdc",false);
		dominio[4].set(0, "edt",false);
		
		dominio[5] = new Dominio(4);
		dominio[5].set(3, "ave",false);
		dominio[5].set(2, "cbs",false);
		dominio[5].set(1, "cdc",false);
		dominio[5].set(0, "edt",false);
		
		dominio[6] = new Dominio(4);
		dominio[6].set(3,"dyad",false);
		dominio[6].set(2,"dare",false);
		dominio[6].set(1,"drab",false);
		dominio[6].set(0,"vase",false);
		
		dominio[7] = new Dominio(2);
		dominio[7].set(1,"crest",false);
		dominio[7].set(0,"ayers",false);
		
		dominio[8] = new Dominio(4);
		dominio[8].set(3,"dyad",false);
		dominio[8].set(2,"dare",false);
		dominio[8].set(1,"drab",false);
		dominio[8].set(0,"vase",false);

		dominio[9] = new Dominio(4);
		dominio[9].set(3, "ave",false);
		dominio[9].set(2, "cbs",false);
		dominio[9].set(1, "cdc",false);
		dominio[9].set(0, "edt",false);
	
		return dominio;
	}
}
