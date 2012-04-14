Ext.define('AM.store.RolEstados', {
	extend : 'Ext.data.Store',
	model : 'AM.model.RolEstado',
	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		api: {
	        read: 'http://localhost:6543/roles/estados',
	    },
		reader : {
			type : 'json',
			root : 'estados',
			successProperty : 'suceso'
		}
	}
});