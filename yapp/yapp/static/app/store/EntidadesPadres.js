Ext.define('YAPP.store.EntidadesPadres', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.EntidadPadre',
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/entidades_padre/0',
		},
		reader : {
			type : 'json',
			root : 'entidades',
			successProperty : 'sucess'
		}
	}
});