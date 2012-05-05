Ext.define('YAPP.model.RolPrivilegio', {
	
	// requires : [ 'YAPP.model.EntidadPadre', 'YAPP.model.Privilegio' ],
	extend : 'Ext.data.Model',
	// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, {
		name : '_entidad_padre',
		type : 'YAPP.model.EntidadPadre'
	}, {
		name : '_privilegio',
		type : 'YAPP.model.Privilegio'
	}, {
		name : '_rol',
		type : 'YAPP.model.Rol'
	} ]

});