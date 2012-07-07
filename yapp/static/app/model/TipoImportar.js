Ext.define('YAPP.model.TipoImportar', {
	extend: 'Ext.data.Model',
	fields:[
			{
                name : 'id_proyecto',
                type : 'int',
        	},'_tipos'
        	],
   	proxy : {
    	type : 'rest',
    	url: '/importarTipos',
    	
        reader : {
        	type : 'json',
            root : 'tipos',
            successProperty : 'sucess'
            }
        }
});