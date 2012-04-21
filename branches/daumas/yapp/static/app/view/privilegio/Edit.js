var formulario = Ext.define('YAPP.view.privilegio.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.privilegioedit',
	
	title : 'Editar Privilegio',
	layout : 'fit',
	autoShow : true,
	stores : [ 'Entidades' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ {
				xtype : 'fieldset',
				title : 'Privilegio',
				scopte : this,
				items : [ {
					xtype : 'textfield',
					name : '_nombre',
					fieldLabel : 'Nombre',
					allowBlank : false
				}, {
					xtype : 'combobox',
					fieldLabel : 'Entidad',
					name : '_entidad',
					store : Ext.create('YAPP.store.Entidades'),
					valueField : '_nombre',
					displayField : '_nombre',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione una entidad...'
				} ]
			} ]
		} ];
		
		this.buttons = [ {
			text : 'Guardar',
			// disabled : true,
			formBind : true,
			action : 'guardar'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});
