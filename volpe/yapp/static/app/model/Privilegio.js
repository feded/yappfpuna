Ext.define('YAPP.model.Privilegio', {
	
	requires : [ 'YAPP.model.Entidad' ],
	extend : 'Ext.data.Model',
	// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre', {
		name : '_entidad',
		type : 'YAPP.model.Entidad'
	} ]

});