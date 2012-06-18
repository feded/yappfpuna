Ext.define('YAPP.store.Proyectos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Proyecto',
	
	autoLoad : false,
    autoSync: false,
        
	proxy : {
    	type : 'ajax',
        api : {
        	read : '/readProyectos',
        	update : '/updateProyectos',
        	create : '/createProyectos',
        	destroy : '/deleteProyectos'
        },
        reader : {
        	type : 'json',
            root : 'proyectos',
            successProperty : 'sucess'
            }
        }
});