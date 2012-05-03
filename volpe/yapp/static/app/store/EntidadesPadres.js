Ext.define('YAPP.store.EntidadesPadres', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.EntidadPadre',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		api : {
			read : 'http://localhost:6543/entidades_padre',
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}
});