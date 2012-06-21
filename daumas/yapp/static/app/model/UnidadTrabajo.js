Ext.define('YAPP.model.UnidadTrabajo', {
	extend: 'Ext.data.Model',
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	'_etiqueta', '_descripcion', '_color'		
        	],
        	
    proxy : {
    	type : 'rest',
    	url: '/unidadtrabajo',
        reader : {
        	type : 'json',
            root : 'unidadtrabajo',
            successProperty : 'sucess'
            }
        }
});