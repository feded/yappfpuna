var formulario = Ext.define('YAPP.view.tipoItem.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.tipoItemedit',
	
	title : 'Editar Tipo Item',
	layout : 'fit',
	autoShow : true,
	stores : [ 'TipoItems' , 'AtributoItem' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ form_tipo ]
		} ];
		
		this.buttons = [ {
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
var form_tipo = {
	xtype : 'fieldset',
	title : 'Tipo de Item',
	items : [ {
		xtype : 'textfield',
		name : '_nombre',
		fieldLabel : 'Nombre',
		allowBlank : false
	},{
		xtype : 'textfield',
		name : '_comentario',
		fieldLabel : 'Comentario',
	},{
		xtype : 'numberfield',
		name : '_color',
		fieldLabel : 'Color',
		allowBlank : false
	},{
		xtype : 'textfield',
		name : '_prefijo',
		fieldLabel : 'Prefijo',
		allowBlank : false
	}, {
		xtype : 'checkbox',
		name : '_condicionado',
		fieldLabel : 'Condicionado',
		allowBlank : false
	}, ]
};

