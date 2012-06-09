Ext.define('YAPP.model.RolPermiso', {
	extend : 'Ext.data.Model',
	fields : [ '_permiso', '_rol', {
		name : 'id',
		type : 'int',
		mapping : '_id'
	} ],
	proxy : {
		extend : 'Ext.data.proxy.Proxy',
		type : 'rest',
		api : {
			read : '/rol_permisos',
			create : '/rol_permisos/0',
			destroy : '/rol_permisos'
		},
		reader : {
			type : 'json',
			root : 'permisos',
			successProperty : 'sucess'
		}
	}
});