Ext.define('YAPP.store.Privilegios', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Privilegio',
	autoLoad : true,
	
	proxy : {
		type : 'rest',
		api: {
	        read: '/privilegios',
	    },
		reader : {
			type : 'json',
			root : 'entidades',
			successProperty : 'suceso'
		}
	}
});