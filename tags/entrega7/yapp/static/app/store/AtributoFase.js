Ext.define('YAPP.store.AtributoFase', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.AtributoFase',
	
//	autoLoad : true,
    autoSync: false,
    
//    groupField: "_proyecto",
        
	proxy : {
    	type : 'rest',
    	url: '/atributofase',
        reader : {
        	type : 'json',
            root : 'atributofase',
            successProperty : 'sucess'
            }
        }
});