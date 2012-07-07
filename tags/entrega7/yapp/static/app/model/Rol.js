Ext.define('YAPP.model.Rol', {
	
	requires : [ 'YAPP.model.RolEstado' ],
	extend : 'Ext.data.Model',
	// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre', '_email', {
		name : '_estado',
		type : 'YAPP.model.RolEstado'
	}, '_esFinal', '_password', 'accion', '_padres' ],
	
	proxy : {
		type : 'rest',
		api : {
			read : '/roles/0',
			update : '/roles',
			create : '/roles/0',
			destroy : '/roles'
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}

});