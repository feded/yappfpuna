Ext.define('YAPP.store.Archivos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Archivo',
	
	autoLoad : false,
    autoSync: false,
    
	proxy : {
    	type : 'rest',
    	url: '/archivos',
        reader : {
        	type : 'json',
            root : 'archivos',
            successProperty : 'success'
            }
        }
});