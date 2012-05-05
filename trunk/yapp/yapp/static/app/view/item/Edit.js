var formulario = Ext.define('YAPP.view.item.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemedit',
	
	title : 'Editar Item',
	layout : 'fit',
	autoShow : true,
	store : 'Item',
	
// stores : [ 'Item', 'TipoItems', 'Fases' ],
	
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
							xtype : 'combobox',
							fieldLabel : 'Tipo de Item',
							name : '_tipo_item',
							store : Ext.create('YAPP.store.TipoItems'),
							displayField : '_prefijo',
							valueField: 'id',
							typeAhead : true,
							queryMode : 'local',
							emptyText : 'Seleccione un Tipo...',
							allowBlank : false
						},
						{
							xtype : 'textfield',
							name : '_duracion',
							fieldLabel : 'Duracion en dias',
							allowBlank : false
						},
						{
							xtype : 'checkbox',
							name : '_condicionado',
							fieldLabel : 'Condicionado',
							allowBlank : false
						},
//						{
//							xtype : 'combobox',
//							fieldLabel : 'Antecesor',
//							displayField : '_nombre',
//							typeAhead : true,
//							queryMode : 'local',
//							emptyText : 'Seleccione un Item...'
//						},
						{
							xtype : 'combobox',
							name: '_padre',
							fieldLabel : 'Padre',
							displayField : '_nombre',
							queryMode : 'local',
							valueField: 'id',
						}
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
	}

});