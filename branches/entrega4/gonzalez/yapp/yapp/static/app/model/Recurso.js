Ext.define('YAPP.model.Recurso', {
	extend: 'Ext.data.Model',
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	}
        	]
});