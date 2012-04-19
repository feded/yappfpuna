Ext.define('YAPP.store.Roles', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Rol',
	autoLoad : true,
	autoSync: true,
	
	proxy : {
		type : 'ajax',
		api : {
			read : 'http://localhost:6543/roles',
			update : 'http://localhost:6543/roles',
			create : 'http://localhost:6543/roles',
			destroy : 'http://localhost:6543/roles'
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}
});