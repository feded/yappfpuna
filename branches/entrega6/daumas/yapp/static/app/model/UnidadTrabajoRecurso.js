Ext.define('YAPP.model.UnidadTrabajoRecurso', {
	extend: 'Ext.data.Model',
	fields:[
			{
                name : 'id_unidad_trabajo',
                type : 'int',
        	},'_recursos'
        	],
   	proxy : {
    	type : 'rest',
    	url: '/asignarRecursos',
    	
        reader : {
        	type : 'json',
            root : 'recursos',
            successProperty : 'sucess'
            }
        }
});