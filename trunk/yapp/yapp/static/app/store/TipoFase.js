Ext.define('YAPP.store.TipoFase', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.TipoFase',
	
    autoSync: true,

	proxy : {
    	type : 'rest',
    	url: '/tipofase',
    	
        reader : {
        	type : 'json',
            root : 'tipofase',
            successProperty : 'sucess'
            }
        }
});