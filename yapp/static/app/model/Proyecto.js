Ext.define('YAPP.model.Proyecto', {
	extend: 'Ext.data.Model',
	fields:['_nombre',
			'_autor',
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{	name:'_prioridad',
        		type : 'int'
        	},
        	'_estado',
        	'_lider',
        	'_nota',
        	'_fecha_creacion',
        	'_fecha_modificacion']
});