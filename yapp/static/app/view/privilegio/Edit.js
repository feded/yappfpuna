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
			items : [ form_comun ]
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
var form_comun = {
	xtype : 'fieldset',
	title : 'Rol General',
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
};

