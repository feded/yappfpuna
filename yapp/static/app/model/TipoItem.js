Ext.define('YAPP.model.TipoItem', {
    extend: 'Ext.data.Model',
    fields: [
		    	{
		    		name : 'id', 
		    		type : 'int', 
		    		mapping : '_id'
		    	}, 
		    	'_nombre',
		    	'_comentario',
		    	'_color',
		    	'_prefijo',
		    	'_condicionado',
		    	'accion',
		    	{
		    		name : '_proyecto_id', 
		    		type : 'int', 		    	}
		    	
    		],
   	proxy : {
		type : 'rest',
		api : {
			read : '/obtenerTipos',
	        update : '/guardarTipo',
	        create : '/crearTipo',
	        destroy : '/eliminarTipo'
		},
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});