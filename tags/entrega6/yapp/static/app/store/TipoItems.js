Ext.define('YAPP.store.TipoItems', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.TipoItem',
	autoLoad : false,
	autoSync: false,
	proxy : {
		type : 'rest',
		api : {
			read : '/obtenerTipos',
	        update : '/guardarTipo',
	        create : '/crearTipo',
	        destroy : '/eliminarTipo'
		},
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


