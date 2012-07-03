Ext.define('YAPP.store.ItemUnidad', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.ItemUnidad',
	//autoLoad: true,
	//autoSync: true,
	proxy : {	
		type: 'rest',
		url: '/unidadItem',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


