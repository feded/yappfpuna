Ext.define('YAPP.store.AtributoTipoItem', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.AtributoTipoItem',
	autoLoad : true,
	autoSync: true,
	proxy : {
		type : 'ajax',
		api : {
			read : 'http://localhost:6543/atributoItem/lista',
	        update : 'http://localhost:6543/guardarAtributo',
	        create : 'http://localhost:6543/crearAtributo',
	        destroy : 'http://localhost:6543/eliminarAtributo'
		},
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});


