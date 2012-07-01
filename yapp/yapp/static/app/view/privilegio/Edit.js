Ext.define('YAPP.view.privilegio.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.privilegioedit',
	
	title : 'Editar Privilegio',
	layout : 'fit',
	autoShow : true,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ {
				xtype : 'fieldset',
				title : 'Privilegio',
				scopte : this,
				items : [ {
					xtype : 'combobox',
					fieldLabel : 'Privilegio',
					name : '_privilegio',
					store : Ext.create('YAPP.store.Privilegios'),
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					allowBlank : false,
					queryMode : 'local',
					emptyText : 'Seleccione un privilegio...'
				}, {
					xtype : 'combobox',
					fieldLabel : 'Entidad',
					name : '_entidad',
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					allowBlank : false,
					queryMode : 'local',
					emptyText : 'Seleccione una entidad...',
				// store : Ext.create('YAPP.store.EntidadesPadres')
				}, {
					xtype : 'checkbox',
					name : '_permitir',
					fieldLabel : 'Permitir',
					valueField : '_permitir',
					displayField : '_permitir',
					checked : '_permitir'
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
