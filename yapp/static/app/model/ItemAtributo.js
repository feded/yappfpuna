Ext.define('YAPP.model.ItemAtributo', {
	extend: 'Ext.data.Model',
	fields:[
			{
                name : 'id',
                type : 'int',
                mapping : '_id'
        	},
        	{
        		name : '_atributo_id',
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
		    	name : '_atributo', 
		    	type : 'YAPP.model.AtributoTipoItem'
		    },
        	{
        		name: '_valor',
        		
        	} 
        	],
    proxy : {	
		type: 'rest',
		url: '/itemAtributo',
		reader : ({
			type : 'json',
			root : 'lista',
			successProperty : 'sucess'
		})
	}
});