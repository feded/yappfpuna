Ext.define('AM.store.RolStore', {
	extend : 'Ext.data.Store',
	model : 'AM.model.Rol',
	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		api: {
	        read: 'http://localhost:6543/roles',
	        update: 'http://localhost:6543/roles'
	    },
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'suceso'
		}
	}
});