Ext.define('YAPP.model.LineaBase', {
	
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre', '_fase', '_items', '_descripcion' ],
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