Ext.define('YAPP.model.Item', {
    extend: 'Ext.data.Model',
    requires : [ 'YAPP.model.TipoItem','YAPP.model.Fase' ],
    fields: [{name : 'id', type : 'int', mapping : '_id'}, '_item_id', '_nombre', '_color',
    {
    	name : '_tipo_item', 
    	type : 'YAPP.model.TipoItem'
    }, '_tipo_item_prefijo',
    {
    	name : '_fase', 
    	type : 'YAPP.model.Fase'
    },
    {
    	name : '_duracion', 
    	type : 'int'
    }, 
    '_condicionado', "_descripcion",
    '_version', '_estado','_fecha_inicio','_fecha_fin',
    {
    	name : '_antecesor', 
    	type : 'YAPP.model.Item'
    }, 'antecesor_nombre', 'padre_nombre',
    {
    	name : '_padre', 
    	type : 'YAPP.model.Item'
    }, 'accion',
    
    //Relacionamiento
    
    'relacion_padre_otros', 'relacion_antecesor_otros'
    
    ],
    proxy : {	
		type: 'rest',
		url: '/item',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});
