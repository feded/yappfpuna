Ext.define('YAPP.model.Entidad', {
	extend : 'Ext.data.Model',
	// fields: [{nYAPPe: 'nYAPPe', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre' ],

});