Ext.define('YAPP.store.Privilegios', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Privilegio',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : '/privilegios/0',
			update : '/privilegios',
			create : '/privilegios/0',
			destroy : '/privilegios'
		},
		reader : {
			type : 'json',
			root : 'privilegios',
			successProperty : 'sucess'
		}
	}
});