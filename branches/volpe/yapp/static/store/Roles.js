Ext.define('AM.store.Roles', {
	extend : 'Ext.data.Store',
	model : 'AM.model.Rol',
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
			successProperty : 'suceso'
		}
	}
});