Ext.define('YAPP.model.Proyecto', {
	extend: 'Ext.data.Model',
	fields:['_nombre', '_autor',{
                name : 'id',
                type : 'int',
                mapping : '_id'
        }]
});
