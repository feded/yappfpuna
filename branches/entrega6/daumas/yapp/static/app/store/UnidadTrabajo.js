Ext.define('YAPP.store.UnidadTrabajo', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.UnidadTrabajo',
	
    autoSync: false,
        
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