Ext.define('YAPP.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.ABM', 'rol.List', 'rol.Edit', 'rol_privilegio.List', 'rol_privilegio.Edit' ],
	models : [ 'Rol' ],
	stores : [ 'Roles', 'RolPrivilegios', 'EntidadesPadres' ],
	requires : [ 'YAPP.model.Rol', 'YAPP.store.Roles' ],
	refs : [ {
		selector : 'rolprivilegioedit combobox[name=_entidad_padre]',
		ref : 'comboEntidadPadre'
	}, {
		selector : 'rolprivilegioedit combobox[name=_entidad]',
		ref : 'comboEntidad'
	}, {
		selector : 'rollist',
		ref : 'grillaRol'
	} ],
	init : function() {
		this.control({
			'rollist' : {
				itemdblclick : this.editUser,
				itemclick : this.rolListSelectChange
			},
			'rollist button[action=crear]' : {
				click : this.botonCrearApretado
			},
			
			'rollist button[action=borrar]' : {
				click : this.botonBorrarApretado
			},
			'roledit button[action=guardar]' : {
				click : this.botonEditGuardarApretado
			},
			'rolprivilegiolist button[action=crear]' : {
				click : this.botonAgregarPrivilegioClick
			},
			'rolprivilegiolist button[action=borrar]' : {
				click : this.botonBorrarPrivilegioClick
			},
			'rolprivilegioedit combobox[name=_privilegio]' : {
				change : this.comboRolPrivilegioPrivilegioCambiado
			},
			'rolprivilegioedit combobox[name=_entidad]' : {
				change : this.comboRolPrivilegioEntidadCambiado
			},
			'rolprivilegioedit button[action=guardar]' : {
				click : this.botonPrivilegioRolGuardarClick
			}
		});
	},
	// SECCION DE PRIVILEGIOS
	botonAgregarPrivilegioClick : function(button) {
		var rol_privilegio = new YAPP.model.RolPrivilegio();
		var grilla = this.getGrillaRol();
		var selection = grilla.getSelectionModel().getSelection()[0];
		if (selection == null) {
			alert("Seleccione un rol primero");
			return;
		}
		if (selection.get('id') == 1) {
			alert("No se puede agregar privilegios al administrador")
			return;
		}
		rol_privilegio.set('_rol', selection.data.id)
		this.ventanaEditPrivilegio(rol_privilegio);
		
	},
	
	botonBorrarPrivilegioClick : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		this.getRolPrivilegiosStore().remove(selection)
	},
	
	ventanaEditPrivilegio : function(record) {
		var view = Ext.widget('rolprivilegioedit');
		if (record != null)
			view.down('form').loadRecord(record);
	},
	
	botonPrivilegioRolGuardarClick : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		console.log(record)
		win.close();
		if (record.get('id') == 0)
			this.getRolPrivilegiosStore().insert(0, record);
	},
	
	comboRolPrivilegioEntidadCambiado : function(combo, newValue, oldValue, eOpts) {
		console.log("ME LLAMARON");
		var store = combo.getStore();
		var record = store.findRecord('id', combo.getValue());
		if (record != null) {
			this.cargarStoreEntidadPadre(hrecord.get('id'));
		}
	},
	comboRolPrivilegioPrivilegioCambiado : function(combo, newValue, oldValue, eOpts) {
		var store = combo.getStore();
		var record = store.findRecord('id', combo.getValue());
		if (record == null)
			return;
		var entidad = record.get('_entidad')
		var comboEntidad = this.getComboEntidad();
		if (entidad != '') {
			this.setearCombo(comboEntidad, entidad);
		} else {
			this.resetearCombo(comboEntidad);
		}
		var entidad_padre = record.get('_entidad_padre')
		var comboEntidadPadre = this.getComboEntidadPadre();
		if (entidad_padre != '') {
			this.setearCombo(comboEntidadPadre, entidad_padre);
		} else {
			this.resetearCombo(comboEntidadPadre);
		}
		console.log(entidad);
		if (entidad_padre == '' && entidad != '') {
			this.cargarStoreEntidadPadre(entidad._id);
		}
	},
	
	resetearCombo : function(combo) {
		combo.reset();
		combo.setDisabled(false);
	},
	
	setearCombo : function(combo, record) {
		combo.setValue(record.id)
		combo.setRawValue(record._nombre)
		combo.setDisabled(true);
	},
	cargarStoreEntidadPadre : function(identificador) {
		var comboEntidadPadre = this.getComboEntidadPadre();
		var store = this.getEntidadesPadresStore();
		comboEntidadPadre.store = store;
		store.load({
			params : {
				id : identificador
			}
		});
	},
	
	// SECCION DE ROLES
	rolListSelectChange : function(grid, record) {
		var store = this.getRolPrivilegiosStore();
		store.load({
			params : {
				id : record.get('id')
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
		if (selection.get('id') == 1) {
			alert("No se puede eliminar el administrador")
			return;
		}
		console.log(selection)
		this.getRolesStore().remove(selection)
	},
	
	ventanaRol : function(record) {
		var view = Ext.widget('roledit');
		if (record != null)
			view.down('form').loadRecord(record);
	}
});
