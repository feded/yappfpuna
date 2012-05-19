Ext.define('YAPP.model.Historial', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_accion', '_id_modificado', '_usuario', '_entidad', '_fecha'],
});