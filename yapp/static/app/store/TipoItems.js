Ext.define('YAPP.store.TipoItems', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.TipoItem',
	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		api : {
			read : 'static/data/res.json',
//			read : 'http://localhost:6543/tipoItem',
//        update : 'http://localhost:6543/proyectos',
//        create : 'http://localhost:6543/proyectos',
//        destroy : 'http://localhost:6543/proyectos'
		},
		reader : {
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		}
	}
});


