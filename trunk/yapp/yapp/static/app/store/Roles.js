Ext.define('YAPP.store.Roles', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Rol',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/roles/0',
			update : 'http://localhost:6543/roles',
			create : 'http://localhost:6543/roles/0',
			destroy : 'http://localhost:6543/roles'
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}
});