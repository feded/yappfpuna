Ext.define('YAPP.store.Proyectos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Proyecto',
	
	autoLoad : true,
    autoSync: true,
        
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