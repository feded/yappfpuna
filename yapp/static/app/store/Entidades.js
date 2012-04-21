Ext.define('YAPP.store.Entidades', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Entidad',
	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		api: {
	        read: 'http://localhost:6543/entidades',
	    },
		reader : {
			type : 'json',
			root : 'entidades',
			successProperty : 'suceso'
		}
	}
});