var formulario = Ext.define('YAPP.view.esquema.EsquemaItemCreate', {
	extend : 'Ext.window.Window',
	alias : 'widget.esquemaItemCreate',
	
	title : 'Agregar Esquema',
	layout : 'fit',
	autoShow : true,
	store : 'EsquemaItem',
	
	initComponent : function() {
		console.log("Agregar Item");
		this.items = [ {
			xtype : 'form',
			items : [ 
				{
		
					xtype : 'combobox',
					fieldLabel : 'Item',
					name : 'item_id',
					store : new YAPP.store.Item(),
					displayField : '_nombre',
					valueField : 'id',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione un Item a Agregar...',
					allowBlank : false
				
				},
	
			]
		} ];
		
		this.buttons = [  {
			text : 'Guardar',
			action : 'guardarItemEsquema'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});