Ext.define('YAPP.model.LineaBase', {
	
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'int',
		mapping : '_id'
	}, '_nombre','_fase', '_items', '_descripcion' ]

});