Ext.define('YAPP.view.suscripcion.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.suscripcionedit',
	
	title : 'Editar Suscripcion',
	layout : 'fit',
	autoShow : true,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ {
				xtype : 'fieldset',
				title : 'Suscripcion',
				scopte : this,
				items : [ {
					xtype : 'textfield',
					name : '_nombre',
					fieldLabel : 'Nombre',
					allowBlank : false
				}, {
					xtype : 'combobox',
					fieldLabel : 'Entidad',
					name : '_entidad_padre',
					store : Ext.create('YAPP.store.EntidadesPadres'),
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione una entidad...'
				}, {
					xtype : 'combobox',
					fieldLabel : 'Rol',
					id : 'comboEntidadPadre',
					name : '_rol_final',
					store : Ext.create('YAPP.store.RolesFinales'),
					valueField : 'id',
					displayField : '_nombre',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione una entidad...',
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
