Ext.define('YAPP.store.Permisos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Permiso',
	
	autoLoad : false,

        
	proxy : {
    	type : 'rest',
    	url: '/permisos',
        reader : {
        	type : 'json',
            root : 'permisos',
            successProperty : 'sucess'
            }
        }
});