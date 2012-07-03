Ext.define('YAPP.store.RolPermisos', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.RolPermiso',
	
	autoLoad : false,
	
	proxy : {
		type : 'rest',
		url : '/rol_permisos',
		reader : {
			type : 'json',
			root : 'permisos',
			successProperty : 'sucess'
		}
	}
});