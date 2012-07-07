Ext.define('YAPP.store.AtributoEsquema', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.AtributoEsquema',
//	autoLoad : true,
	autoSync: true,
	proxy : {
		type: 'rest',
		url: '/atributosEsquemas',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


