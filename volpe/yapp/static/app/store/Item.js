Ext.define('YAPP.store.Item', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Item',
	autoLoad: true,
	autoSync: true,
	proxy : {	
		type: 'rest',
		url: '/item',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


