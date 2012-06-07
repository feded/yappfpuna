Ext.define('YAPP.model.ItemUnidad', {
	extend: 'Ext.data.Model',
	fields:[
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : 'unidad_id',
        		type : 'int'
        	},
    	    {
		    	name : '_item', 
		    	type : 'YAPP.model.Item'
		    },
        	{
        		name: '_item_id',
        		type: 'int'
        	},
        	{
		    	name : '_unidad', 
		    	type : 'YAPP.model.UnidadTrabajo'
		    },
        	{
        		name: '_cantidad',
        		type: 'int'
        	} 
        	]
});