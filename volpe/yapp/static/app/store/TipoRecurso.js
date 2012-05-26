Ext.define('YAPP.store.TipoRecurso', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.TipoRecurso',
	autoLoad : true,
	
	proxy : {
		type : 'rest',
		api: {
	        read: '/tipo_recurso',
	    },
		reader : {
			type : 'json',
			root : 'tipos',
			successProperty : 'sucess'
		}
	}
});