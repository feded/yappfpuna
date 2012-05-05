Ext.define('YAPP.store.EsquemaItem', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.EsquemaItem',
//	autoLoad : true,
	autoSync: true,
	proxy : {
		type: 'rest',
		url: '/itemsEsquemas',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


