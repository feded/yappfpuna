Ext.define('YAPP.store.RolPrivilegios', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.RolPrivilegio',
//	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : '/rolPrivilegios/0',
			create : '/rolPrivilegios/0',
			destroy : '/rolPrivilegios'
		},
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});
