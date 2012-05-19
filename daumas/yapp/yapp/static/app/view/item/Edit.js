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
							typeAhead : true,
							allowBlank : false
						},
						{
							xtype : 'textfield',
							name : '_descripcion',
							fieldLabel : 'Descripcion',
							typeAhead : true,
							
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
							typeAhead : true,
							allowBlank : false
						},
						{
							xtype : 'checkbox',
							name : '_condicionado',
							fieldLabel : 'Condicionado',
							typeAhead : true,
							allowBlank : false
						},
						{
							xtype : 'combobox',
							name: '_padre',
							store : Ext.create('YAPP.store.Item'),
							fieldLabel : 'Padre',
							displayField : '_nombre',
							valueField: 'id',
							queryMode : 'local',
							emptyText : 'Seleccione un Item...',
							typeAhead : true,
						},
						{
							xtype : 'combobox',
							fieldLabel : 'Antecesor',
							name: '_antecesor',
							displayField : '_nombre',
							store : Ext.create('YAPP.store.Item'),
							valueField: 'id',
							typeAhead : true,
							queryMode : 'local',
							emptyText : 'Seleccione un Item...',
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
	}
	
	

});

