Ext.define('AM.controller.Privilegios', {
	extend : 'Ext.app.Controller',
	views : [ 'privilegio.List', 'privilegio.Edit' ],
	models : [ 'Privilegio' ],
	stores : [ 'Privilegios' ],
	requires : [ 'AM.model.Privilegio', 'AM.store.Privilegios' ],
	init : function() {
		this.control({
			'privilegiolist button[action=crear]' : {
				click : this.botonCrearApretado
			},
			
			'privilegioedit button[action=guardar]' : {
				click : this.botonEditGuardarApretado
			}
		});
	},
	botonCrearApretado : function(button) {
		// console.log('Boton crear apretaRdo');
		var privilegio = new AM.model.Privilegio();
		privilegio.data.accion = "POST";
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
		if (record.data.accion = "POST")
			this.getPrivilegiosStore().insert(0, record);
		// this.getRolesStore().sync();
	},
});
