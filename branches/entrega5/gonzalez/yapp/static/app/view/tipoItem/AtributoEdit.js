var formulario = Ext.define('YAPP.view.tipoItem.AtributoEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.atributoedit',
	
	title : 'Editar Atributo Tipo Item',
	layout : 'fit',
	autoShow : true,
	stores : [ 'AtributoItem', 'TipoItems' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ form_atributo ]
		} ];
		
		this.buttons = [  {
			text : 'Guardar',
			action : 'guardar'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});
var form_atributo = {
	xtype : 'fieldset',
	title : 'Atributo Tipo de Item',
	items : [ {
		xtype : 'textfield',
		name : '_tipo',
		fieldLabel : 'Tipo',
		allowBlank : false
	},{
		xtype : 'textfield',
		name : '_valor',
		fieldLabel : 'Valor',
	},{
		xtype : 'textfield',
		name : '_descripcion',
		fieldLabel : 'Descripcion',
		allowBlank : false
	},{
		xtype : 'checkbox',
		name : '_opcional',
		fieldLabel : 'Opcional',
		allowBlank : false
	}, {
		xtype : 'textfield',
		name : '_defecto',
		fieldLabel : 'Campo por Defecto',
		allowBlank : false
	} ] 
};

