Ext.define('YAPP.store.CalculoImpactos', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.CalculoImpacto',
	proxy : {
		type : 'rest',
		api : {
			read : '/calculo_impacto',
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}
});
