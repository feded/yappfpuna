Ext.define('YAPP.model.Item', {
    extend: 'Ext.data.Model',
    requires : [ 'YAPP.model.TipoItem','YAPP.model.Fase' ],
    fields: [{name : 'id', type : 'int', mapping : '_id'}, '_nombre', 
    {
    	name : '_tipo_item', 
    	type : 'YAPP.model.TipoItem'
    },
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
    },
    {
    	name : '_padre', 
    	type : 'YAPP.model.Item'
    }, 'accion']
});
