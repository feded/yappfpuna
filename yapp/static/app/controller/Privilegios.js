Ext.define('YAPP.controller.Privilegios', {
	extend : 'Ext.app.Controller',
	views : [ 'privilegio.List', 'privilegio.Edit' ],
	models : [ 'Privilegio' ],
	stores : [ 'Privilegios' ],
	requires : [ 'YAPP.model.Privilegio', 'YAPP.store.Privilegios' ],
	
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
		if (record.data.accion == "CREAR"){
			console.log("ENTREE");
			this.getPrivilegiosStore().insert(0, record);
		}
	},
});
