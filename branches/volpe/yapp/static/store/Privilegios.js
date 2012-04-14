Ext.define('AM.store.Privilegios', {
	extend : 'Ext.data.Store',
	model : 'AM.model.Privilegio',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		api : {
			read : 'http://localhost:6543/privilegios',
			update : 'http://localhost:6543/privilegios',
			create : 'http://localhost:6543/privilegios',
			destroy : 'http://localhost:6543/privilegios'
		},
		reader : {
			type : 'json',
			root : 'privilegios',
			successProperty : 'suceso'
		}
	}
});