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
});