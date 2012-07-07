Ext.define('YAPP.model.Permiso', {
	extend : 'Ext.data.Model',
	fields : [ '_nombre', {
		name : 'id',
		type : 'int',
		mapping : '_id'
	} ]
});