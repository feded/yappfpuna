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
			{
				name : '_fase',
				type : 'YAPP.model.Fase'
			},
//			{
//                name : '_tipo_id',
//                type : 'int'
//        	},
//        	{
//                name : '_fase_id',
//                type : 'int'
//        	},
        	]
});