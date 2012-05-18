Ext.define('YAPP.store.Historiales', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Historial',
	
	autoSync : true,
	
	proxy : {
		type : 'rest',
		api : {
			read : '/notificaciones/',
		},
		reader : {
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		}
	}
});