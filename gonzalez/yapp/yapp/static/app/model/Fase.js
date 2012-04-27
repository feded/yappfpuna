Ext.define('YAPP.model.Fase', {
	extend: 'Ext.data.Model',
	requires : [ 'YAPP.model.Proyecto' ],
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : '_proyecto_id',
        		type : 'int'
        	}
        	]
});