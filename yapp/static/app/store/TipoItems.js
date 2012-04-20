Ext.define('YAPP.store.TipoItems', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.TipoItem',
	autoLoad : true,
	autoSync: true,
	proxy : {
		type : 'ajax',
		api : {
			read : 'http://localhost:6543/obtenerTipos',
	        update : 'http://localhost:6543/guardarTipo',
	        create : 'http://localhost:6543/crearTipo',
	        destroy : 'http://localhost:6543/eliminarTipo'
		},
		reader : {
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		}
	}
});


