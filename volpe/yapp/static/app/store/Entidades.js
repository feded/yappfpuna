Ext.define('YAPP.store.Entidades', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Entidad',
	autoLoad : true,
	
	proxy : {
		type : 'rest',
		api: {
	        read: '/entidades',
	    },
		reader : {
			type : 'json',
			root : 'entidades',
			successProperty : 'suceso'
		}
	}
});