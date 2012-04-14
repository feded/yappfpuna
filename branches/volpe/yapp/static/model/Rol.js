Ext.define('AM.model.Rol', {
	
	requires : [ 'AM.model.RolEstado' ],
	extend : 'Ext.data.Model',
	// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre', '_email', {
		name : '_estado',
		type : 'AM.model.RolEstado'
	}, '_esFinal', '_password', 'accion' ]

});