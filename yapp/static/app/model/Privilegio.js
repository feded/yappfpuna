Ext.define('YAPP.model.Privilegio', {
	
	requires : [ 'YAPP.model.EntidadPadre', 'YAPP.model.Entidad' ],
	extend : 'Ext.data.Model',
	// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre', {
		name : '_entidad_padre',
		type : 'YAPP.model.EntidadPadre'
	}, {
		name : '_entidad',
		type : 'YAPP.model.Entidad'
	} ]

});