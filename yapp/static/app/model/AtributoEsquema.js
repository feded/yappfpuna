Ext.define('YAPP.model.AtributoEsquema', {
	extend: 'Ext.data.Model',
	fields:['_nombre', '_descripcion',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : '_esquema_id',
        		type : 'int'
        	},'_tipo', '_valor'
        	]
});