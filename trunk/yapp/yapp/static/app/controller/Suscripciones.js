Ext.define('YAPP.controller.Suscripciones', {
	extend : 'Ext.app.Controller',
	views : [ 'suscripcion.List', 'suscripcion.Edit', 'suscripcion.View', 'suscripcion.Notificaciones' ],
	models : [ 'Suscripcion' ],
	stores : [ 'Suscripciones', 'RolesFinales', 'Historiales' ],
	refs : [ {
		selector : 'notificaciones',
		ref : 'notificaciones'
	} ],
	init : function() {
		this.control({
			'suscripcionlist' : {
				itemdblclick : this.doubleClickSuscripcionList,
				itemclick : this.clickSuscriptionList
			},
			'suscripcionlist button[action=borrar]' : {
				click : this.botonBorrarApretado
			},
			'suscripcionlist button[action=crear]' : {
				click : this.botonAgregarClick
			},
			'suscripcionedit button[action=guardar]' : {
				click : this.botonGuardarClick
			}
		});
	},
	botonGuardarClick : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		console.log(record)
		win.close();
		if (record.get('id') == 0)
			this.getSuscripcionesStore().insert(0, record);
	},
	
	botonBorrarApretado : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		console.log(selection)
		this.getSuscripcionesStore().remove(selection)
	},
	botonAgregarClick : function(button) {
		var suscripcion = new YAPP.model.Suscripcion();
		this.ventanaEditSuscripcion(suscripcion);
	},
	ventanaEditSuscripcion : function(record) {
		var view = Ext.widget('suscripcionedit');
		if (record != null) {
			view.down('form').loadRecord(record);
			this.getComboEntidad().getStore().load();
			this.getComboRolFinal().getStore().load();
		}
	},
	
	doubleClickSuscripcionList : function(grid, record) {
		this.ventanaEditSuscripcion(record);
	},
	
	clickSuscriptionList : function(grid, record) {
		this.getHistorialesStore().load({
			params : {
				id : record.get('id')
			}
		})
	}
});
