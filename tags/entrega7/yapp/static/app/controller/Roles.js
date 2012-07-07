Ext.define('YAPP.controller.Roles', {
	extend : 'Ext.app.Controller',
	views : [ 'rol.ABM', 'rol.List', 'rol.Edit', 'rol_permiso.List', 'privilegio.Edit', 'privilegio.List' ],
	models : [ 'Rol' ],
	stores : [ 'Roles', 'RolEstados', 'EntidadesPadres', 'RolPermisos', 'RolPrivilegios' ],
	refs : [ {
		selector : 'privilegioedit combobox[name=_entidad]',
		ref : 'comboEntidad'
	}, {
		selector : 'privilegioedit combobox[name=_privilegio]',
		ref : 'comboPrivilegio'
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
	}, {
		selector : 'privilegioedit checkbox[name=_permitir]',
		ref : 'checkboxPrivilegioPermitir'
	}, {
		selector : 'privilegiolist button[action=crear]',
		ref : 'buttonCrearPrivilegio'
	}, {
		selector : 'roledit textfield[name=_email]',
		ref : 'emailTF'
	}, {
		selector : 'roledit textfield[name=_password]',
		ref : 'passwordTF'
	}, {
		selector : 'roledit textfield[name=_nombre]',
		ref : 'nombreTF'
	}, {
		selector : 'roledit combo[name=_estado]',
		ref : 'estadoCB'
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
			'privilegiolist button[action=crear]' : {
				click : this.botonAgregarPrivilegioClick
			},
			'privilegiolist button[action=borrar]' : {
				click : this.botonBorrarPrivilegioClick
			},
			'privilegioedit combobox[name=_privilegio]' : {
				change : this.comboRolPrivilegioEntidadCambiado
			},
			'privilegioedit button[action=guardar]' : {
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
		
		Ext.Msg.confirm('Roles', 'Seguro de que desa eliminar el privilegio?', function(button) {
			console.log("ELIMINANDO")
			if (button === 'yes') {
				permiso.destroy({
					success : function(permiso_eliminado) {
						Ext.example.msg("Rol", "Privilegio eliminado con exito");
						store.remove(permiso);
					},
					failure : function(permiso_eliminado) {
						alert("No se pudo eliminar el privilegio");
					}
				});
			}
		}, this);
		
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
	
	// ////////////////////// //
	// SECCION DE PRIVILEGIOS //
	// ////////////////////// //
	botonAgregarPrivilegioClick : function(button) {
		var privilegio = new YAPP.model.RolPrivilegio();
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
		privilegio.set('_rol', selection.data.id)
		privilegio.set('_permitir', true)
		this.ventanaEditPrivilegio(privilegio);
		
	},
	
	botonBorrarPrivilegioClick : function(button) {
		Ext.Msg.confirm('Rol', 'Seguro que desea eliminar privilegio', function(button2) {
			if (button2 === 'yes') {
				var win = button.up('grid');
				var grilla = win.down('gridview')
				var selection = grilla.getSelectionModel().getSelection()[0];
				var store = this.getRolPrivilegiosStore();
				
				selection.destroy({
					success : function(permiso) {
						Ext.example.msg("Rol", "Privilegio eliminado con exito");
						store.remove(selection);
					},
					failure : function(permiso) {
						Ext.Msg.alert("Rol", "No se pudo eliminar el privilegio");
					}
				});
			}
		}, this);
		
	},
	
	ventanaEditPrivilegio : function(record) {
		var view = Ext.widget('privilegioedit');
		if (record != null)
			view.down('form').loadRecord(record);
		
		// var cb = this.getCheckboxPrivilegioPermitir();
		// cb.setValue(record.data._permitir)
	},
	
	botonPrivilegioRolGuardarClick : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		if (!form.getForm().isValid()) {
			Ext.Msg.alert("Privilegio", "Seleccione los campos");
		}
		var record = form.getRecord();
		var values = form.getValues();
		var store = this.getRolPrivilegiosStore();
		record.set(values);
		var cb = this.getCheckboxPrivilegioPermitir();
		record.data._permitir = cb.getValue();
		win.close();
		record.save({
			success : function(privilegio) {
				store.insert(0, privilegio);
				Ext.example.msg("Roles", "Privilegio agregado con exito");
			},
			failure : function(rol_permiso) {
				Ext.Msg.alert("Privilegio", "No se pudo asignar el privilegio al rol");
			}
		});
	},
	
	comboRolPrivilegioEntidadCambiado : function(combo, newValue, oldValue, eOpts) {
		var store = combo.getStore();
		var record = store.findRecord('id', combo.getValue());
		if (record != null) {
			this.cargarStoreEntidad(record.get('id'));
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
	cargarStoreEntidad : function(identificador) {
		var comboEntidadPadre = this.getComboEntidad();
		var store = this.getEntidadesPadresStore();
		comboEntidadPadre.store = store;
		comboEntidadPadre.setValue("")
		store.load({
			params : {
				id : identificador
			},
			callback : function(records) {
				if (Ext.typeOf(comboEntidadPadre.getPicker().loadMask) !== "boolean") {
					comboEntidadPadre.getPicker().loadMask.hide();
				}
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
				id_rol : record.get('id')
			}
		});
		
		var permisosStore = this.getRolPermisosStore();
		permisosStore.load({
			params : {
				id : record.get('id')
			}
		})

		if (record.get('id') != 1) {
			this.getButtonCrearPrivilegio().setDisabled(false)
		} else {
			this.getButtonCrearPrivilegio().setDisabled(true)
		}
		
	},
	editUser : function(grid, record) {
		record.data.old_pass = record.data._password
		record.data.accion = 'PUT';
		this.ventanaRol(record);
	},
	botonCrearApretado : function(button) {
		var rol = new YAPP.model.Rol();
		rol.data.old_pass = ""
		rol.data.accion = "POST";
		this.ventanaRol(rol);
	},
	
	botonEditGuardarApretado : function(button) {
		
		var win = button.up('window');
		var form = win.down('form');
		
		var emailTF = this.getEmailTF();
		var passwTF = this.getPasswordTF();
		var nombrTF = this.getNombreTF();
		var estadCB = this.getEstadoCB();
		
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		
		if (!nombrTF.isValid()) {
			Ext.Msg.alert("Roles", "Por favor, ingrese un nombre correcto");
			return;
		}
		
		if (!estadCB.isValid()) {
			Ext.Msg.alert("Roles", "Por favor, ingrese un estado correcto");
			return;
		}
		
		if (record.data._esFinal == true) {
			if (!emailTF.isValid()) {
				Ext.Msg.alert("Roles", "Por favor, ingrese un email correcto");
				return;
			}
			if (!passwTF.isValid()) {
				Ext.Msg.alert("Roles", "Por favor, ingrese un password correctamente");
				return;
			}
		}
		
		var accion = record.data.accion;
		
		var items = this.getGridHeredados().getStore().getRange();
		var itemsDTO = new Array();
		for ( var i in items) {
			itemsDTO[i] = items[i].data.id;
		}
		record.data._padres = itemsDTO;
		
		if (record.data.old_pass != record.data._password) {
			record.data._password = md5(record.data._password)
		}
		
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
	
	botonBorrarApretado : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		if (selection.get('id') == 1) {
			Ext.Msg.alert("Rol", "No se puede eliminar el administrador")
			return;
		}
		Ext.Msg.confirm('Rol', 'Seguro que desa eliminar el rol ' + selection.get('_nombre') + '?', function(button) {
			if (button === 'yes') {
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
			}
		}, this);
		
	},
	
	ventanaRol : function(record) {
		fieldSetRolFinalColapsado = true;
		if (record.get('_esFinal') == true && record.get('id') != 0)
			fieldSetRolFinalColapsado = false
		var view = Ext.widget('roledit');
		
		if (record.data.accion == "POST") {
			view.setTitle("Nuevo rol")
		}
		
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

