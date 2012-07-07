Ext.define('YAPP.store.LineasBase', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.LineaBase',
	// autoSync : true,
	// autoLoad : true,
	proxy : {
		extend : 'Ext.data.proxy.Proxy',
		type : 'rest',
		api : {
			read : '/lineas_base',
			update : '/lineas_base',
			create : '/lineas_base/0',
			destroy : '/lineas_base'
		},
		reader : {
			type : 'json',
			root : 'entidades',
			successProperty : 'sucess'
		}
	}
});