Ext.define('YAPP.view.fase.EditarFase', {
	extend : 'Ext.window.Window',
	alias : 'widget.editarfase',
	
	title : 'Editar Fase',
	layout : 'fit',
	autoShow : true,
	
	initComponent : function() {
		
		this.items = [ {
			xtype : 'form',
			items : [ {
				xtype : 'textfield',
				name : '_nombre',
				fieldLabel : 'Nombre'
			}, {
				xtype : 'numberfield',
				name : '_orden',
				fieldLabel : 'Orden',
				value : 5,
				minValue : 1
			}, {
				xtype : 'textareafield',
				name : '_comentario',
				fieldLabel : 'Comentario'
			}, {
				xtype : 'colorcbo',
				name : '_color',
				fieldLabel: 'Color',
			}, ]
		} ];
		this.buttons = [ {
			text : 'Guardar',
			action : 'guardar'
		}, {
			text : 'Cancelar',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	},
	

});


