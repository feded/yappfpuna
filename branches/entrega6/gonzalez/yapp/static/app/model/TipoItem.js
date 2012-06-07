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
		    	'accion'
    		]
});