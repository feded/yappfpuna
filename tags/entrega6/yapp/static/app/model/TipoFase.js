Ext.define('YAPP.model.TipoFase', {
	extend: 'Ext.data.Model',
	requires : [ 'YAPP.model.TipoItem','YAPP.model.Fase' ],
	fields:[
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
				name : '_tipo',
				type : 'YAPP.model.TipoItem'
			},
			'tipo_nombre',
			{
				name : '_fase',
				type : 'YAPP.model.Fase'
			},
        	],
	
	proxy : {
    	type : 'rest',
    	url: '/tipofase',
    	
        reader : {
        	type : 'json',
            root : 'tipofase',
            successProperty : 'sucess'
            }
        }
});