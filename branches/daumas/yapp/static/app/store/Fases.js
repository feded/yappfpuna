Ext.define('YAPP.store.Fases', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Fase',
	
	autoLoad : true,
    autoSync: true,
    
    groupField: "_proyecto",
        
	proxy : {
    	type : 'ajax',
        api : {
        	read : 'http://localhost:6543/readFases',
        	update : 'http://localhost:6543/updateFases',
        	create : 'http://localhost:6543/createFases',
        	destroy : 'http://localhost:6543/deleteFases'
        },
        reader : {
        	type : 'json',
            root : 'fases',
            successProperty : 'sucess'
            }
        }
});