Ext.define('AM.store.Users', {
	extend : 'Ext.data.Store',
	model : 'AM.model.User',
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