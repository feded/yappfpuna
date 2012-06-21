Ext.define('YAPP.model.AtributoFase', {
	extend: 'Ext.data.Model',
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : '_fase_id',
        		type : 'int'
        	},'_descripcion', '_valor'
        	],
	proxy : {
    	type : 'rest',
    	url: '/atributofase',
        reader : {
        	type : 'json',
            root : 'atributofase',
            successProperty : 'sucess'
            }
        }
});