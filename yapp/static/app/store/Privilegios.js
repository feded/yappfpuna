Ext.define('YAPP.store.Privilegios', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Privilegio',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/privilegios/0',
			update : 'http://localhost:6543/privilegios',
			create : 'http://localhost:6543/privilegios/0',
			destroy : 'http://localhost:6543/privilegios'
		},
		reader : {
			type : 'json',
			root : 'privilegios',
			successProperty : 'sucess'
		}
	}
});