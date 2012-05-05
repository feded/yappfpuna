Ext.define('YAPP.store.RolesFinales', {
	extend : 'Ext.data.Store',
	model : 'YAPP.model.Rol',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		api : {
			read : 'http://localhost:6543/rolesfinales/',
		},
		reader : {
			type : 'json',
			root : 'users',
			successProperty : 'sucess'
		}
	}
});