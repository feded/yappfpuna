Ext.define('YAPP.store.Proyectos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Proyecto',
	
	autoLoad : true,
    autoSync: true,
        
	proxy : {
    	type : 'ajax',
        api : {
        read : 'http://localhost:6543/proyectos',
        update : 'http://localhost:6543/proyectos',
        create : 'http://localhost:6543/proyectos',
        destroy : 'http://localhost:6543/proyectos'
        },
        reader : {
        	type : 'json',
            root : 'proyectos',
            successProperty : 'sucess'
            }
        }
});