Ext.define('YAPP.store.Esquemas', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Esquema',
	//autoLoad: true,
	autoSync: true,
	proxy : {	
		type: 'rest',
		url: '/esquemas',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


