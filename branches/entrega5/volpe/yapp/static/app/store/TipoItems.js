Ext.define('YAPP.store.TipoItems', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.TipoItem',
	autoLoad : true,
	autoSync: true,
	proxy : {
		type : 'ajax',
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


