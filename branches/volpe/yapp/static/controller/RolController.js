Ext.define('AM.controller.RolController', {
	extend : 'Ext.app.Controller',
	
	views : [ 'rol.List', 'rol.Edit', 'rol.ABM' ],
	models : [ 'Rol' ],
	stores : [ 'RolStore' ],
	init : function() {
		this.control({
			'viewport > panel' : {
				render : this.onPanelRendered
			},
			'rollist' : {
				itemdblclick : this.editUser
			},
			'roledit button[action=save]' : {
				click : this.botonEditGuardarApretado
			},
			'roledit button[action=crear]' : {
				click : this.botonCrearApretado
			},
			'roledit button[action=resetear]' : {
				click : this.botonResetApretado
			}
		});
	},
	
	refs : [ {
		ref : 'rol.Edit',
		selector : 'a'
	} ],
	
	editUser : function(grid, record) {
		console.log('Double clicked on ' + record.get('_nombre'));
		console.log(grid)
		var win = grid.up('container')
		console.log(win.items)
		this.getRolEditView().loadRecord(record)
		// view.loadRecord(record);
	},
	
	onPanelRendered : function() {
		console.log('Vista Renderizada');
	},
	
	botonEditGuardarApretado : function() {
		console.log('Boton Guardar apretado');
	},
	botonCrearApretado : function(button) {
		console.log('Boton crear apretado');
		console.log(button)
		var win = button.up('form')
		console.log(win)
	},
	botonResetApretado : function() {
		console.log('Boton Reset apretado');
	}
});
