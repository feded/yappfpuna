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
        	},
        	{
        		name: '_orden',
        		type: 'int'
        	}, '_comentario', '_estado', '_color'
        	],
	proxy : {
    	type : 'rest',
    	url: '/fases',
        reader : {
        	type : 'json',
            root : 'fases',
            successProperty : 'sucess'
            }
        }
});