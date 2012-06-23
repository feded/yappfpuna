var formulario = Ext.define('YAPP.view.esquema.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.esquemaedit',
	
	title : 'Editar Esquema',
	layout : 'fit',
	autoShow : true,
	store : 'Esquema',
	
	initComponent : function() {
		console.log("EDIT");
		this.items = [ {
			xtype : 'form',
			items : [ 
				{
		xtype : 'textfield',
		name : '_nombre',
		fieldLabel : 'Nombre',
		allowBlank : false
	},
	{
		xtype : 'textfield',
		name : '_descripcion',
		fieldLabel : 'Descripcion',
		allowBlank : false
	},
	{
		xtype : 'textfield',
		name : '_etiqueta',
		fieldLabel : 'Etiqueta',
		allowBlank : false
	},
	{
		xtype : 'colorcbo',
		name : 'color',
		fieldLabel: 'Color',
	},
			]
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
	},
	
});


