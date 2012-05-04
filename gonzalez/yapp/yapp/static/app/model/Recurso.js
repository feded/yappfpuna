Ext.define('YAPP.model.Recurso', {
	extend: 'Ext.data.Model',
	requires : [ 'YAPP.model.TipoRecurso' ],
	fields:['_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
//        	{
//                name : '_tipo_id',
//                type : 'int'
//        	},
        	 {
				name : '_tipo',
				type : 'YAPP.model.TipoRecurso'
			}, '_descripcion',
			{
				name : '_costo_hora',
                type : 'int'
			},
			{
				name : '_costo_cantidad',
                type : 'int'
			},
			{
				name : '_cantidad',
                type : 'int'
			}
			
        	]
});