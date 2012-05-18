Ext.define('YAPP.store.AtributoFase', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.AtributoFase',
	
//	autoLoad : true,
    autoSync: true,
    
//    groupField: "_proyecto",
        
	proxy : {
    	type : 'rest',
    	url: '/atributofase',
//    	api:{
//    		read : 'http://localhost:6543/readFases',
//    		create : 'http://localhost:6543/createFases'
//    	},
//        api : {
//        	read : 'http://localhost:6543/readFases',
//        	update : 'http://localhost:6543/updateFases',
//        	create : 'http://localhost:6543/createFases',
//        	destroy : 'http://localhost:6543/deleteFases'
//        },
        reader : {
        	type : 'json',
            root : 'atributofase',
            successProperty : 'sucess'
            }
        }
});