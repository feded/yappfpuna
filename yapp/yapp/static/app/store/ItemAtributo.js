Ext.define('YAPP.store.ItemAtributo', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.ItemAtributo',
	//autoLoad: true,
	//autoSync: true,
	proxy : {	
		type: 'rest',
		url: '/itemAtributo',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});