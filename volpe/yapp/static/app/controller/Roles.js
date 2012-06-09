Ext.define('YAPP.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.ABM', 'rol.List', 'rol.Edit', 'rol_privilegio.List', 'rol_privilegio.Edit', 'rol_permiso.List' ],
	models : [ 'Rol' ],
	stores : [ 'Roles', 'RolEstados', 'RolPrivilegios', 'EntidadesPadres', 'RolPermisos', 'Permisos' ],
	refs : [ {
		selector : 'rolprivilegioedit combobox[name=_entidad_padre]',
		ref : 'comboEntidadPadre'
	}, {
		selector : 'rolprivilegioedit combobox[name=_entidad]',
		ref : 'comboEntidad'
	}, {
		selector : 'rollist',
		ref : 'grillaRol'
	}, {
		selector : 'rolpermisolist combobox[name=_permiso]',
		ref : 'comboPermiso'
	}, {
		selector : 'rolpermisolist',
		ref : 'grillaPermiso'
	}, {
		selector : 'roledit combobox[name=_estado]',
		ref : 'comboEstadoRol'
	}, {
		selector : 'roledit container[name=gridDragAndDrop]',
		ref : 'containerGrids'
	}, {
		selector : 'roledit grid[name=aHeredar]',
		ref : 'gridAHeredar'
	}, {
		selector : 'roledit grid[name=heredados]',
		ref : 'gridHeredados'
	}, {
		selector : 'roledit fieldset[name=form_final]',
		ref : 'formFinal'
	} ],
	init : function() {
		this.control({
			'rollist' : {
				itemdblclick : this.editUser,
				itemclick : this.rolListSelectChange,
				render : this.onRender,
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
			},
			// PERMISOS
			'rolpermisolist button[action=crear]' : {
				click : this.agregarPermiso
			},
			'rolpermisolist button[action=borrar]' : {
				click : this.borrarPermiso
			},
			'rolpermisoslist' : {
				afterrender : this.afterRenderRolPermiso
			}
		});
	},
	// /////////////////// //
	// SECCION DE PERMISOS //
	// /////////////////// //
	borrarPermiso : function(button) {
		var permiso = this.getGrillaPermiso().getSelectionModel().getSelection()[0];
		var store = this.getRolPermisosStore();
		permiso.destroy({
			success : function(permiso_eliminado) {
				Ext.example.msg("Rol", "Privilegio eliminado con exito");
				store.remove(permiso);
			},
			failure : function(permiso_eliminado) {
				alert("No se pudo eliminar el privilegio");
			}
		});
	},
	agregarPermiso : function(button) {
		var rol = this.getGrillaRol().getSelectionModel().getSelection()[0];
		if (rol == null) {
			Ext.example.msg("Roles", "Seleccione un rol primero");
			return;
		}
		var combo = this.getComboPermiso();
		var permiso = combo.getValue();
		
		var permisos_store = this.getRolPermisosStore();
		var permiso_existente = permisos_store.findBy(function f(record, id) {
			if (record.data._permiso._id == permiso) {
				return true;
			}
			return false;
		});
		if (permiso_existente != -1) {
			Ext.example.msg("Roles", "El rol ya tiene ese permiso");
			return;
		}
		var rol_permiso = new YAPP.model.RolPermiso();
		rol_permiso.data._rol = rol.data.id;
		rol_permiso.data._permiso = permiso;
		
		rol_permiso.save({
			success : function(rol_permiso) {
				console.log(rol_permiso);
				permisos_store.insert(0, rol_permiso);
				Ext.example.msg("Roles", "Permiso agregado con exito");
			},
			failure : function(rol_permiso) {
				alert("No se pudo asignar el permiso al rol");
			}
		});
	},
	
	afterRenderRolPermiso : function(button) {
		// var combo = this.getComboPermiso();
		// combo.store = this.getPermisosStore();
		
	},
	// ////////////////////// //
	// SECCION DE PRIVILEGIOS //
	// ////////////////////// //
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
	
	// //////////////// //
	// SECCION DE ROLES //
	// //////////////// //
	onRender : function() {
		this.getRolesStore().load();
	},
	
	rolListSelectChange : function(grid, record) {
		var store = this.getRolPrivilegiosStore();
		store.load({
			params : {
				id : record.get('id')
			}
		});
		
		var permisosStore = this.getRolPermisosStore();
		permisosStore.load({
			params : {
				id : record.get('id')
			}
		})
	},
	editUser : function(grid, record) {
		record.data.accion = 'PUT';
		this.ventanaRol(record);
	},
	botonEditGuardarApretado : function(button) {
		
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		
		var accion = record.data.accion;
		
		var items = this.getGridHeredados().getStore().getRange();
		var itemsDTO = new Array();
		for ( var i in items) {
			itemsDTO[i] = items[i].data.id;
		}
		record.data._padres = itemsDTO;
		
		console.log(record)
		var store = this.getRolesStore()
		record.save({
			success : function(rol) {
				if (accion == 'POST') {
					store.insert(0, rol);
				} else {
					store.remove(record);
					store.insert(0, rol);
					console.log(rol)
				}
				
				Ext.example.msg("Rol", "Guardado con exito");
				console.log("asdfasdf")
				win.close();
			},
			failure : function(rol) {
				alert("No se pudo guardar el rol");
			}
		});
		// if (record.data.accion == "POST")
		// this.getRolesStore().insert(0, record);
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
		
		store = this.getRolesStore();
		selection.destroy({
			success : function(rol) {
				store.remove(selection);
				Ext.example.msg("Rol", "Eliminado con exito");
			},
			failure : function(rol) {
				alert("No se pudo guardar el rol");
			}
		});
	},
	
	ventanaRol : function(record) {
		fieldSetRolFinalColapsado = true;
		if (record.get('_esFinal') == true && record.get('id') != 0)
			fieldSetRolFinalColapsado = false

		var view = Ext.widget('roledit');
		
		var combo = this.getComboEstadoRol()
		combo.store = this.getRolEstadosStore();
		
		var container = this.getContainerGrids();
		container.add({
			xtype : 'gridpanel',
			name : 'aHeredar',
			store : Ext.create("YAPP.store.Roles"),
			height : 100,
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : 'rolesHereadosGrupo',
					dropGroup : 'rolesAHeredarGrupo'
				}
			},
			columns : columnasDeRol,
			// stripeRows : true,
			title : 'Roles disponibles',
			margins : '0 0 0 3'
		});
		
		container.add({
			xtype : 'gridpanel',
			name : 'heredados',
			height : 100,
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : 'rolesAHeredarGrupo',
					dropGroup : 'rolesHereadosGrupo'
				}
			},
			columns : columnasDeRol,
			// stripeRows : true,
			title : 'Heredados',
			margins : '0 0 0 3'
		});
		var firstGrid = this.getGridAHeredar();
		var secondGrid = this.getGridHeredados();
		firstGrid.getStore().autoSync = false;
		firstGrid.getStore().load({
			params : {
				id : record.get('id'),
				disponibles : "SI"
			}
		})

		this.getRolesStore().each(function f(record) {
			firstGrid.getStore().add(record);
		})
		secondGrid.getStore().removeAll();
		if (record.get('id') != 0) {
			record.data._padres.forEach(function f(dato) {
				secondGrid.getStore().add(deDataAModelRol(dato))
			})
		}
		
		if (record != null) {
			view.down('form').loadRecord(record);
			var form = this.getFormFinal();
			form.setExpanded(!fieldSetRolFinalColapsado);
		}
	}
});

function deDataAModelRol(dato) {
	console.log(dato)
	var rol = new YAPP.model.Rol();
	rol.data.id = dato._id;
	rol.data._nombre = dato._nombre;
	rol.data._estado = dato._estado;
	rol.data._esFinal = dato._esFinal;
	console.log(rol)
	return rol;
}

var fieldSetRolFinalColapsado;

var columnasDeRol = [ {
	text : 'Nombre',
	flex : 1,
	sortable : true,
	dataIndex : '_nombre'
}, {
	header : 'Estado',
	flex : 1,
	sortable : true,
	dataIndex : '_estado',
	renderer : renderizador_estado_rol,
	field : {
		type : 'textfield'
	}
}, {
	header : 'Final',
	width : 40,
	flex : 0,
	sortable : true,
	dataIndex : '_esFinal'
} ];

function renderizador_estado_rol(val) {
	if (val == null)
		return val;
	if (val._estado == null)
		return val
	return val._estado
	// return ""
};

