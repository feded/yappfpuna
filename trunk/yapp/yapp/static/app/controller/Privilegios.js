Ext.define('YAPP.controller.Privilegios', {
	extend : 'Ext.app.Controller',
	views : [ 'privilegio.List', 'privilegio.Edit' ],
	models : [ 'Privilegio' ],
	stores : [ 'Privilegios', 'EntidadesPadres' ],
	requires : [ 'YAPP.model.Privilegio', 'YAPP.store.Privilegios' ],
	refs : [ {
		selector : 'privilegioedit combobox[name=_entidad_padre]',
		ref : 'comboEntidadPadre'
	} ],
	init : function() {
		// console.log('Cargado controller Privilegios');
		this.control({
			'privilegiolist' : {
				itemdblclick : this.editPrivilegio
			},
			'privilegiolist button[action=crear]' : {
				click : this.botonCrearApretado
			},
			
			'privilegioedit button[action=guardar]' : {
				click : this.botonEditGuardarApretado
			},
			'privilegiolist button[action=borrar]' : {
				click : this.botonBorrarApretado
			},
			
			'privilegioedit combobox[name=_entidad]' : {
				change : this.changeEntidad
			}
		
		});
	},
	
	editPrivilegio : function(grid, record) {
		record.data.accion = 'PUT';
		console.log("EDITANDO")
		this.ventanaPrivilegio(record);
	},
	
	botonBorrarApretado : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview');
		var selection = grilla.getSelectionModel().getSelection()[0];
		console.log(selection);
		this.getPrivilegiosStore().remove(selection);
	},
	
	botonCrearApretado : function(button) {
		// console.log('Boton crear apretaRdo');
		var privilegio = new YAPP.model.Privilegio();
		privilegio.data.accion = "CREAR";
		console.log("CREANDO");
		this.ventanaPrivilegio(privilegio);
	},
	ventanaPrivilegio : function(record) {
		var view = Ext.widget('privilegioedit');
		if (record != null)
			view.down('form').loadRecord(record);
	},
	botonEditGuardarApretado : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		console.log(record)
		win.close();
		if (record.data.accion == "CREAR") {
			console.log("ENTREE");
			this.getPrivilegiosStore().insert(0, record);
		}
	},
	
	changeEntidad : function(object, newValue, oldValue, eOpts) {
		var combo = this.getComboEntidadPadre();
		var store = this.getEntidadesPadresStore();
		console.log(object.getValue())
		if (object.getValue() == '') {
			return;
		}
		combo.store = store;
		store.load({
			params : {
				id : object.getValue()
			}
		});
		// this.getEntidadesPadresStore().load();
		// object.store = this.getEntidadesPadresStore()
	}
});
