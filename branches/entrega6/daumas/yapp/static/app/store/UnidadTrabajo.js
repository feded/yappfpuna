Ext.define('YAPP.store.UnidadTrabajo', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.UnidadTrabajo',
	
	//autoLoad : true,
    autoSync: true,
    
        
	proxy : {
    	type : 'rest',
    	url: '/unidadtrabajo',
        reader : {
        	type : 'json',
            root : 'unidadtrabajo',
            successProperty : 'sucess'
            }
        }
});