Ext.define('YAPP.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.List', 'rol.Edit' ],
	models : [ 'Rol' ],
	stores : [ 'Roles' ],
	requires : [ 'YAPP.model.Rol', 'YAPP.store.Roles' ],
	init : function() {
		this.control({
			'rollist' : {
				itemdblclick : this.editUser
			}
		});
	},
});
