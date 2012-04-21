Ext.define('YAPP.model.Suscripcion', {
	extend : 'Ext.data.Model',
//	requires : [ 'YAPP.model.Rol', 'YAPP.model.EntidadPadre' ],
	// fields: [{nYAPPe: 'nYAPPe', type: 'int', }, 'email', 'estado', 'esFinal']
	fields : [ '_id', '_nombre', {
		name : '_entidad_padre',
		type : 'YAPP.model.EntidadPadre'
	}, {
		name : '_rol_final',
		type : 'YAPP.model.Rol'
	}],

});