Ext.define('YAPP.store.RolesFinales', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Rol',
	autoSync : true,
	autoLoad : true,
	proxy : {
		type : 'rest',
		api : {
			read : '/rolesfinales/',
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}
});