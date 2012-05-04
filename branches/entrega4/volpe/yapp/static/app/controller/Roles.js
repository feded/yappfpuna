Ext.define('YAPP.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.ABM', 'rol.List', 'rol.Edit' ],
	models : [ 'Rol' ],
	stores : [ 'Roles' ],
	requires : [ 'YAPP.model.Rol', 'YAPP.store.Roles' ],
	init : function() {
		this.control({
			'rollist' : {
				itemdblclick : this.editUser
			},
			'rollist button[action=crear]' : {
				click : this.botonCrearApretado
			},
			
			'rollist button[action=borrar]' : {
				click : this.botonBorrarApretado
			},
			'roledit button[action=guardar]' : {
				click : this.botonEditGuardarApretado
			}
		});
	},
	
	editUser : function(grid, record) {
		// console.log('Double clicked on ' + record.get('_nombre'));
		record.data.accion = 'PUT'
		this.ventanaRol(record);
	},
	botonEditGuardarApretado : function(button) {
		
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		console.log(record)
		win.close();
		if (record.data.accion == "POST")
			this.getRolesStore().insert(0, record);
	},
	botonCrearApretado : function(button) {
		var rol = new YAPP.model.Rol();
		rol.data.accion = "POST";
		this.ventanaRol(rol);
	},
	botonBorrarApretado : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		console.log(selection)
		this.getRolesStore().remove(selection)
	},
	
	ventanaRol : function(record) {
		var view = Ext.widget('roledit');
		if (record != null)
			view.down('form').loadRecord(record);
	}
});
