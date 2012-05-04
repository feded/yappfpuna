Ext.define('YAPP.model.Item', {
    extend: 'Ext.data.Model',
    fields: [{name : 'id', type : 'int', mapping : '_id'}, '_nombre', '_tipo_item_id', '_fase_id', '_duracion' , '_condicionado',
    '_version', '_estado','_fecha_inicio','_fecha_fin','_antecesor_id','_padre_id', 'accion']
});
