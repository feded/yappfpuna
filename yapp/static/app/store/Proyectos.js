Ext.define('YAPP.store.Proyectos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Proyecto',
	
	autoLoad : true,
    autoSync: true,
        
	proxy : {
    	type : 'ajax',
        api : {
        	read : 'http://localhost:6543/readProyectos',
        	update : 'http://localhost:6543/updateProyectos',
        	create : 'http://localhost:6543/createProyectos',
        	destroy : 'http://localhost:6543/deleteProyectos'
        },
        reader : {
        	type : 'json',
            root : 'proyectos',
            successProperty : 'sucess'
            }
        }
});