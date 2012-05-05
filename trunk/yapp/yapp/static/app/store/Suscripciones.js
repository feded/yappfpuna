Ext.define('YAPP.store.Suscripciones', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Suscripcion',
	
	autoLoad : true,
	autoSync : true,
	
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/suscripciones/0',
			create : 'http://localhost:6543/suscripciones/0',
			destroy : 'http://localhost:6543/suscripciones',
			update : 'http://localhost:6543/suscripciones'
		},
		reader : {
			type : 'json',
			root : 'suscripciones',
			successProperty : 'sucess'
		}
	}
});