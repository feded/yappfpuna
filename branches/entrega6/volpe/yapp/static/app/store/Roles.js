Ext.define('YAPP.store.Roles', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Rol',
//	autoSync : true,
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
