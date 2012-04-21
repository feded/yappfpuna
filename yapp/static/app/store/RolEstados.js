Ext.define('YAPP.store.RolEstados', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.RolEstado',
	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		api: {
	        read: 'http://localhost:6543/roles_estados',
	    },
		reader : {
			type : 'json',
			root : 'estados',
			successProperty : 'sucess'
		}
	}
});