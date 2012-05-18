Ext.define('YAPP.store.Suscripciones', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Suscripcion',
	
	autoLoad : true,
	autoSync : true,
	
	proxy : {
		type : 'rest',
		api : {
			read : '/suscripciones/0',
			create : '/suscripciones/0',
			destroy : '/suscripciones',
			update : '/suscripciones'
		},
		reader : {
			type : 'json',
			root : 'suscripciones',
			successProperty : 'sucess'
		}
	}
});