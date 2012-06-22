Ext.define('YAPP.model.RolPrivilegio', {
	
	requires : [ 'YAPP.model.EntidadPadre', 'YAPP.model.Privilegio' ],
	extend : 'Ext.data.Model',
	// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, {
		name : '_entidad',
		type : 'YAPP.model.EntidadPadre'
	}, {
		name : '_privilegio',
		type : 'YAPP.model.Privilegio'
	}, '_permitir', '_rol' ],
	proxy : {
		type : 'rest',
		api : {
			read : '/rol_privilegios/0',
			update : '/rol_privilegios',
			create : '/rol_privilegios/0',
			destroy : '/rol_privilegios'
		},
		reader : {
			type : 'json',
			root : 'privilegios',
			successProperty : 'sucess'
		}
	}

});