Ext.define('YAPP.controller.Suscripciones', {
	extend : 'Ext.app.Controller',
	views : [ 'suscripciones.List' ],
	models : [ 'Suscripcion' ],
	stores : [ 'Suscripciones' ],
	init : function() {
		this.control({
			'suscripcioneslist button[action=borrar]' : {
				click : this.botonBorrarApretado
			}
		});
	},
	botonBorrarApretado : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		console.log(selection)
		this.getSuscripcionesStore().remove(selection)
	},
});
