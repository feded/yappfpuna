Ext.define('YAPP.store.Fases', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Fase',
	
	autoLoad : false,
    autoSync: false,
    
//    groupField: "_proyecto",
        
	proxy : {
    	type : 'rest',
    	url: '/fases',
        reader : {
        	type : 'json',
            root : 'fases',
            successProperty : 'sucess'
            }
        }
});