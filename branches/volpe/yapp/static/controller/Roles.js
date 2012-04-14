Ext.define('AM.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.List', 'rol.Edit', 'rol.ABM' ],
	models : [ 'Rol' ],
	stores : [ 'Roles' ],
	requires : [ 'AM.model.Rol', 'AM.store.Roles' ],
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
		console.log('Double clicked on ' + record.get('_nombre'));
		this.ventanaRol(record);
	},
	botonEditGuardarApretado : function(button) {
		var obj = this
		for (var m in obj) {
		    if (typeof obj[m] == "function") {
		        console.log(m);
		    }
		}
		
		console.log('Boton Guardar apretado');
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		
		record.set(values);
		this.getRolesStore().insert(0, record);
		this.getRolesStore().sync();
		win.close();
	},
	botonCrearApretado : function(button) {
		console.log('Boton crear apretado');
		this.ventanaRol(new AM.model.Rol());
	},
	botonBorrarApretado : function(button) {
		console.log('Boton crear apretado');
	},
	
	ventanaRol : function(record) {
		var view = Ext.widget('roledit');
		if (record != null)
			view.down('form').loadRecord(record);
	}
});
