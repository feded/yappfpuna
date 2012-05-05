Ext.define('YAPP.model.EsquemaItem', {
	extend: 'Ext.data.Model',
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : '_esquema_id',
        		type : 'int'
        	},
        	{
        		name: '_item_id',
        		type: 'int'
        	}, 
        	]
});