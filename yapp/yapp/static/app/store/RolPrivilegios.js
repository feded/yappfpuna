Ext.define('YAPP.store.RolPrivilegios', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.RolPrivilegio',
//	autoLoad : true,
//	autoSync : true,
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