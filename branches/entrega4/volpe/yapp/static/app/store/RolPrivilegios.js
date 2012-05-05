Ext.define('YAPP.store.RolPrivilegios', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.RolPrivilegio',
//	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/rolPrivilegios/0',
			create : 'http://localhost:6543/rolPrivilegios/0',
			destroy : 'http://localhost:6543/rolPrivilegios'
		},
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});
