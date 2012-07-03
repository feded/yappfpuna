Ext.define('YAPP.store.RolEstados', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.RolEstado',
	autoLoad : true,
	
	proxy : {
		type : 'rest',
		api: {
	        read: '/roles_estados',
	    },
		reader : {
			type : 'json',
			root : 'estados',
			successProperty : 'sucess'
		}
	}
});