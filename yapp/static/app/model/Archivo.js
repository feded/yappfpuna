Ext.define('YAPP.model.Archivo', {
	extend: 'Ext.data.Model',
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : '_item_id',
        		type : 'int'
        	}
        	],
	proxy : {
    	type : 'rest',
    	url: '/archivos',
        reader : {
        	type : 'json',
            root : 'archivos',
            successProperty : 'success'
            }
        }
});