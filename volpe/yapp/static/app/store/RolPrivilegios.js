Ext.define('YAPP.store.AtributoTipoItem', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.AtributoTipoItem',
	autoLoad : true,
	autoSync: true,
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/rolprivilegios/0',
		},
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


