Ext.define('YAPP.view.rol_privilegio.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.rolprivilegioedit',
	
	title : 'Editar privilegio del rol',
	layout : 'fit',
	autoShow : true,
	// stores : [ 'EntidadesPadres' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ {
				xtype : 'fieldset',
				scopte : this,
				items : [ {
					xtype : 'combobox',
					fieldLabel : 'Privilegio',
					name : '_privilegio',
					store : Ext.create('YAPP.store.Privilegios'),
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione un privilegio...'
				}, {
					xtype : 'combobox',
					fieldLabel : 'Entidad',
					name : '_entidad',
					store : Ext.create('YAPP.store.Entidades'),
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione una entidad...'
				}, {
					xtype : 'combobox',
					fieldLabel : 'Instancia',
					id : 'comboEntidadPadre',
					name : '_entidad_padre',
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione una entidad...',
				// store : Ext.create('YAPP.store.EntidadesPadres')
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
