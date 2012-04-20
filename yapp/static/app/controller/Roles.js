Ext.define('YAPP.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.List', 'rol.Edit', 'rol.ABM' ],
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
		record.data.accion = "PUT";
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
		if (record.data.accion = "POST")
			this.getRolesStore().insert(0, record);
			
		// this.getRolesStore().sync();
	},
	botonCrearApretado : function(button) {
		// console.log('Boton crear apretaRdo');
		var rol = new YAPP.model.Rol();
		rol.data.accion = "POST";
		this.ventanaRol(rol);
	},
	botonBorrarApretado : function(button) {
		// button.up('grid').down('gridview').getSelectionModel().getSelection()[0]
		var win = button.up('grid');
		var grilla = win.down('gridview')

		var selection = grilla.getSelectionModel().getSelection()[0];
		console.log(selection)
		selection.data.accion = "DELETE"
		this.getRolesStore().remove(selection)
		console.log("----")
		// this.getRolesStore().sync();
		// console.log("------")
	},
	
	ventanaRol : function(record) {
		var view = Ext.widget('roledit');
		if (record != null)
			view.down('form').loadRecord(record);
	}
});
