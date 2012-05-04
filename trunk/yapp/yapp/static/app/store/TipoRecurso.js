Ext.define('YAPP.store.TipoRecurso', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.TipoRecurso',
	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		api: {
	        read: 'http://localhost:6543/tipo_recurso',
	    },
		reader : {
			type : 'json',
			root : 'tipos',
			successProperty : 'sucess'
		}
	}
});