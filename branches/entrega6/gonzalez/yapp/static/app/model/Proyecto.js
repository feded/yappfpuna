Ext.define('YAPP.model.Proyecto', {
	extend: 'Ext.data.Model',
	requires : [ 'YAPP.model.Rol' ],
	fields:['_nombre',
			{
				name : '_autor_id',
				type : 'int'
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
				name : '_lider_id',
				type : 'int'
			},
			'lider_nombre',
        	'_nota',
        	'_fecha_creacion',
        	'_fecha_modificacion'],
 	
	proxy : {
    	type : 'ajax',
        api : {
        	read : '/readProyectos',
        	update : '/updateProyectos',
        	create : '/createProyectos',
        	destroy : '/deleteProyectos'
        },
        reader : {
        	type : 'json',
            root : 'proyectos',
            successProperty : 'sucess'
            }
        }
});