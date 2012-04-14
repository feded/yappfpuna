Ext.define('AM.view.rol.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.roledit',
	
	title : 'Editar Rol',
	layout : 'fit',
	autoShow : true,
	stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ form_comun, form_final ]
		} ];
		
		this.buttons = [ {
			text : 'Guardar',
//			disabled : true,
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
		xtype : 'textfield',
		name : '_email',
		fieldLabel : 'Email',
		allowBlank : false
	}, {
		xtype : 'combobox',
		fieldLabel : 'Estado',
		name : '_state',
		store : Ext.create('AM.store.RolEstados'),
		valueField : '_id',
		displayField : '_estado',
		typeAhead : true,
		queryMode : 'local',
		emptyText : 'Seleccione un estado...'
	} ]
};

var form_final = {
	xtype : 'fieldset',
	checkboxToggle : true,
	collapsed : true,
	title : 'Rol Final',
	items : [ {
		xtype : 'textfield',
		name : '_email',
		fieldLabel : 'Correo',
		allowBlank : true
	}, {
		xtype : 'textfield',
		name : '_password',
		fieldLabel : 'Contraseña',
		inputType : 'password',
		allowBlank : true
	} ]
};