Ext.define('YAPP.model.Proyecto', {
	extend: 'Ext.data.Model',
	requires : [ 'YAPP.model.Rol' ],
	fields:['_nombre',
			{
				name : '_autor',
				type : 'YAPP.model.Rol'
			},
			'autor_nombre',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{	name:'_prioridad',
        		type : 'int'
        	},
        	'_estado',
        	{
				name : '_lider',
				type : 'YAPP.model.Rol'
			},
			'lider_nombre',
        	'_nota',
        	'_fecha_creacion',
        	'_fecha_modificacion']
});